'use client'

import { signIn } from 'next-auth/react'

export default function GoogleAuthButton() {
	return (
		<button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => { signIn('google')}}>Sign In With Google</button>
	)
}
