'use client'

import { useState } from "react"
import axios from "axios"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Product } from "@/app/(default)/products/products-table"

export default function ProductForm({
	_id,
	name: productName,
	price: productPrice,
	author: productAuthor,
	size: productSize,
	topProduct: productTopProduct,
	newProduct: productNewProduct
}: Product) {
	const [name, setName] = useState(productName || '')
	const [price, setPrice] = useState(productPrice || '')
	const [author, setAuthor] = useState(productAuthor || '')
	const [size, setSize] = useState(productSize || '')
	const [topProduct, setTopProduct] = useState(productTopProduct || false)
	const [newProduct, setNewProduct] = useState(productNewProduct || false)
	const [getOut, setGetOut] = useState(false)
	async function saveProduct(e: { preventDefault: () => void }) {
		e.preventDefault()
		const data = { name, price, author, size, topProduct, newProduct }
		if (_id) {
			await axios.put(`/api/products?id=${_id}`, {...data, _id})
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
								<input type="checkbox" className="form-checkbox" onChange={e => setTopProduct(e.target.checked)} defaultChecked={topProduct} />
								<span className="text-sm ml-2">Top Product</span>
							</label>
						</div>
						<div className="">
							<label className="flex items-center">
								<input type="checkbox" className="form-checkbox" onChange={e => setNewProduct(e.target.checked)} defaultChecked={newProduct} />
								<span className="text-sm ml-2">New Product</span>
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
					Save
				</button>
			</div>
		</form>
	)
}