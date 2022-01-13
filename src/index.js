const express = require('express')
require('./db/mongoose')
const Applicant = require('./models/applicant')
const userRouter = require('./routers/applicant')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)


app.listen(port, () => {
    console.log('Server is running on port ' + port)
})