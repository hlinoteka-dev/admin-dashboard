export const metadata = {
	title: 'Sign In - Hlinoteka',
	description: 'Page description',
}

import AuthHeader from '../auth-header'
import AuthImage from '../auth-image'

export default async function SignIn() {
	return (
		<main className="bg-white dark:bg-slate-900">

			<div className="relative md:flex">

				{/* Content */}
				<div className="md:w-1/2">
					<div className="min-h-[100dvh] h-full flex flex-col after:flex-1">

						<AuthHeader />

						<div className="max-w-sm mx-auto w-full py-8">
							<h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Welcome back! 😊</h1>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium mb-1" htmlFor="email">Email Address</label>
									<input id="email" className="form-input w-full" type="email" />
								</div>
								<div>
									<label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
									<input id="password" className="form-input w-full" type="password" autoComplete="on" />
								</div>
							</div>
							<div className="flex items-center justify-between mt-6">
								<button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">Sign In</button>
							</div>
							{/* Footer */}
							<div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
								{/* Warning */}
								<div className="bg-emerald-100 dark:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400 px-3 py-2 rounded">
									<svg className="inline w-3 h-3 shrink-0 fill-current mr-2" viewBox="0 0 12 12">
										<path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
									</svg>
									<span className="text-sm">
										For support, please reach out to Hristo Koev at hristo@koev.me
									</span>
								</div>
							</div>
						</div>

					</div>
				</div>

				<AuthImage />

			</div>

		</main>
	)
}
