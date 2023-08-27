export const metadata = {
	title: 'New Product - Hlinoteka'
}

import ProductForm from '@/components/product-form'

function NewProduct() {
	return (
		<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
			{/* Page header */}
			<div className="sm:flex sm:justify-between sm:items-center mb-5">

				{/* Left: Title */}
				<div className="mb-4 sm:mb-0">
					<h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">New Product</h1>
				</div>

			</div>

			<ProductForm />

		</div>
	)
}

export default NewProduct