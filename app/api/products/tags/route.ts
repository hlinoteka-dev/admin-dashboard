import { Tag } from "@/models/Tag"
import { mongooseConnect } from "@/lib/mongoose"

export async function GET(request: Request) {
	await mongooseConnect()
	const tags = await Tag.find()
	return new Response(JSON.stringify(tags))
}

export async function POST(request: Request) {
	await mongooseConnect()
	const requestBody = await request.json()
	const { name } = requestBody
	const tagDoc = await Tag.create({
		name,
	})
	return new Response(JSON.stringify(tagDoc))
}

export async function DELETE(request: Request) {
	await mongooseConnect()
	const url = new URL(request.url)
	const id = url.searchParams.get("id")
	if (id) {
		await Tag.deleteOne({ _id: id })
		return new Response("Tag deleted")
	} else {
		return new Response("Tag not deleted")
	}
}