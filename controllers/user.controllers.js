import { compare } from "bcrypt"
import { tryCatch } from "../middlewares/error.js"
import { User } from "../models/User.model.js"
import { ErrorHandler } from '../util.js'
import jwt from 'jsonwebtoken'

const register = tryCatch(async (req, res, next) => {
    const { username, password, fullName, gender, dateOfBirth, country, email } = req.body
    const usernameExists = await User.findOne({ username })
    if (usernameExists) return next(new ErrorHandler(400, 'A user with the same username already exists'))
    const emailExists = await User.findOne({ email })
    if (emailExists) return next(new ErrorHandler(400, 'A user with the same email already exists'))
    const user = await User.create({ username, password, fullName, gender, dateOfBirth, country, email })
    res.status(201).json({ success: true, user, msg: 'User Registration Successful' })
})

const login = tryCatch(async (req, res, next) => {
    const { username, password } = req.body
    const user = await User.findOne({ username }).select('+password')
    if (!user) return next(new ErrorHandler(400, 'Password or username is incorrect'))
    const isMatch = await compare(password, user.password)
    if (!isMatch) return next(new ErrorHandler(400, 'Password or username is incorrect'))
    user.password = undefined
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    res
        .status(200)
        .cookie('user', token, {
            maxAge: 60 * 60 * 24 * 15000,
            sameSite: 'none',
            httpOnly: true,
            secure: true
        })
        .json({ success: true, msg: 'Logged in Successfully', user })
})

const searchUser = tryCatch(async (req, res, next) => {
    const { searchBy, username, email } = req.body
    let user
    if (searchBy === 'username') user = await User.findOne({ username })
    else user = await User.findOne({ email })
    if (!user) return next(new ErrorHandler(404, 'No User found'))
    res.status(200).json({ success: true, user })
})

export { register, login, searchUser }