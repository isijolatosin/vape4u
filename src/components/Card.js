import React from 'react'
import { GiExpand } from 'react-icons/gi'
import { BsBag } from 'react-icons/bs'
import { BsBagPlusFill } from 'react-icons/bs'
import {
	addToCartItem,
	increaseCartItem,
	selectCartItems,
} from '../slices/appSlices'
import { useDispatch, useSelector } from 'react-redux'
import { isInCart } from '../utils/helpers'

function Card({ product, setSingleproduct, scrollToTop }) {
	const cartItems = useSelector(selectCartItems)
	const dispatch = useDispatch()

	const handlePick = function () {
		setSingleproduct(product)
		scrollToTop()
	}

	// adding to cart
	const { description, _id, name, price, image } = product
	const singleProduct = { description, _id, name, price, image }

	const addToCart = () => {
		dispatch(addToCartItem(singleProduct))
	}

	const IncreaseItem = () => {
		dispatch(increaseCartItem(singleProduct))
	}

	return (
		<div className="bg-neutral-50 w-full h-[300px] md:w-[230px] md:h-[270px] relative rounded-[7px] mt-5 shadow-2xl">
			{product.instock && (
				<div className="text-white font-light text-sm bg-yellow-500 absolute w-[38%] text-center top-[18px]">
					sold out
				</div>
			)}
			<div
				className={`absolute m-3 top-0 ${
					product.instock ? 'left-14' : 'left-0'
				} rounded-full p-1 text-neutral-600 shadow-md hover:cursor-pointer`}>
				<GiExpand onClick={handlePick} size={16} />
			</div>
			<div className="absolute m-3 top-0 right-0 text-neutral-900 hover:cursor-pointer">
				{isInCart(singleProduct, cartItems) ? (
					<div className="shadow-md border-[1px] border-yellow-400 text-yellow-500 rounded-full p-1">
						<BsBagPlusFill
							onClick={cartItems.length !== 0 ? IncreaseItem : null}
							size={16}
						/>
					</div>
				) : (
					<div className="shadow-md p-1 rounded-full">
						<BsBag onClick={addToCart} size={16} />
					</div>
				)}
			</div>

			<img
				id={product._id}
				src={product?.image}
				alt={product.name}
				className="w-[100%] max-h-[80%] md:max-w-[100%] md:max-h-[200px] mt-10 mx-auto object-contain  border-t-[1px] border-gray-100"
			/>
			<div className="bg-blur absolute bottom-0 w-full h-[70px] rounded-b-[20px] pt-2 uppercase text-center text-[11px] text-cyan-900 font-light flex flex-col leading-2 px-3">
				<span>{product.name}</span>
				<div className="flex flex-row justify-between items-center w-[90%] mx-auto">
					<span className="lowercase font-bold">Color: {product.color}</span>
					<span className="font-bold">
						$
						{!Number.isInteger(product.price)
							? product.price
							: `${product.price}.00`}
					</span>
				</div>
			</div>
			{product.sales && (
				<div className="text-white font-light text-sm bg-black absolute w-[30%] text-center top-[40px]">
					sales
				</div>
			)}
		</div>
	)
}

export default Card
