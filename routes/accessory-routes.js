const express = require('express')

const Character = require('../models/character')
const router = express.Router()
const { handle404 } = require('../lib/custom-errors')
const { requireToken } = require('../config/auth')

//CREATE - POST
router.post('/accessories', requireToken, (req, res, next) => {
    const characterId = req.body.accessory.characterId
    const accessory = req.body.accessory
	Character.findById(characterId)
		.then(handle404)
		.then((character) => {
			character.accessories.push(accessory)
			return character.save()
		})
		.then(character => {
            res.status(201).json({ character: character })
        })
		.catch(next)
})

//UPDATE - PATCH
router.patch('/accessories/:accessoryId', requireToken, (req, res, next) => {
    const characterId = req.body.accessory.characterId
    const accessoryBody = req.body.accessory
    Character.findById(characterId)
    .then(character => {
        const accessory = character.accessories.id(req.params.accessoryId)
        accessory.set(accessoryBody)
        return character.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router