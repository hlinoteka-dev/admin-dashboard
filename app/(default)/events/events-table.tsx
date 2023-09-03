'use client'

import axios from 'axios'
import { useState, useEffect } from 'react'
import EventsTableItem from './events-table-item'

export interface Event {
	_id: string
	name: string
	time: Date[]
	active: boolean
}

export default function EventsTable() {
	const [events, setEvents] = useState([])
	useEffect(() => {
		axios.get('/api/events')
			.then(res => setEvents(res.data))
			.catch(err => console.log(err))
	}, [])
	return (
		<div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
			<header className="px-5 py-4">
				<h2 className="font-semibold text-slate-800 dark:text-slate-100">Events <span className="text-slate-400 dark:text-slate-500 font-medium">{events.length}</span></h2>
			</header>
			<div>

				{/* Table */}
				<div className="overflow-x-auto">
					<table className="table-auto w-full dark:text-slate-300">
						{/* Table header */}
						<thead className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
							<tr>
								<th className="px-1 first:pl-2 last:pr-2 py-2 whitespace-nowrap">
									<div className="font-semibold text-left">Name</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Date(s)</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Time</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Status</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Actions</div>
								</th>
							</tr>
						</thead>
						{/* Table body */}
						<tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
							{events.map((event: Event) => (
								<EventsTableItem
									key={event._id}
									event={event} />
							))}
						</tbody>
					</table>
					{/* Empty state */}
					{events.length === 0 && (
						<div className="p-4 w-full font-medium text-center">No events</div>
					)}
				</div>
			</div>
		</div>
	)
}