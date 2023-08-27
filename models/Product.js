import { Schema, model, models } from 'mongoose'

const ProductSchema = new Schema({
	name: {type: String, required: true},
	price: {type: Number, required: true},
	author: {type: String, required: true},
	size: {type: String, required: true},
	topProduct: Boolean,
	newProduct: Boolean
})

export const Product = models.Product || model('Product', ProductSchema)