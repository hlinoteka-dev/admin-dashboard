'use client'

import ProductsTableItem from './products-table-item'

export interface Product {
	id: number
	name: string
	price: string
	author: string
	size: string
	top: boolean
	new: boolean
}

export default function ProductsTable({ products }: { products: Product[] }) {

	return (
		<div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
			<header className="px-5 py-4">
				<h2 className="font-semibold text-slate-800 dark:text-slate-100">Products <span className="text-slate-400 dark:text-slate-500 font-medium">67</span></h2>
			</header>
			<div>

				{/* Table */}
				<div className="overflow-x-auto">
					<table className="table-auto w-full dark:text-slate-300">
						{/* Table header */}
						<thead className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
							<tr>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Name</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Price</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Author</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Size</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Top</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">New</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Actions</div>
								</th>
							</tr>
						</thead>
						{/* Table body */}
						<tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
							{products.map(product => (
								<ProductsTableItem
									key={product.id}
									product={product} />
							))}
						</tbody>
					</table>

				</div>
			</div>
		</div>
	)
}