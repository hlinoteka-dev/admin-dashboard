import { Event } from "@/models/event"
import { mongooseConnect } from "@/lib/mongoose"

export async function GET(request: Request) {
	await mongooseConnect()
	const url = new URL(request.url)
	const id = url.searchParams.get("id")
	if (id) {
		const event = await Event.findOne({ _id: id })
		return new Response(JSON.stringify(event))
	}
	const events = await Event.find()
	return new Response(JSON.stringify(events))
}

export async function POST(request: Request) {
	await mongooseConnect()
	const requestBody = await request.json()
	const { name, dateFrom, dateTo, description, url, color, image } = requestBody
	const eventDoc = await Event.create({
		name,
		dateFrom,
		dateTo,
		description,
		url,
		color,
		image
	})
	return new Response(eventDoc)
}

export async function PUT(request: Request) {
	await mongooseConnect()
	const requestBody = await request.json()
	const { _id, name, dateFrom, dateTo, description, url, color, image } = requestBody
	await Event.updateOne({ _id }, {
		name,
		dateFrom,
		dateTo,
		description,
		url,
		color,
		image
	})
	return new Response("Event updated")
}

export async function DELETE(request: Request) {
	await mongooseConnect()
	const url = new URL(request.url)
	const id = url.searchParams.get("id")
	if (id) {
		await Event.deleteOne({ _id: id })
		return new Response("Event deleted")
	} else {
		return new Response("Event not deleted")
	}
}