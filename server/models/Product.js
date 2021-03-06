const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'must provide a name'],
		trim: true,
		maxlength: [50, 'name maximum character exceeded!'],
	},
	type: {
		type: String,
		required: [true, 'must provide a name'],
		trim: true,
		maxlength: [50, 'name maximum character exceeded!'],
	},
	color: {
		type: String,
		required: [true, 'must provide a name'],
		trim: true,
		maxlength: [50, 'name maximum character exceeded!'],
	},
	length: {
		type: Number,
		required: [true, 'must provide a price'],
		trim: true,
	},
	price: {
		type: Number,
		required: [true, 'must provide a price'],
		trim: true,
	},
	percent: {
		type: Number,
		default: 0,
	},
	description: {
		type: String,
		required: [true, 'must provide description'],
		trim: true,
	},
	image: {
		type: String,
		// required: [true, 'must provide image url'],
		// trim: true,
	},
	sales: {
		type: Boolean,
		default: false,
	},
	instock: {
		type: Boolean,
		default: false,
	},
})

module.exports = mongoose.model('Product', ProductSchema)
