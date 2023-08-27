'use client'

import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function ProductForm({ id }: { id?: string }) {
	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [author, setAuthor] = useState('')
	const [size, setSize] = useState('')
	const [topProduct, setTopProduct] = useState(false)
	const [newProduct, setNewProduct] = useState(false)
	const [getOut, setGetOut] = useState(false)
	useEffect(() => {
		if (!id) return
		axios.get(`/api/products?id=${id}`).then(res => {
			const { name, price, author, size, topProduct, newProduct } = res.data
			setName(name)
			setPrice(price)
			setAuthor(author)
			setSize(size)
			setTopProduct(topProduct)
			setNewProduct(newProduct)
		})
	}, [id])
	async function saveProduct(e: { preventDefault: () => void }) {
		e.preventDefault()
		const data = { name, price, author, size, topProduct, newProduct }
		if (id) {
			await axios.put(`/api/products?id=${id}`, { ...data, _id:id })
		} else {
			await axios.post('/api/products', data)
		}
		setGetOut(true)
	}
	if (getOut) {
		return redirect('/products')
	}
	return (
		<form onSubmit={saveProduct}>
			<div className="mb-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-5 py-6">
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="productName">
							Name
						</label>
						<input id="productName" className="form-input w-full" type="text" placeholder="Beautiful Pot" value={name} onChange={e => setName(e.target.value)} autoComplete="off" />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="productPrice">
							Price
						</label>
						<input id="productPrice" className="form-input w-full" type="number" placeholder="1 000 CZK" value={price} onChange={e => setPrice(e.target.value)} autoComplete="off" />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="productAuthor">
							Author
						</label>
						<input id="productAuthor" className="form-input w-full" type="text" placeholder="Jan Hus" value={author} onChange={e => setAuthor(e.target.value)} autoComplete="off" />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="productSize">
							Size
						</label>
						<input id="productSize" className="form-input w-full" type="text" placeholder="V: 20 cm Š: 30 cm" value={size} onChange={e => setSize(e.target.value)} autoComplete="off" />
					</div>
				</div>
				<div className="px-5 py-6">
					<h2 className="mb-4 font-semibold text-slate-800 dark:text-slate-100">Params</h2>
					<div className="flex gap-4">
						<div className="">
							<label className="flex items-center">
								<input type="checkbox" className="form-checkbox" onChange={e => setTopProduct(e.target.checked)} checked={topProduct} />
								<span className="text-sm ml-2">Top Product</span>
							</label>
						</div>
						<div className="">
							<label className="flex items-center">
								<input type="checkbox" className="form-checkbox" onChange={e => setNewProduct(e.target.checked)} checked={newProduct} />
								<span className="text-sm ml-2">New Product</span>
							</label>
						</div>
					</div>
				</div>
				<div className="px-5 py-6">
					<h2 className="mb-4 font-semibold text-slate-800 dark:text-slate-100">Photos</h2>
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
					Save
				</button>
			</div>
		</form>
	)
}