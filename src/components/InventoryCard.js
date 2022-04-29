import React from 'react'
import axios from 'axios'
import { MdDeleteOutline } from 'react-icons/md'
import { MdOutlineEditNote } from 'react-icons/md'

function InventoryCard({ product, fetchProducts, setSingleProduct }) {
	async function deleteSingleProduct() {
		const id = product._id
		try {
			await axios.delete(`/api/v1/products/${id}`)
		} catch (error) {
			console.log(error)
		}

		fetchProducts()
	}

	async function getSingleProduct() {
		const id = product._id
		try {
			const {
				data: { product },
			} = await axios.get(`/api/v1/products/${id}`)

			setSingleProduct({
				id: product._id,
				name: product.name,
				price: product.price,
				description: product.description,
				sales: product.sales,
				type: product.type,
				color: product.color,
				availablecolor: product.availablecolor,
				length: product.length,
				availablelength: product.availablelength,
			})

			// console.log(product)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="flex flex-row bg-neutral-100 p-3">
			<div className="mr-1 w-[20%]">
				<img
					alt=""
					loading="lazy"
					src={product.image}
					className="w-[100px] h-[100px] object-cover rounded mr-5"
				/>
			</div>
			<div className="flex flex-row w-[80%]">
				<div className="flex flex-col mr-5 text-xs font-light w-[85%]">
					<span className="w-[100%]">{`Name: ${product.name}`}</span>
					<span className="w-[100%]">{`Color: ${product.color}`}</span>
					<span className="w-[100%]">{`Price: $${product.price}`}</span>
					<span className="w-[100%]">{`Length: ${product.length}"`}</span>
					<span className="w-[100%]">{`Description: ${product.description}`}</span>
					<span className="text-red-800">{product.instock && 'Sold Out'}</span>
					<span className="text-red-800">{product.sales && 'onsale'}</span>
				</div>
				<div className="flex flex-col justify-between w-[15%] border-l border-neutral-300 pl-[10px] lg:pl-2 xl:pl-[2px]">
					<MdDeleteOutline
						onClick={deleteSingleProduct}
						size={30}
						className="p-[4px] text-neutral-800 hover:text-neutral-300 hover:cursor-pointer hover:border-red-800 hover:border hover:rounded-full ease-in duration-300 mb-3"
					/>
					<MdOutlineEditNote
						onClick={getSingleProduct}
						size={30}
						className="p-[4px] text-neutral-800 hover:text-neutral-300 hover:cursor-pointer hover:border-neutral-800 hover:border hover:rounded-full ease-in duration-300"
					/>
				</div>
			</div>
		</div>
	)
}

export default InventoryCard
