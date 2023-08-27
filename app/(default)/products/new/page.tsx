'use client'

import { useState } from "react"
import axios from "axios"
import Link from "next/link"
import { redirect } from "next/navigation"

export const metadata = {
	title: 'New Product - Hlinoteka'
}

function NewProduct() {
	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [author, setAuthor] = useState('')
	const [size, setSize] = useState('')
	const [topProduct, setTopProduct] = useState(false)
	const [newProduct, setNewProduct] = useState(false)
	const [getOut, setGetOut] = useState(false)
	async function createProduct(e: { preventDefault: () => void }) {
		e.preventDefault()
		const data = { name, price, author, size, topProduct, newProduct }
		await axios.post('/api/products', data)
		setGetOut(true)
	}
	if (getOut) {
		return redirect('/products')
	}
	return (
		<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
			{/* Page header */}
			<div className="sm:flex sm:justify-between sm:items-center mb-5">

				{/* Left: Title */}
				<div className="mb-4 sm:mb-0">
					<h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">New Product</h1>
				</div>

				{/* Right: Actions */}
				<div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-4">
					{/* New Product Button */}
					<div className="flex gap-x-4">
						<button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-yellow-400 hover:bg-yellow-600 text-white duration-150 ease-in-out">Top Product</button>
						<button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-emerald-400 hover:bg-emerald-600 text-white duration-150 ease-in-out">Novinka</button>
					</div>
				</div>

			</div>
			<form onSubmit={createProduct}>
				<div className="mb-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-5 py-6">
						<div>
							<label className="block text-sm font-medium mb-1" htmlFor="productName">
								Name
							</label>
							<input id="productName" className="form-input w-full" type="text" placeholder="Beautiful Pot" value={name} onChange={e => setName(e.target.value)} />
						</div>
						<div>
							<label className="block text-sm font-medium mb-1" htmlFor="productPrice">
								Price
							</label>
							<input id="productPrice" className="form-input w-full" type="text" placeholder="1 000 CZK" value={price} onChange={e => setPrice(e.target.value)} />
						</div>
						<div>
							<label className="block text-sm font-medium mb-1" htmlFor="productAuthor">
								Author
							</label>
							<input id="productAuthor" className="form-input w-full" type="text" placeholder="Jan Hus" value={author} onChange={e => setAuthor(e.target.value)} />
						</div>
						<div>
							<label className="block text-sm font-medium mb-1" htmlFor="productSize">
								Size
							</label>
							<input id="productSize" className="form-input w-full" type="text" placeholder="V: 20 cm Š: 30 cm" value={size} onChange={e => setSize(e.target.value)} />
						</div>
					</div>
					<div className="px-5 py-6">
						<div className="flex gap-4">
							<div className="">
								<label className="flex items-center">
									<input type="checkbox" className="form-checkbox" onChange={e => setTopProduct(e.target.checked)} />
									<span className="text-sm ml-2">Top Product {topProduct ? "Yes" : "No"}</span>
								</label>
							</div>
							<div className="">
								<label className="flex items-center">
									<input type="checkbox" className="form-checkbox" onChange={e => setNewProduct(e.target.checked)} />
									<span className="text-sm ml-2">New Product {newProduct ? "Yes" : "No"}</span>
								</label>
							</div>
						</div>
						<h2 className="mt-4 font-semibold text-slate-800 dark:text-slate-100">Photos</h2>
					</div>
				</div>
				<div className="flex gap-x-4">
					<Link
						className="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
						href="/products"
					>
						Cancel
					</Link>
					<button
						className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
						type="submit"
					>
						Add Product
					</button>
				</div>
			</form>
		</div>
	)
}

export default NewProduct