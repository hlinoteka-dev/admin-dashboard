export const metadata = {
	title: 'Edit Product - Hlinoteka'
}

import Banner from '@/components/banner'
import ProductForm from '@/components/products/product-form'

function EditProduct({ params }: { params: { id: string } }) {
	const { id } = params

	return (
		<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
			{/* Page header */}
			<div className="sm:flex sm:justify-between sm:items-center mb-5">

				{/* Left: Title */}
				<div className="mb-4 sm:mb-0">
					<h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Edit Product</h1>
				</div>

			</div>

			<Banner className="mb-4">
				If you wish to delete this product, I suggest you to delete the photos first and then delete the product. This way you will not have any orphaned photos in the database.
			</Banner>

			<ProductForm id={id} />
		</div>
	)
}

export default EditProduct