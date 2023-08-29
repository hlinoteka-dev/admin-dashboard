import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"

interface Image {
	url: string
	description: string
}

export async function POST(request: Request) {
	const myS3client = new S3Client({
		region: "eu-west-3",
		credentials: {
			accessKeyId: process.env.S3_ACCESS_KEY!,
			secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!
		},
	})
	const formData = await request.formData()
	const images = []
	for (const fileInfo of formData) {
		const imageObj = {} as Image
		const file = fileInfo[1]
		const name = Date.now().toString() + file.name
		const parts = []
		for await (const part of file.stream()) {
			parts.push(part)
		}			
		const buffer = Buffer.concat(parts)
		await myS3client.send(new PutObjectCommand({
			Bucket: "hlinoteka-dev",
			Key: name,
			Body: buffer,
			ACL: "public-read",
			ContentType: file.type,
		}))
		imageObj.url = `https://hlinoteka-dev.s3.eu-west-3.amazonaws.com/${name}`
		imageObj.description = ""
		images.push(imageObj)
	}
	return new Response(JSON.stringify(images))
}

export async function DELETE(request: Request) {
	const myS3client = new S3Client({
		region: "eu-west-3",
		credentials: {
			accessKeyId: process.env.S3_ACCESS_KEY!,
			secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!
		},
	})
	const url = new URL(request.url)
	const key = url.searchParams.get("delete")
	if (key) {
		await myS3client.send(new DeleteObjectCommand({
			Bucket: "hlinoteka-dev",
			Key: key,
		}))
		return new Response("File deleted")
	} else {
		return new Response("File not deleted")
	}
}