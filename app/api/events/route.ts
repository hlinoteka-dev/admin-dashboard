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
	const events = await Event.find().sort({ time: -1 })
	return new Response(JSON.stringify(events))
}

export async function POST(request: Request) {
	await mongooseConnect()
	const requestBody = await request.json()
	const { name, active, time, url, description, images, photographer } = requestBody
	const eventDoc = await Event.create({
		name,
		active,
		time,
		url,
		description,
		images,
		photographer
	})
	return new Response(eventDoc)
}

export async function PUT(request: Request) {
	await mongooseConnect()
	const requestBody = await request.json()
	const { _id, name, active, time, url, description, images, photographer } = requestBody
	await Event.updateOne({ _id }, {
		name,
		active,
		time,
		url,
		description,
		images,
		photographer
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