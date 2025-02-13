import { body, validationResult } from 'express-validator'
import { ErrorHandler } from '../util.js'

const validateHandler = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) next()
    else next(new ErrorHandler(400, errors.array().map(({ msg }) => msg).join(', ')))
}

const registrationValidator = () => [
    body('username', 'Please Enter Username').notEmpty(),
    body('fullName', 'Please Enter Full Name').notEmpty(),
    body('country', 'Please Enter Country').notEmpty(),
    body('password', 'Please Enter Password of Minimum 8 Characters').isLength({ min: 8 }),
    body('gender').isIn(['Male', 'Female']).withMessage('Invalid Gender'),
    body('dateOfBirth').custom(d => {
        const arr = d.split('-')
        const date = parseInt(arr[0])
        const month = parseInt(arr[1])
        const year = parseInt(arr[2])
        const months31 = [1, 3, 5, 7, 8, 10, 12]
        const months30 = [4, 6, 9, 11]
        if ((year > new Date().getFullYear()) || (year < 1)) return false
        if (month < 1 || month > 12) return false
        if (date < 1) return false
        if (month === 2) {
            if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
                if (date > 29) return false
            }
            else {
                if (date > 28) return false
            }
        }
        if (months31.includes(month)) {
            if (date > 31) return false
        }
        if (months30.includes(month)) {
            if (date > 30) return false
        }
        return true
    }).withMessage('Invalid Date of Birth'),
    body('email').isEmail().withMessage('Invalid Email')
]

const loginValidator = () => [
    body('username', 'Please Enter Username').notEmpty(),
    body('password', 'Please Enter Password').notEmpty(),
]

const searchValidator = () => [
    body('searchBy').isIn(['username', 'email']).withMessage('Please tell how do you want to search. Using email or using username?'),
    body('email').if(body('searchBy').equals('email')).isEmail().withMessage('Invalid email address.'),
    body('username').if(body('searchBy').equals('username')).notEmpty().withMessage('Please enter username since you have chosen to search by username')
]

export { loginValidator, registrationValidator, searchValidator, validateHandler }
