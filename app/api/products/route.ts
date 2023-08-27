import { Product } from "@/models/product"
import { mongooseConnect } from "@/lib/mongoose"

export async function GET() {
	await mongooseConnect()
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