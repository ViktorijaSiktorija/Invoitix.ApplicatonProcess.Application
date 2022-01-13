const express = require('express')
const router = new express.Router()
const Applicant = require('../models/applicant')

router.post('/applicants', async (req, res) => {
    const applicant = new Applicant(req.body)

    try {
        await applicant.save()
        res.status(201).send(applicant)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/applicants', async (req, res) => {
    try {
        const applicants = await Applicant.find({})
        res.send(applicants)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/applicants/:id', async (req,res) => {
    const _id = req.params.id

    try {
        const applicant = await Applicant.findById(_id)
        if (!applicant) {
            return res.status(404).send()
        }

        res.send(applicant)
    } catch (e) {
        res.status(404).send()
    }
})

router.put('/applicants/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'familyName', 'address', 'countryOfOrigin', 'emailAddress', 'age', 'hired']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        const applicant = await Applicant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!applicant) {
            return res.status(404).send()
        }

        res.send(applicant)
    } catch (e) {
        res.status(400).send({ error: 'Invalid ID'})
    }
})

router.delete('/applicants/:id', async (req, res) => {
    try {
        const applicant = await Applicant.findByIdAndDelete(req.params.id)
        
        if (!applicant) {
            return res.status(404).send()
        }
        
        res.send(applicant)
    } catch (e) {
        res.status(500).send()
    }

})

module.exports = router