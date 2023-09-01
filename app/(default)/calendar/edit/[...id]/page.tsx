export const metadata = {
	title: 'Edit Event - Hlinoteka'
}

import Banner from '@/components/banner'
import EventForm from "@/components/events/event-form"

function EditEvent({ params }: { params: { id: string } }) {
	const { id } = params

	return (
		<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
			{/* Page header */}
			<div className="sm:flex sm:justify-between sm:items-center mb-5">

				{/* Left: Title */}
				<div className="mb-4 sm:mb-0">
					<h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Edit Event</h1>
				</div>

			</div>

			<Banner className="mb-4">
				If you wish to delete this event, I suggest you to delete the photo first and then delete the event. This way you will not have any orphaned photos in the database.
			</Banner>

			<EventForm id={id} page="edit" />
		</div>
	)
}

export default EditEvent