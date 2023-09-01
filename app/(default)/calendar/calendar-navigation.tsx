'use client'

import { useEffect } from 'react'
import { CalendarProperties } from './calendar-properties'

export interface Event {
  eventStart: Date
  eventEnd: Date | null
  eventName: string
  eventColor: string
  isFirst: boolean
  isLast: boolean
}

export default function CalendarNavigation() {

  const {
    currentMonth,
    setCurrentMonth,
	currentYear,
	setCurrentYear,
    renderDays,
  } = CalendarProperties()  

  return (
    <>
      {/* Previous month button */}
      <button
        className="btn px-2.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 disabled:border-slate-200 dark:disabled:border-slate-700 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:cursor-not-allowed"
        disabled={currentYear === 2023 && currentMonth === 0}
        onClick={() => { 
			setCurrentMonth(currentMonth - 1)
			if (currentMonth === 0) {
				setCurrentMonth(11)
				setCurrentYear(currentYear - 1)
			}
			renderDays()
		}}
      >
        <span className="sr-only">Previous month</span><wbr />
        <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
          <path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z" />
        </svg>
      </button>

	  {/* Today */}
	  <button 
	  	className="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 rounded-none first:rounded-l last:rounded-r"
		onClick={() => {
			setCurrentMonth(new Date().getMonth())
			setCurrentYear(new Date().getFullYear())
			renderDays()
		}}>
			Today
		</button>

      {/* Next month button */}
      <button
        className="btn px-2.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 disabled:border-slate-200 dark:disabled:border-slate-700 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:cursor-not-allowed"
        // disabled={currentMonth === 11}
        onClick={() => { 
			setCurrentMonth(currentMonth + 1)
			if (currentMonth === 11) {
				setCurrentMonth(0)
				setCurrentYear(currentYear + 1)
			}
			renderDays()
		}}
      >
        <span className="sr-only">Next month</span><wbr />
        <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
          <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
        </svg>
      </button>    
    </>
  )
}