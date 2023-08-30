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

export default function EventForm({ id }: { id: string }) {
	return (
		<form>
			<div className="mb-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-5 py-6">
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="eventName">
							Name
						</label>
						<input id="eventName" className="form-input w-full" type="text" placeholder="Cool Event" autoComplete="off" />
					</div>
					<div>
						<span className="block text-sm font-medium mb-1">
							From
						</span>
						<Datepicker />
					</div>
					<div>
						<span className="block text-sm font-medium mb-1">
							To
						</span>
						<Datepicker />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="eventUrl">
							URL
						</label>
						<input id="eventUrl" className="form-input w-full" type="text" placeholder="Event URL" autoComplete="off" />
					</div>
				</div>
				<div className="px-5">
					<label className="block text-sm font-medium mb-1" htmlFor="eventDescription">
						Description
					</label>
					<textarea id="eventDescription" className="form-input w-full" placeholder="Pretty pot" />
				</div>
				<div className="px-5 py-6">
					<h2 className="mb-4 font-semibold text-slate-800 dark:text-slate-100">Main Photo</h2>
					<div className="flex gap-6">
						<label className="flex flex-col btn w-24 h-24 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300 cursor-pointer">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
							</svg>
							<span>Upload</span>
							<input type="file" className="hidden" />
						</label>
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