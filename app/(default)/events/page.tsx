export const metadata = {
	title: 'Events - Hlinoteka'
}

import Link from 'next/link'
import EventsTable from './events-table'

function EventsContent() {
	return (
		<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
			{/* Page header */}
			<div className="sm:flex sm:justify-between sm:items-center mb-5">

				{/* Left: Title */}
				<div className="mb-4 sm:mb-0">
					<h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Events</h1>
				</div>

				{/* Right: Actions */}
				<div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
					{/* New Event Button */}
					<Link className="btn bg-indigo-500 hover:bg-indigo-600 text-white" href="/events/new">
						<svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
							<path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
						</svg>
						<span className="hidden xs:block ml-2">New Event</span>
					</Link>
				</div>

			</div>

			{/* Table */}
			<EventsTable />

		</div>
	)
}

export default function Events() {
	return (
		<EventsContent />
	)
}