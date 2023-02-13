const express = require('express')

const Character = require('../models/character')
const router = express.Router()
const { handle404 } = require('../lib/custom-errors')
const { requireToken } = require('../config/auth')

//CREATE - POST
router.post('/accessories', requireToken, (req, res, next) => {
    const characterId = req.body.accessory.characterId
    const accessory = req.body.accessory
	Character.findById(characterId) // see 29
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
    const characterId = req.body.accessory.characterId // our accessory model doesn't have a field for characterId, consider changing the path to take in 2 params in a pattern like /characters/:characterId/accessories/:accessoryId
    const accessoryBody = req.body.accessory
    Character.findById(characterId)
    .then(character => {// currently now authorization implemented, only authentication 
        const accessory = character.accessories.id(req.params.accessoryId)// good use of id subdoc method 
        accessory.set(accessoryBody)
        return character.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router