import Link from 'next/link'
import Props from '@/components/props'
import { Event } from './events-table'
import EventsTableItemDelete from './events-table-item-delete'

interface EventsTableItemProps {
	event: Event
}

export default function EventsTableItem({ event }: EventsTableItemProps) {
	const dateOptions: Intl.DateTimeFormatOptions = {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
	}

	const timeOptions: Intl.DateTimeFormatOptions = {
		hour: 'numeric',
		minute: 'numeric',
	}

	const isSameDate = event.time[0] === event.time[1]
	const isSameTime =
		new Date(event.time[0]).getHours() === new Date(event.time[1]).getHours() &&
		new Date(event.time[0]).getMinutes() === new Date(event.time[1]).getMinutes()

	return (
		<tr>
			<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
				<Link
					className="font-medium text-sky-500 underline hover:no-underline"
					href={`/events/edit/${event._id}`}
				>
					{event.name}
				</Link>
			</td>
			<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
				<div className="font-medium">
					{isSameDate
						? new Date(event.time[0]).toLocaleString('cs-CZ', dateOptions)
						: `${new Date(event.time[0]).toLocaleString('cs-CZ', dateOptions)} - ${new Date(
							event.time[1]
						).toLocaleString('cs-CZ', dateOptions)}`}
				</div>
			</td>
			<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
				<div className="font-medium">
					{isSameTime ? 'All day' : `${new Date(event.time[0]).toLocaleString('cs-CZ', timeOptions)} - ${new Date(
						event.time[1]
					).toLocaleString('cs-CZ', timeOptions)}`}
				</div>
			</td>
			<td className="flex px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
				<div className={`text-xs font-medium bg-${event.active ? 'emerald' : 'amber'}-100 dark:bg-${event.active ? 'emerald' : 'amber'}-400/30 text-${event.active ? 'emerald' : 'amber'}-600 dark:text-${event.active ? 'emerald' : 'amber'}-400 rounded-full text-center px-2.5 py-1`}>
					{event.active ? 'Active' : 'Archived'}
				</div>
			</td>
			<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
				<div className="space-x-1">
					<Link
						className="inline-flex text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full"
						href={`/events/edit/${event._id}`}
					>
						<span className="sr-only">Edit</span>
						<svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
							<path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
						</svg>
					</Link>
					<EventsTableItemDelete event={event} />
				</div>
			</td>
		</tr>
	)
}