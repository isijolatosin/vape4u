import React from 'react'
import { HiViewGrid } from 'react-icons/hi'
import { BsBagFill } from 'react-icons/bs'
import { BsBagPlusFill } from 'react-icons/bs'
import {
	addToCartItem,
	increaseCartItem,
	selectCartItems,
} from '../slices/appSlices'
import { useDispatch, useSelector } from 'react-redux'
import { isInCart } from '../utils/helpers'

function Card({ pen, setSinglePen, scrollToTop }) {
	const cartItems = useSelector(selectCartItems)
	const dispatch = useDispatch()

	const handlePick = function () {
		setSinglePen(pen)
		scrollToTop()
	}

	// adding to cart
	const { desc, id, name, price, url } = pen
	const singlePen = { desc, id, name, price, url }

	const addToCart = () => {
		dispatch(addToCartItem(singlePen))
	}

	const IncreaseItem = () => {
		dispatch(increaseCartItem(singlePen))
	}

	return (
		<div className="bg-neutral-50 w-full h-full md:w-[230px] md:h-[270px] relative rounded-[20px] mt-5 shadow-2xl">
			<div className="absolute m-3 top-0 left-0 rounded-full p-1 text-neutral-600 shadow-md hover:cursor-pointer">
				<HiViewGrid onClick={handlePick} size={16} />
			</div>
			<div className="absolute m-3 top-0 right-0 text-neutral-900 hover:cursor-pointer">
				{isInCart(singlePen, cartItems) ? (
					<div className="shadow-md border-[1px] border-yellow-400 text-yellow-500 rounded-full p-1">
						<BsBagPlusFill onClick={IncreaseItem} size={16} />
					</div>
				) : (
					<div className="shadow-md p-1 rounded-full">
						<BsBagFill onClick={addToCart} size={16} />
					</div>
				)}
			</div>
			<img
				id={pen.id}
				src={pen.url}
				alt={pen.name}
				className="max-w-[90%] max-h-[260px] md:max-w-[90%] md:max-h-[200px] mt-10 mx-auto object-contain"
			/>
			<div className="bg-blur absolute bottom-0 w-full h-[100px] rounded-b-[20px] py-2 text-center text-xs text-blue-800 font-bold flex flex-col leading-2 px-3">
				<span>{pen.name}</span>
				<span>${pen.price}:00</span>
			</div>
		</div>
	)
}

export default Card
