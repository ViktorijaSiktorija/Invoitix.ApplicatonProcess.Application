const { Int32 } = require('mongodb')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/invoitix-api', {
    useNewUrlParser: true
})