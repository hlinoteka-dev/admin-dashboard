import { Product } from "@/models/product"
import { mongooseConnect } from "@/lib/mongoose"

export async function GET(request: Request) {
	await mongooseConnect()
	// check for query id
	const url = new URL(request.url); // Convert the URL string to a URL object
	const id = url.searchParams.get("id"); // Get the value of the "id" parameter from searchParams
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
	const { name, price, author, size, topProduct, newProduct } = requestBody
	const productDoc = await Product.create({
		name,
		price,
		author,
		size,
		topProduct,
		newProduct,
	})
	return new Response(productDoc)
}

export async function PUT(request: Request) {
	await mongooseConnect()
	const requestBody = await request.json()
	const { _id, name, price, author, size, topProduct, newProduct } = requestBody
	await Product.updateOne({ _id }, {
		name,
		price,
		author,
		size,
		topProduct,
		newProduct,
	})
	return new Response("Product updated")
}