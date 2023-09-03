'use client'

import { useState } from 'react'
import ModalBlank from '@/components/modal-blank'
import { Event } from './events-table'
import axios from 'axios'

export default function EventsTableItemDelete({ event }: { event: Event }) {

	const [dangerModalOpen, setDangerModalOpen] = useState<boolean>(false)

	async function deleteEvent() {
		setDangerModalOpen(false)
		await axios.delete(`/api/events?id=${event._id}`)
		window.location.reload()
	}

	return (
		<>
			{/* Start */}
			<button className="text-rose-500 hover:text-rose-600 rounded-full" onClick={() => { setDangerModalOpen(true) }}>
				<span className="sr-only">Delete</span>
				<svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
					<path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
					<path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
				</svg>
			</button>
			<ModalBlank isOpen={dangerModalOpen} setIsOpen={setDangerModalOpen}>
				<div className="p-5 flex space-x-4">
					{/* Icon */}
					<div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100 dark:bg-rose-500/30">
						<svg className="w-4 h-4 shrink-0 fill-current text-rose-500" viewBox="0 0 16 16">
							<path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
						</svg>
					</div>
					{/* Content */}
					<div>
						{/* Modal header */}
						<div className="mb-2">
							<div className="text-lg font-semibold text-slate-800 dark:text-slate-100">Delete {event.name}?</div>
						</div>
						{/* Modal content */}
						<div className="text-sm mb-10">
							<div className="space-y-2">
								<p>This action cannot be undone. This will permanently delete <span className="font-bold">{event.name}</span> from your store.</p>
							</div>
						</div>
						{/* Modal footer */}
						<div className="flex flex-wrap justify-end space-x-2">
							<button className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300" onClick={() => { setDangerModalOpen(false) }}>Cancel</button>
							<button className="btn-sm bg-rose-500 hover:bg-rose-600 text-white" onClick={() => { deleteEvent() }}>Yes, Delete it</button>
						</div>
					</div>
				</div>
			</ModalBlank>
			{/* End */}
		</>
	)
}
