import { hash } from 'bcrypt'
import mongoose, { model, Schema } from 'mongoose'

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    fullName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: {
            values: ['Male', 'Female'],
            message: '{VALUE} is not a valid gender option',
        },
        required: true
    },
    country: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String, // will be stored in the format in DD-MM-YYYY
        required: true
    },
    email: {
        type: String,
        required: true // to search user
    }
})

schema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await hash(this.password, 10)
})

export const User = mongoose.models.ToposelUser || model('ToposelUser', schema) //  I am naming it ToposelUser because another model named 'User' is already in use.