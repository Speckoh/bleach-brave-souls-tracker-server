const express = require('express')
const { handle404 } = require('../lib/custom-errors')
//Character is the ENTITY
const Character = require('../models/character')
const { requireToken } = require('../config/auth')
const router = express.Router()

//INDEX
router.get('/characters', requireToken, (req, res, next) => {
    Character.find()
    .then(characters => {
        return characters.map(character => character)
    })
    .then(characters => {
        res.status(200).json({ characters: characters })
    })
    .catch(next)
})

//SHOW - GET
router.get('/characters/:id', requireToken, (req, res, next) => {
    Character.findById(req.params.id)
    //Handle404 Insert Below findById
    .then(handle404)
    .then(character => {
        res.status(200).json({ character: character })
    })
    .catch(next)
})

//CREATE - POST
router.post('/characters', requireToken, (req, res, next) => {
    // console.log(req.user)
    // req.body.character.owner = req.user._id
    // console.log(req.body)
    Character.create(req.body.character)
    .then(character => {
        res.status(201).json({ character: character })
    })
    .catch(next)
})

//UPDATE - PATCH
router.patch('/characters/:id', requireToken, (req, res, next) => {
    Character.findById(req.params.id)
    .then(character => {
        return character.updateOne(req.body.character)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

//DELETE
router.delete('/characters/:id', requireToken, (req, res, next) => {
    Character.findById(req.params.id)
    //Handle404 Insert Below findById
    // .then(handle404)
    .then(character => {
        return character.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router