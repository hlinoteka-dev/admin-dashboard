'use client'

import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import { redirect } from "next/navigation"
import EventDelete from "./event-delete"
import Datepicker from "../datepicker"

interface Image {
	url: string
	description: string
}

export default function EventForm({ id, page }: { id?: string, page?: string }) {

	const [name, setName] = useState<string>('')
	const [dateFrom, setDateFrom] = useState<string>('')
	const [dateTo, setDateTo] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [url, setUrl] = useState<string>('')
	const [color, setColor] = useState<string>('indigo')
	const [image, setImage] = useState<Image | any>(null)
	const [getOut, setGetOut] = useState<boolean>(false)

	useEffect(() => {
		if (!id) return
		axios.get(`/api/events?id=${id}`).then(res => {
			const { name, dateFrom, dateTo, description, url, color, image } = res.data
			setName(name)
			setDateFrom(dateFrom)
			setDateTo(dateTo)
			setDescription(description)
			setUrl(url)
			setColor(color)
			setImage(() => {
				if (image) {
					return image[0]
				} else {
					return null
				}
			})
		})
	}, [id])
	async function saveEvent(e: { preventDefault: () => void }) {
		e.preventDefault()
		const data = { name, dateFrom, dateTo, description, url, color, image }
		console.log(data)
		if (id) {
			await axios.put(`/api/events?id=${id}`, { ...data, _id: id })
		} else {
			await axios.post('/api/events', data)
		}
		setGetOut(true)
	}
	if (getOut) {
		return redirect('/calendar')
	}

	async function uploadImages(e: any) {
		const file = e.target.files[0]
		const data = new FormData()
			data.append('files', file)
		const response = await axios.post('/api/upload', data)
		setImage(response.data[0])
	}
	function deleteImage(e: any, url: string) {
		e.preventDefault()
		const regex = /\/([^/]+)$/
		const image = url.match(regex)![1]
		axios.delete(`/api/upload?delete=${image}`)
		setImage(null)
	}

	return (
		<form onSubmit={saveEvent}>
			<div className="mb-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-5 py-6">
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="eventName">
							Name
							<span className="text-red-500">&nbsp;*</span>
						</label>
						<input id="eventName" className="form-input w-full" type="text" defaultValue={name} placeholder="Cool Event" autoComplete="off" onChange={(e) => { setName(e.target.value) }} required />
					</div>
					<div>
						<span className="block text-sm font-medium mb-1">
							From
							<span className="text-red-500">&nbsp;*</span>
						</span>
						<Datepicker date={dateFrom} setDate={setDateFrom} page={page} />
					</div>
					<div>
						<span className="block text-sm font-medium mb-1">
							To
							<span className="text-red-500">&nbsp;*</span>
						</span>
						<Datepicker date={dateTo} setDate={setDateTo} page={page} />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="eventUrl">
							URL
							<span className="text-red-500">&nbsp;*</span>
						</label>
						<input id="eventUrl" className="form-input w-full" type="text" defaultValue={url} placeholder="Event URL" autoComplete="off" onChange={(e) => { setUrl(e.target.value) }} required />
					</div>
				</div>
				<div className="px-5">
					<label className="block text-sm font-medium mb-1" htmlFor="eventDescription">
						Description
						<span className="text-red-500">&nbsp;*</span>
					</label>
					<textarea id="eventDescription" className="form-input w-full" placeholder="Pretty pot" defaultValue={description} onChange={(e) => { setDescription(e.target.value) }} required />
				</div>
				<div className="px-5 py-6">
					<h2 className="mb-4 font-semibold text-slate-800 dark:text-slate-100">Main Photo</h2>
					{image && (
						<div className="flex flex-col gap-4 mb-4">
							<div key={image.url}>
								<div className="flex gap-4 w-full">
									<div
										className="flex flex-col btn overflow-hidden p-0 w-24 h-24 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
									>
										{/.(jpg|png)$/.test(image.url) && (
											<a
												href={image.url}
												target="_blank"
												className="w-full h-full"
											>
												<img src={image.url} alt="" className="w-full h-full object-cover" />
											</a>
										)}

									</div>

									<button
										className="text-rose-500 hover:scale-110"
										onClick={e => deleteImage(e, image.url)}
									>
										<svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
											<path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
										</svg>
									</button>
								</div>
							</div>
						</div>
					)}
					<div className="flex gap-6">
						{!image && (
							<label className="flex flex-col btn w-24 h-24 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300 cursor-pointer">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
								</svg>
								<span>Upload</span>
								<input type="file" className="hidden" onChange={uploadImages} />
							</label>
						)}
					</div>
				</div>
			</div >
			<div className="flex gap-x-4">
				{id ? <EventDelete id={id} /> : (<span className="mr-auto"></span>)}
				<Link
					className="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
					href="/calendar"
				>
					Cancel
				</Link>
				<button
					className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
					type="submit"
				>
					{id ? 'Save' : 'Create'}
				</button>
			</div>
		</form >
	)
}