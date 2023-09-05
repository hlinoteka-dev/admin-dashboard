import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb'

export const options: NextAuthOptions = {
	providers: [
		// GithubProvider({
		// 	clientId: process.env.GITHUB_ID as string,
		// 	clientSecret: process.env.GITHUB_SECRET as string
		// }),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials): Promise<any | null> {
				const user = { id: 42, name: process.env.NEXTAUTH_USERNAME as string, password: process.env.NEXTAUTH_PASSWORD as string }
				if (credentials?.username === user.name && credentials?.password === user.password) {
					return user
				} else {
					return null
				}
			}
		})
	],
	secret:  process.env.NEXTAUTH_SECRET as string,
	adapter: MongoDBAdapter(clientPromise),
}