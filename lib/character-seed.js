//BASE STUFF TO MANIPULATE
//Seeding a Database - Reset the Database to Clean Base
const express = require('express')
const router = express.Router()

const Character = require('../models/character')

const startingCharacters = [
	{
		name: 'Ichigo',
		attribute: 'Heart',
		killer: ['Arrancar', 'No Affiliation'],
		soulTrait: '',
		characterLinks: ['Orihime', 'Chad'],
		SlotLvls: [0, 0, 0]
	},
	{
		name: 'Ishida',
		attribute: 'Technique',
		killer: ['Soul Reaper', 'Captain'],
		soulTrait: '',
		characterLinks: ['Abarai Renji'],
		SlotLvls: [0, 0, 0]
	},
]

router.get('/characters', (req, res, next) => {
    Character.deleteMany({})
        .then(() => {
            Character.create(startingCharacters)
                .then(characters => {
                    res.status(200).json({ characters: characters})
                })
        })
        .catch(next)
})

module.exports = router