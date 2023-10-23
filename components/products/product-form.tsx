'use client'

import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import { redirect } from "next/navigation"
import ProductDelete from "./product-delete"
import DropdownTag from "../dropdown-tags"
import { revalidate } from "@/lib/revalidate"

interface Image {
	url: string
	description: string
}

export default function ProductForm({ id }: { id?: string }) {
	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [author, setAuthor] = useState('')
	const [size, setSize] = useState('')
	const [topProduct, setTopProduct] = useState(false)
	const [newProduct, setNewProduct] = useState(false)
	const [productTags, setProductTags] = useState([]) as any[]
	const [images, setImages] = useState([]) as any[]
	const [unsavedImages, setUnsavedImages] = useState([]) as any[]
	const [flaggedImages, setFlaggedImages] = useState([]) as any[]
	const [loading, setLoading] = useState(false)
	const [getOut, setGetOut] = useState(false)
	const [formValidated, setFormValidated] = useState(false)
	useEffect(() => {
		if (!id) return
		axios.get(`/api/products?id=${id}`).then(res => {
			const { name, price, author, size, topProduct, newProduct, productTags, images } = res.data
			setName(name)
			setPrice(price)
			setAuthor(author)
			setSize(size)
			setTopProduct(topProduct)
			setNewProduct(newProduct)
			setProductTags(productTags)
			setImages(images)
		})
	}, [id])
	useEffect(() => {
		if (localStorage.getItem(id!)) {
			for (const image of JSON.parse(localStorage.getItem(id!) as string)) {
				deleteImage(image.url)
			}
			localStorage.removeItem(id!)
		} else if (localStorage.getItem('temp')) {
			for (const image of JSON.parse(localStorage.getItem('temp') as string)) {
				deleteImage(image.url)
			}
			localStorage.removeItem('temp')
		}
	}, [])
	useEffect(() => {
		if (name && price && author && size && (images.length > 0)) {
			setFormValidated(true)
		} else {
			setFormValidated(false)
		}
	}, [name, price, author, size, images])
	async function saveProduct(e: { preventDefault: () => void }) {
		e.preventDefault()
		const data = { name, price, author, size, topProduct, newProduct, productTags, images }
		if (id) {
			await axios.put(`/api/products?id=${id}`, { ...data, _id: id })
		} else {
			await axios.post('/api/products', data)
		}
		if (id) {
			localStorage.removeItem(id as string)
		} else if (localStorage.getItem('temp')) {
			localStorage.removeItem('temp')
		}
		if (flaggedImages && flaggedImages.length > 0) {
			for (const image of flaggedImages) {
				deleteImage(image.url)
			}
		}
		setGetOut(true)
	}
	if (getOut) {
		return redirect('/products')
	}
	async function uploadImages(e: any) {
		const files = [...e.target.files]
		const data = new FormData()
		for (const file of files) {
			data.append('files', file)
		}
		setLoading(true)
		const response = await axios.post('/api/upload', data)
		setImages([...images, ...response.data])
		setUnsavedImages([...unsavedImages, ...response.data])
		setLoading(false)
		if (id) {
			localStorage.setItem(id as string, JSON.stringify([...unsavedImages, ...response.data]))
		} else {
			localStorage.setItem('temp', JSON.stringify([...unsavedImages, ...response.data]))
		}
	}
	function deleteImage(url: string) {
		const regex = /\/([^/]+)$/
		const image = url.match(regex)![1]
		axios.delete(`/api/upload?delete=${image}`)
	}
	function deleteAllImages() {
		for (const image of images) {
			deleteImage(image.url)
		}
		if (id) {
			localStorage.removeItem(id!)
		}
		if (unsavedImages && unsavedImages.length > 0) {
			for (const image of unsavedImages) {
				deleteImage(image.url)
			}
		}
	}
	function editImageParams(e: any, image: Image) {
		const newImages = images.map((img: Image) => {
			if (img.url === image.url) {
				img.description = e.target.value
			}
			return img
		})
		setImages(newImages)
	}
	return (
		<form onSubmit={saveProduct}>
			<div className="mb-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-5 pt-6">
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="productName">
							Name
							<span className="text-red-500">&nbsp;*</span>
						</label>
						<input id="productName" className="form-input w-full" type="text" placeholder="Beautiful Pot" value={name} onChange={e => setName(e.target.value)} autoComplete="off" required />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="productPrice">
							Price
							<span className="text-red-500">&nbsp;*</span>
						</label>
						<input id="productPrice" className="form-input w-full" type="text" placeholder="1 000 CZK" value={price} onChange={e => setPrice(e.target.value)} autoComplete="off" required />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="productAuthor">
							Author
							<span className="text-red-500">&nbsp;*</span>
						</label>
						<input id="productAuthor" className="form-input w-full" type="text" placeholder="Jan Hus" value={author} onChange={e => setAuthor(e.target.value)} autoComplete="off" required />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1" htmlFor="productSize">
							Size
							<span className="text-red-500">&nbsp;*</span>
						</label>
						<input id="productSize" className="form-input w-full" type="text" placeholder="V: 20 cm Š: 30 cm" value={size} onChange={e => setSize(e.target.value)} autoComplete="off" required />
					</div>
				</div>
				<div className="px-5 pt-6">
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
				<div className="px-5 pt-6">
					<DropdownTag productTags={productTags} setProductTags={setProductTags} />
				</div>
				<div className="px-5 py-6">
					<h2 className="mb-4 font-semibold text-slate-800 dark:text-slate-100">Photos<span className="text-red-500">&nbsp;*</span>
					</h2>
					{images.length > 0 && (
						<div className="mb-4 flex flex-wrap gap-4">
							{images.map((image: Image, index: number) => (
								<div className="flex" key={index}>
									<div key={image.url}>
										<div className="relative flex flex-col gap-2 w-full">
											<div
												className="flex flex-col btn overflow-hidden p-0 w-56 h-56 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
											>
												{/(.jpg|.jpeg|.png|.JPG|.JPEG|.PNG)$/.test(image.url) && (
													<a
														href={image.url}
														target="_blank"
														className="w-full h-full"
													>
														<img src={image.url} alt="" className="w-full h-full object-cover hover:scale-110 transition-all duration-150" />
													</a>
												)}

											</div>

											<input type="text" className="form-input w-full" placeholder="Pretty pot" defaultValue={image.description} onChange={(e) => editImageParams(e, image)} />
											<button
												className="absolute top-2 right-2 p-2 bg-white border border-rose-500 text-rose-500 rounded-full"
												onClick={(e) => {
													e.preventDefault()
													setImages(images.filter((img: Image) => img.url !== image.url))
													setFlaggedImages([...flaggedImages, image])
												}}
											>
												<svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
													<path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
												</svg>
											</button>
										</div>
									</div>
								</div>
							))}
							{loading && (
								<div className="flex">
									<div>
										<div className="relative flex flex-col gap-2 w-full">
											<div
												className="flex flex-col btn overflow-hidden p-0 w-56 h-56 animate-pulse"
											>
												<div className="w-full h-full bg-slate-200 dark:bg-slate-900">&nbsp;</div>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					)}
					<div className="flex gap-6">
						<label className="flex flex-col btn w-24 h-24 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300 cursor-pointer">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
							</svg>
							<span>Upload</span>
							<input type="file" className="hidden" onChange={uploadImages} />
						</label>
					</div>
				</div>
			</div >
			<div className="flex gap-x-4">
				{id ? <ProductDelete id={id} deleteAllImages={deleteAllImages} /> : (<span className="mr-auto"></span>)}
				<Link
					className="btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
					href="/products"
				>
					Cancel
				</Link>
				<button
					className={`btn bg-indigo-500 hover:bg-indigo-600 text-white ${loading || !formValidated && 'opacity-50 cursor-not-allowed'}`}
					type="submit"
					disabled={loading || !formValidated}
				>
					{id ? 'Save' : 'Create'}
				</button>
			</div>
		</form >
	)
}
