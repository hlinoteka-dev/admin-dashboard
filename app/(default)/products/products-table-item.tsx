import Link from 'next/link'
import Props from '@/components/props'
import { Product } from './products-table'
import ProductsTableItemDelete from './products-table-item-delete'

interface ProductsTableItemProps {
	product: Product
}

export default function ProductsTableItem({ product }: ProductsTableItemProps) {

	return (
		<tr>
			<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
				<Link className="font-medium text-sky-500 underline hover:no-underline" href={`/products/edit/${product._id}`}>{product.name}</Link>
			</td>
			<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
				<div className="font-medium">{product.price}</div>
			</td>
			<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
				<div className="font-medium">{product.author}</div>
			</td>
			<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
				<div className="font-medium">{product.size}</div>
			</td>
			<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
				<div className="flex gap-x-2">
					<Props active={product.topProduct} switchType="top" />
					<Props active={product.newProduct} switchType="new" />
				</div>
			</td>
			<td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
				<Link className="inline-flex text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full" href={`/products/edit/${product._id}`}>
					<span className="sr-only">Edit</span>
					<svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
						<path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
					</svg>
				</Link>
			</td>
		</tr>
	)
}