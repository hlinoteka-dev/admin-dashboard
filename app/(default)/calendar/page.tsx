export const metadata = {
	title: 'Calendar - Hlinoteka',
	description: 'Page description',
}

import Link from 'next/link'
import { CalendarProvider } from './calendar-context'
import CalendarNavigation from './calendar-navigation'
import CalendarTable from './calendar-table'
import CalendarTitle from './title'

export default function Calendar() {

	return (
		<CalendarProvider>
			<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">

				{/* Page header */}
				<div className="sm:flex sm:justify-between sm:items-center mb-4">

					{/* Left: Title */}
					<CalendarTitle />

					{/* Right: Actions */}
					<div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

						<CalendarNavigation />

						<hr className="w-px h-full bg-slate-200 dark:bg-slate-700 border-none mx-1" />

						{/* Create event button */}
						<Link className="btn bg-indigo-500 hover:bg-indigo-600 text-white" href="/calendar/new">
							<svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
								<path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
							</svg>
							<span className="hidden xs:block ml-2">Create Event</span>
						</Link>

					</div>

				</div>

				<CalendarTable />

			</div>
		</CalendarProvider>
	)
}