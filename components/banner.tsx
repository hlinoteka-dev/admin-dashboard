import { ReactElement } from 'react'

interface BannerProps {
	children: React.ReactNode
	className?: string
	type?: 'warning' | 'error' | 'success' | ''
}

export default function Banner({
	children,
	className = '',
	type = '',
}: BannerProps) {

	const typeIcon = (type: string): ReactElement => {
		switch (type) {
			case 'warning':
				return (
					<svg className="w-4 h-4 shrink-0 fill-current opacity-80 mt-[3px] mr-3" viewBox="0 0 16 16">
						<path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
					</svg>
				)
			case 'error':
				return (
					<svg className="w-4 h-4 shrink-0 fill-current opacity-80 mt-[3px] mr-3" viewBox="0 0 16 16">
						<path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8 9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z" />
					</svg>
				)
			case 'success':
				return (
					<svg className="w-4 h-4 shrink-0 fill-current opacity-80 mt-[3px] mr-3" viewBox="0 0 16 16">
						<path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z" />
					</svg>
				)
			default:
				return (
					<svg className="w-4 h-4 shrink-0 fill-current opacity-80 mt-[3px] mr-3" viewBox="0 0 16 16">
						<path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
					</svg>
				)
		}
	}

	const typeColor = (type: string): string => {
		switch (type) {
			case 'warning':
				return 'bg-amber-500'
			case 'error':
				return 'bg-rose-500'
			case 'success':
				return 'bg-emerald-500'
			default:
				return 'bg-indigo-500'
		}
	}

	return (
		<>
			<div className={className} role="alert">
				<div className={`px-4 py-2 rounded-sm text-sm text-white ${typeColor(type)}`}>
					<div className="flex w-full justify-between items-start">
						<div className="flex">
							{typeIcon(type)}
							<div className="font-medium">
								{children}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}