const mongoose = require('mongoose')

const accessorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			default: '',
		},
        attribute: String,
        effect: String,
        bonus: String,
	},
	{
		timestamps: true,
	}
)

const characterSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		attribute: {
			type: String,
			required: true,
		},
		killer: {
			type: String,
			required: true,
		},
		soulTrait: {
			type: String,
			required: true,
		},
        accessories: [accessorySchema],
        characterLinks: [String],
        slot1Lvls: {
			type: Number,
			min: 0,
			max: 20,
			default: 0
		},
		slot2Lvls: {
			type: Number,
			min: 0,
			max: 20,
			default: 0
		},
		slot3Lvls: {
			type: Number,
			min: 0,
			max: 20,
			default: 0
		},
		slotLvls: {
			type: String,
			default: '0/0/0'
		}
	},
	{
		timestamps: true,
	}
)

const Character = mongoose.model('Character', characterSchema)
module.exports = Character