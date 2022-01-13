const mongoose = require('mongoose')
const validator = require('validator')
const { getCode} = require('country-list')

const Applicant = mongoose.model('Applicant', {
    name: {
        type: String,
        minlength: 5,
        required: true
    },
    familyName: {
        type: String,
        minlength: 5,
        required: true
    },
    address: {
        type: String,
        minlength: 10,
        required: true
    },
    countryOfOrigin: {
        type: String,
        validate(value) {
            if (!getCode(value)) {
                throw new Error('Please enter a valid Country')
            }
        },
        required: true
    },
    emailAddress: {
        type: String,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid')
            }
        },
        required: true
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 20 || value > 60) {
                throw new Error('Age must be between 20 and 60')
            }
        },
        required: true
    },
    hired: {
        type: Boolean,
        default: false
    }
})

module.exports = Applicant