export const metadata = {
	title: 'Calendar - Mosaic',
	description: 'Page description',
}

import { CalendarProvider } from './calendar-context'
import CalendarNavigation from './calendar-navigation'
import CalendarTable from './calendar-table'
import CalendarTitle from './title'

export default function Calendar() {

	// Some dummy events data
	const events = [
		{
			eventStart: new Date(2023, 7, 2, 10),
			eventEnd: new Date(2023, 7, 4, 11),
			eventName: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
			eventColor: 'sky'
		},
	]

	const replicatedEvents = []

	for (const event of events) {
		const startTime = event.eventStart.getTime()
		const endTime = event.eventEnd.getTime()

		const numberOfDays = Math.ceil((endTime - startTime) / (24 * 60 * 60 * 1000))

		for (let i = 0; i < numberOfDays; i++) {
			const newEventStart = new Date(startTime + (i * 24 * 60 * 60 * 1000))
			const newEventEnd = new Date(newEventStart.getTime() + (endTime - startTime) % (24 * 60 * 60 * 1000))

			replicatedEvents.push({
				eventStart: newEventStart,
				eventEnd: newEventEnd,
				eventName: event.eventName,
				eventColor: event.eventColor,
				isFirst: i === 0,
				isLast: i === numberOfDays - 1,
			})
		}
	}

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
						<button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
							<svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
								<path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
							</svg>
							<span className="hidden xs:block ml-2">Create Event</span>
						</button>

					</div>

				</div>

				<CalendarTable events={replicatedEvents} />

			</div>
		</CalendarProvider>
	)
}