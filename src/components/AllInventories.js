import React from 'react'
import axios from 'axios'
import Heading from './Heading'
import InventoryCard from './InventoryCard'
import Button from './shared/Button'

function AllInventories() {
	const [fetchAllData, setFetchAllData] = React.useState([])
	const [singleProduct, setSingleProduct] = React.useState()
	const [postError, setPostError] = React.useState('')
	const [isTrueSales, setIsTrueSales] = React.useState(false)
	const [isTrueInstock, setIsTrueInstock] = React.useState(false)
	// const [imageFile, setImageFile] = React.useState('')

	const toggleSales = () => {
		setIsTrueSales(!isTrueSales)
	}
	const toggleInstock = () => {
		setIsTrueInstock(!isTrueInstock)
	}

	async function fetchProducts() {
		try {
			const {
				data: { products },
			} = await axios.get('/api/v1/products')
			setFetchAllData(products.sort((a, b) => a.type.localeCompare(b.type)))
		} catch (error) {
			console.log(error)
		}
	}

	React.useEffect(() => {
		fetchProducts()
	}, [])

	const handleInputName = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: e.target.value,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		})
	}
	const handleInputType = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			type: e.target.value,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		})
	}
	const handleInputColor = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			type: singleProduct.type,
			color: e.target.value,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		})
	}
	const handleInputLen = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: e.target.value,
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		})
	}
	const handleInputPrice = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price: e.target.value,
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		})
	}
	const handleInputDesc = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			sales: singleProduct.sales,
			description: e.target.value,
		})
	}

	async function updateSingleProduct(e) {
		e.preventDefault()
		const id = singleProduct?.id
		try {
			const product = {
				name: singleProduct.name,
				type: singleProduct.type,
				color: singleProduct.color,
				availablecolor: singleProduct.availablecolor,
				price: singleProduct.price,
				length: singleProduct.length,
				availablelength: singleProduct.availablelength,
				description: singleProduct.description,
				sales: isTrueSales,
				instock: isTrueInstock,
				// image: imageFile,
			}
			await axios.patch(`/api/v1/products/${id}`, product)
			setPostError('')
		} catch (error) {
			setPostError(error.message)
			console.log(error)
		}

		setSingleProduct()

		fetchProducts()
	}

	return (
		<div>
			{!singleProduct ? (
				<div className="flex flex-col items-center w-[100%] xl:w-[90%] 2xl:w-[85%] mx-auto mt-5">
					<Heading>All Inventories</Heading>
					<div className="grid grid-cols-1 w-full md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 p-5 lg:p-10">
						{fetchAllData.map((product) => (
							<InventoryCard
								key={product._id}
								product={product}
								fetchProducts={fetchProducts}
								setSingleProduct={setSingleProduct}
							/>
						))}
					</div>
				</div>
			) : (
				<div className="w-[100%]">
					<span className=" text-xl text-neutral-800 flex flex-col items-center mt-10">
						Edit Product
					</span>
					<span className="text-neutral-500 text-xs flex flex-col items-center mb-5 mt-2">{`ProductID: ${singleProduct.id}`}</span>
					<span className="flex flex-col items-center mb-5 mt-2 capitalize text-xs text-red-800">
						Please ensure to edit all field for better performance
					</span>
					<form onSubmit={updateSingleProduct}>
						<div className="flex flex-col items-center">
							<input
								type="text"
								name="title"
								id="title"
								value={singleProduct.name}
								onChange={handleInputName}
								placeholder="Product Name..."
								className="mt-1 block lg:w-[50%] mx-auto w-[90%] px-3 py-2 border-none text-sm shadow-xl placeholder-gray-400 focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-200 isabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 outline-0 mb-5 placeholder:font-light placeholder:text-xs text-gray-700 font-light"
							/>
							<input
								type="text"
								name="type"
								id="type"
								value={singleProduct.type}
								onChange={handleInputType}
								placeholder="Product Type..."
								className="mt-1 block lg:w-[50%] mx-auto w-[90%] px-3 py-2 border-none text-sm shadow-xl placeholder-gray-400 focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-200 isabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 outline-0 mb-5 placeholder:font-light placeholder:text-xs text-gray-700 font-light"
							/>
							<input
								type="text"
								name="color"
								id="color"
								value={singleProduct.color}
								onChange={handleInputColor}
								placeholder="Product Color..."
								className="mt-1 block lg:w-[50%] mx-auto w-[90%] px-3 py-2 border-none text-sm shadow-xl placeholder-gray-400 focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-200 isabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 outline-0 mb-5 placeholder:font-light placeholder:text-xs text-gray-700 font-light"
							/>
							<input
								type="number"
								name="length"
								id="length"
								value={singleProduct.length}
								onChange={handleInputLen}
								placeholder="Length..."
								className="rounded mt-1 block lg:w-[50%] mx-auto w-[90%] px-3 py-2 border-none text-sm shadow-xl placeholder-gray-400 focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-200 isabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 outline-0 mb-5 placeholder:font-light placeholder:text-xs text-gray-700 font-light"
							/>
							<input
								type="number"
								name="price"
								id="price"
								value={singleProduct.price}
								onChange={handleInputPrice}
								placeholder="Price..."
								className="rounded mt-1 block lg:w-[50%] mx-auto w-[90%] px-3 py-2 border-none text-sm shadow-xl placeholder-gray-400 focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-200 isabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 outline-0 mb-5 placeholder:font-light placeholder:text-xs text-gray-700 font-light"
							/>
							<textarea
								value={singleProduct.description}
								name="description"
								onChange={handleInputDesc}
								rows={5}
								cols={50}
								placeholder="Description..."
								className="rounded mt-1 block lg:w-[50%] mx-auto w-[90%] px-3 py-2 border-none text-sm shadow-xl placeholder-gray-400 focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-200 isabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 outline-0 mb-5 placeholder:font-light placeholder:text-xs text-gray-700 font-light"
							/>
							{/* <div className="text-red-800 text-sm mb-2 ">
								<span>
									Rename Image and substitute space with a dash ( e.g abc-def )
								</span>
							</div> */}
							{/* <div className="rounded flex flex-row items-center shadow-xl pl-3 pb-1">
								<label className="mr-3 text-gray-500 text-sm">Image</label>
								<input
									onChange={uploadFile}
									type="file"
									className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:bg-gray-200 file:text-violet-700 hover:file:bg-violet-100 ease-in duration-300"
								/>
							</div> */}
							<div className="flex">
								<div className="rounded flex flex-row items-center mt-5 mr-10 shadow-xl p-2">
									<label className="mr-3 text-gray-500 text-sm">Sales</label>
									<input
										type="checkbox"
										checked={isTrueSales}
										className={
											isTrueSales
												? 'ml-2 rounded-full bg-violet-400'
												: 'ml-2 rounded-full bg-none border-violet-200'
										}
										onChange={toggleSales}
									/>
								</div>
								<div className="rounded flex flex-row items-center mt-5 shadow-xl p-2">
									<label className="mr-3 text-gray-500 text-sm">In stock</label>
									<input
										type="checkbox"
										checked={isTrueInstock}
										className={
											isTrueInstock
												? 'ml-2 rounded-full bg-violet-400'
												: 'ml-2 rounded-full bg-none border-violet-200'
										}
										onChange={toggleInstock}
									/>
								</div>
							</div>
							{postError && (
								<span className="text-xs text-red-700 mt-5">{`Error: ${postError}`}</span>
							)}
							<div className="my-10">
								<Button type="submit">Update Inventory</Button>
							</div>
						</div>
					</form>
				</div>
			)}
		</div>
	)
}
export default AllInventories
