"use client"

import { useState, useEffect } from 'react'
import Flatpickr from 'react-flatpickr'
import { Hook, Options } from 'flatpickr/dist/types/options'

export default function Datepicker({ align, type, data, setData, flag, loading }: { align?: string, type?: string, data?: any, setData?: any, flag?: string, loading?: boolean }) {

	const [options, setOptions] = useState<Options | null>()

	const onReady: Hook = (selectedDates, dateStr, instance) => {
		const customClass = align ?? ''
		instance.calendarContainer.classList.add(`flatpickr-${customClass}`)
	}

	const onChange: Hook = (selectedDates, dateStr, instance) => {
		if (type === 'time' && flag === 'startTime') {
			// Extract the existing date from the first element of the "data" array
			const existingDate = new Date(data[0])

			// Extract the hour and minute values from the selected time
			const selectedTime = new Date(selectedDates[0])
			const selectedHour = selectedTime.getHours()
			const selectedMinute = selectedTime.getMinutes()

			// Update the hour and minute of the existing date
			existingDate.setHours(selectedHour)
			existingDate.setMinutes(selectedMinute)

			// Update the "data" array with the modified date
			const newData = [existingDate, data[1]]
			setData(newData)
		} else if (type === 'time' && flag === 'endTime') {
			// Similar steps as above for the end time
			const existingDate = new Date(data[1])
			const selectedTime = new Date(selectedDates[0])
			const selectedHour = selectedTime.getHours()
			const selectedMinute = selectedTime.getMinutes()
			existingDate.setHours(selectedHour)
			existingDate.setMinutes(selectedMinute)
			const newData = [data[0], existingDate]
			setData(newData)
		} else {
			// For other cases, simply set the "data" array with the selected dates
			setData(selectedDates.map(date => date))
		}
	}

	useEffect(() => {
		const dateOptions: Options = {
			mode: 'range',
			static: true,
			monthSelectorType: 'static',
			dateFormat: 'M j, Y',
			prevArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
			nextArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
			onReady,
			onChange,
			locale: {
				firstDayOfWeek: 1
			},
			defaultDate: data
		}

		const timeOptions: Options = {
			enableTime: true,
			noCalendar: true,
			dateFormat: "H:i",
			time_24hr: true,
			onReady,
			onChange,
		}

		if (data != null && data.length > 0) {
			if (type == 'time') {
				const startTimeHours = new Date(data[0]).getHours()
				const startTimeMinutes = new Date(data[0]).getMinutes()
				const endTimeHours = new Date(data[1]).getHours()
				const endTimeMinutes = new Date(data[1]).getMinutes()
				if (startTimeHours == endTimeHours && startTimeMinutes == endTimeMinutes) {
					setOptions(timeOptions)
				} else {
					if (flag == 'startTime') {
						setOptions({ ...timeOptions, defaultDate: data[0] })
					} else if (flag == 'endTime') {
						setOptions({ ...timeOptions, defaultDate: data[1] })
					}
				}
			} else {
				setOptions({ ...dateOptions, defaultDate: data })
			}
		} else if (loading == false) {
			if (type == 'time') {
				setOptions(timeOptions)
			} else {
				setOptions(dateOptions)
			}
		}
	}, [data])

	return (
		<div className="relative">
			{options ? (
				<div>
					<Flatpickr
						className="w-full form-input pl-9 dark:bg-slate-800 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200 font-medium"
						options={options}
					/>
					{type === 'date' ? (
						<div className="absolute inset-0 right-auto flex items-center pointer-events-none">
							<svg className="w-4 h-4 fill-current text-slate-500 dark:text-slate-400 ml-3" viewBox="0 0 16 16">
								<path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
							</svg>
						</div>
					) : (
						<div className="absolute inset-0 right-auto flex items-center pointer-events-none">
							<svg className="w-4 h-4 fill-current text-slate-500 dark:text-slate-400 ml-3" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
					)}
				</div>
			) : (
				<div>
					<div className="w-full form-input pl-9 dark:bg-slate-800 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200 font-medium">Loading...</div>
					<div className="absolute inset-0 right-auto flex items-center pointer-events-none">
						<svg aria-hidden="true" className="w-6 h-6 ml-2 text-gray-200 animate-spin dark:text-gray-600 fill-indigo-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
							<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
						</svg>
					</div>
				</div>
			)}
		</div>
	)
}