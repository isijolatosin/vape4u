import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import {
	addToCartItem,
	increaseCartItem,
	selectCartItems,
} from '../slices/appSlices'
import Button from './shared/Button'
import { isInCart } from '../utils/helpers'

const PenDetails = function ({ singlePen }) {
	const MAX_RATING = 5
	const MIN_RATING = 1
	const cartItems = useSelector(selectCartItems)
	const dispatch = useDispatch()
	const [rating] = React.useState(
		Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING)
	)
	const deci = Number(Math.random().toFixed(1))

	// adding to cart
	const { desc, id, name, price, url } = singlePen
	const Pen = { desc, id, name, price, url }

	const addToCart = () => {
		dispatch(addToCartItem(Pen))
	}

	const IncreaseItem = () => {
		dispatch(increaseCartItem(Pen))
	}

	return (
		<div className="flex flex-col w-[90%] mx-auto md:w-full py-10 md:py-0 md:flex-row items-center justify-center bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100 rounded-[30px] px-10 ">
			<div className="flex-[0.3]">
				<p className="text-2xl font-bold text-blue-800 leading-6 mb-2">
					{singlePen.name}
				</p>
				<p className="text-xs leading-4  text-neutral-500">
					{singlePen.description}
				</p>
			</div>
			<div className="flex-[0.35] relative m-10 w-[100%] md:max-w-[230px] bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 object-cover rounded-lg">
				<img
					id={singlePen.id}
					src={singlePen.image}
					alt={singlePen.id}
					className="object-cover h-[380px] w-[100%] rounded-lg object-bottom shadow-2xl"
				/>
				<span className="absolute bottom-8 right-[38.2%] text-xs font-bold text-blue-800 px-2 py-[1px] rounded-md bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500">
					${singlePen.price}:00
				</span>
			</div>
			<div className="flex-[0.3] text-xs flex flex-col font-bold">
				<div className="flex">
					<span>Review: </span>
					{Array(rating)
						.fill()
						.map((_, i) => (
							<AiFillStar key={i} />
						))}
					<span>{rating + deci} rating</span>
				</div>
				{isInCart(singlePen, cartItems) ? (
					<Button handleFunc={IncreaseItem}>Add More</Button>
				) : (
					<Button handleFunc={addToCart}>Add to cart</Button>
				)}
			</div>
		</div>
	)
}

export default PenDetails
