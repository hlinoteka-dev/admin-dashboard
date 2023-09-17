import { Product } from "@/models/Product"
import { mongooseConnect } from "@/lib/mongoose"

export async function GET(request: Request) {
	await mongooseConnect()
	const url = new URL(request.url)
	const id = url.searchParams.get("id")
	if (id) {
		const product = await Product.findOne({ _id: id })
		return new Response(JSON.stringify(product))
	}
	const products = await Product.find()
	return new Response(JSON.stringify(products))
}

export async function POST(request: Request) {
	await mongooseConnect()
	const requestBody = await request.json()
	const { name, price, author, size, topProduct, newProduct, images } = requestBody
	const productDoc = await Product.create({
		name,
		price,
		author,
		size,
		topProduct,
		newProduct,
		images
	})
	return new Response(productDoc)
}

export async function PUT(request: Request) {
	await mongooseConnect()
	const requestBody = await request.json()
	const { _id, name, price, author, size, topProduct, newProduct, images } = requestBody
	await Product.updateOne({ _id }, {
		name,
		price,
		author,
		size,
		topProduct,
		newProduct,
		images
	})
	return new Response("Product updated")
}

export async function DELETE(request: Request) {
	await mongooseConnect()
	const url = new URL(request.url)
	const id = url.searchParams.get("id")
	if (id) {
		await Product.deleteOne({ _id: id })
		return new Response("Product deleted")
	} else {
		return new Response("Product not deleted")
	}
}