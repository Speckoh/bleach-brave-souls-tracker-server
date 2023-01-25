const mongoose = require('mongoose')

const accessorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
        attribute: {
			type: String,
			required: true,
		},
        effect: {
			type: String,
			required: true,
		},
        bonus: {
			type: String,
			required: false,
		},
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
		killer: [String],
		soulTrait: {
			type: String,
			required: true,
		},
        accessories: [accessorySchema],
        characterLinks: [String],
        slotLvls: [{
            type: Number,
            default: 0,
            max: 20,
        }],
	},
	{
		timestamps: true,
	}
)

const Character = mongoose.model('Character', characterSchema)
module.exports = Character
