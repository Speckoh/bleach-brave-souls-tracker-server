const express = require('express')

//Character is the ENTITY
const Character = require('../models/character')
const router = express.Router()

//INDEX
router.get('/characters', (req, res, next) => {
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
router.get('/characters/:id', (req, res, next) => {
    Character.findById(req.params.id)
    //Handle404 Insert Below findById
    //.then(handle404)
    .then(character => {
        res.status(200).json({ character: character })
    })
    .catch(next)
})

//CREATE - POST
router.post('/characters', (req, res, next) => {
    Character.create(req.body.character)
    .then(character => {
        res.status(201).json({ character: character })
    })
    .catch(next)
})

//UPDATE - PATCH
router.patch('/characters/:id', (req, res, next) => {
    Character.findById(req.params.id)
    .then(character => {
        return character.updateOne(req.body.character)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

//DELETE
router.delete('/characters/:id', (req, res, next) => {
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