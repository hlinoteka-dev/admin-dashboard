'use client'

import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import { redirect } from "next/navigation"
import EventDelete from "./event-delete"
import Datepicker from "../datepicker"
import { revalidate } from "@/lib/revalidate"

interface Image {
	url: string
	description: string
}

export default function EventForm({ id }: { id?: string }) {
	const [name, setName] = useState('')
	const [active, setActive] = useState(false)
	const [time, setTime] = useState([])
	const [description, setDescription] = useState('')
	const [url, setUrl] = useState('')
	const [images, setImages] = useState([]) as any[]
	const [photographer, setPhotographer] = useState('')
	const [getOut, setGetOut] = useState(false)
	useEffect(() => {
		if (!id) return
		axios.get(`/api/events?id=${id}`).then(res => {
			const { name, active, time, description, url, images, photographer } = res.data
			setName(name)
			setActive(active)
			setTime(time)
			setDescription(description)
			setUrl(url)
			setImages(images)
			setPhotographer(photographer)
		})
	}, [id])
	async function saveEvent(e: { preventDefault: () => void }) {
		e.preventDefault()
		const data = { name, active, time, description, url, images, photographer }
		if (id) {
			await axios.put(`/api/events?id=${id}`, { ...data, _id: id })
		} else {
			await axios.post('/api/events', data)
		}
		await revalidate("events")
		setGetOut(true)
	}
	if (getOut) {
		return redirect('/events')
	}
	async function uploadImages(e: any) {
		const files = [...e.target.files]
		const data = new FormData()
		for (const file of files) {
			data.append('files', file)
		}
		const response = await axios.post('/api/upload', data)
		setImages((prev: any) => [...prev, ...response.data])
	}
	function deleteImage(e: any, url: string) {
		e.preventDefault()
		const regex = /\/([^/]+)$/
		const image = url.match(regex)![1]
		axios.delete(`/api/upload?delete=${image}`)
		setImages((prev: any) => prev.filter((image: Image) => image.url !== url))
	}
	return (
		<form onSubmit={saveEvent}>
			<div className="mb-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
				<div className="px-5 pt-6">
					<div className="flex gap-4">
						<div className="">
							<label className="flex items-center">
								<input type="checkbox" className="form-checkbox" onChange={e => setActive(e.target.checked)} checked={active} />
								<span className="text-sm ml-2">Active</span>
							</label>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-5 pt-6">
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="eventName">
							Name
							<span className="text-red-500">&nbsp;*</span>
						</label>
						<input id="eventName" className="form-input w-full" type="text" placeholder="Beautiful Pot" value={name} onChange={e => setName(e.target.value)} autoComplete="off" required />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="eventDates">
							Dates
							<span className="text-red-500">&nbsp;*</span>
						</label>
						<Datepicker type="date" data={time} setData={setTime} loading={id ? true : false} />
					</div>
					<div className="flex gap-2">
						<div className="w-full">
							<label className="block text-sm font-medium mb-1" htmlFor="eventStartTime">
								Start
							</label>
							<Datepicker type="time" data={time} setData={setTime} flag="startTime" loading={id ? true : false} />
						</div>
						<div className="w-full">
							<label className="block text-sm font-medium mb-1" htmlFor="eventEndTime">
								End
							</label>
							<Datepicker type="time" data={time} setData={setTime} flag="endTime" loading={id ? true : false} />
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="eventUrl">
							URL
						</label>
						<input id="eventUrl" className="form-input w-full" type="text" placeholder="Beautiful Pot" value={url} onChange={e => setUrl(e.target.value)} autoComplete="off" />
					</div>
				</div>
				<div className="px-5 pt-6">
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="eventText">
							Description
						</label>
						<textarea id="eventText" className="form-input w-full" placeholder="Event description" value={description} onChange={e => setDescription(e.target.value)} autoComplete="off" />
					</div>
				</div>
				<div className="px-5 pt-6">
					<h2 className="mb-4 font-semibold text-slate-800 dark:text-slate-100">Photos</h2>
					<div className="flex gap-4">
						{images.length > 0 && (
							images.map((image: Image) => (
								<div key={image.url} className="mb-4">
									<div className="flex gap-4 w-full">
										<div
											className="relative flex flex-col btn p-0 w-24 h-24 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
										>
											{/.(jpg|png|JPG|PNG)$/.test(image.url) && (
												<a
													href={image.url}
													target="_blank"
													className="w-full h-full"
												>
													<img src={image.url} alt="" className="w-full h-full object-cover" />
												</a>
											)}
											<button
												className="absolute -top-2 -right-2 text-rose-500 hover:scale-110"
												onClick={e => deleteImage(e, image.url)}
											>
												<svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
													<path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
												</svg>
											</button>
										</div>
									</div>
								</div>
							))
						)}
					</div>
					<div className="flex gap-6">
						<label className="flex flex-col btn w-24 h-24 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300 cursor-pointer">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
							</svg>
							<span>Upload</span>
							<input type="file" className="hidden" multiple onChange={uploadImages} />
						</label>
					</div>
				</div>
				<div className="px-5 py-6">
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="eventText">
							Photographer
						</label>
						<input id="eventText" className="form-input w-full" type="text" placeholder="Event photographer" value={photographer} onChange={e => setPhotographer(e.target.value)} autoComplete="off" />
					</div>
				</div>
			</div>
			<div className="flex gap-x-4">
				{id ? <EventDelete id={id} /> : (<span className="mr-auto"></span>)}
				<Link
					className="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
					href="/events"
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
