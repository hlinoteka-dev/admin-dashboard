export const metadata = {
	title: 'New Event - Hlinoteka'
}

import EventForm from "@/components/events/event-form"

function NewEvent() {
	return (
		<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
			{/* Page header */}
			<div className="sm:flex sm:justify-between sm:items-center mb-5">

				{/* Left: Title */}
				<div className="mb-4 sm:mb-0">
					<h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">New Event</h1>
				</div>

			</div>
			<EventForm />
		</div>
	)
}

export default NewEvent