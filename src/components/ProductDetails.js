import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
// import { CgClose } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import {
	addToCartItem,
	increaseCartItem,
	selectCartItems,
} from '../slices/appSlices'
import Button from './shared/Button'
import { isInCart } from '../utils/helpers'

const ProductDetails = function ({
	singleProduct,
	setSingleProduct,
	index,
	setIndex,
}) {
	const images = []
	if (singleProduct?.image) {
		images.push(singleProduct?.image)
	}
	if (singleProduct?.image2) {
		images.push(singleProduct?.image2)
	}
	if (singleProduct?.image3) {
		images.push(singleProduct?.image3)
	}
	if (singleProduct?.image4) {
		images.push(singleProduct?.image4)
	}
	if (singleProduct?.image5) {
		images.push(singleProduct?.image5)
	}
	if (singleProduct?.image6) {
		images.push(singleProduct?.image6)
	}
	if (singleProduct?.image7) {
		images.push(singleProduct?.image7)
	}
	if (singleProduct?.image8) {
		images.push(singleProduct?.image8)
	}
	if (singleProduct?.image9) {
		images.push(singleProduct?.image9)
	}
	if (singleProduct?.image10) {
		images.push(singleProduct?.image10)
	}
	if (singleProduct?.image11) {
		images.push(singleProduct?.image11)
	}
	if (singleProduct?.image12) {
		images.push(singleProduct?.image12)
	}
	const MAX_RATING = 5
	const MIN_RATING = 1
	const cartItems = useSelector(selectCartItems)
	const dispatch = useDispatch()
	const [rating] = React.useState(
		Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING)
	)
	const deci = Number(Math.random().toFixed(1))

	// adding to cart
	const { description, _id, name, price, image } = singleProduct
	const Pen = { description, _id, name, price, image }

	const addToCart = () => {
		dispatch(addToCartItem(Pen))
	}

	const IncreaseItem = () => {
		dispatch(increaseCartItem(Pen))
	}
	const increaseIndex = () => {
		if (index >= 0 && index !== images?.length - 1) {
			setIndex(index + 1)
		}
	}
	const decreaseIndex = () => {
		if (index !== 0) {
			setIndex(index - 1)
		}
	}

	return (
		<div className="relative flex flex-col w-[100%] mx-auto md:w-full p-2 py-10 mt-5 md:mt-0 md:py-0 md:flex-row items-center justify-center bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100 rounded-[30px] ">
			<div className="flex-[0.4] border-b-[1px] pb-5">
				<p className="text-xl font-bold text-blue-800 leading-6 mb-2">
					{singleProduct.name}
				</p>
				<p className="text-xs leading-4 uppercase text-neutral-500">
					{singleProduct.description}
				</p>
				<div className="text-xs mt-3 flex justify-between mx-1 font-bold">
					<span>Length: {singleProduct.length}"</span>
					<span>Color: {singleProduct.color}</span>
				</div>
			</div>
			<div className="relative flex-[0.4] m-10 w-[100%] md:max-w-[230px] bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 object-cover rounded-lg">
				<img
					id={singleProduct.id}
					src={images[index]}
					alt={singleProduct.id}
					className="object-contain h-[100%] w-[100%] rounded-lg object-bottom shadow-2xl"
				/>
				{images?.length > 1 && (
					<MdOutlineKeyboardArrowLeft
						onClick={decreaseIndex}
						size={25}
						className="absolute top-[45%] text-gray-400 hover:cursor-pointer left-0"
					/>
				)}
				{images?.length > 1 && (
					<MdOutlineKeyboardArrowRight
						onClick={increaseIndex}
						size={25}
						className="absolute top-[45%] text-gray-400 hover:cursor-pointer right-0"
					/>
				)}
				<span className="absolute bottom-8 right-[38.2%] text-xs font-bold text-blue-800 px-2 py-[1px] rounded-md bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500">
					$
					{!Number.isInteger(singleProduct.price)
						? singleProduct.price
						: `${singleProduct.price}.00`}
				</span>
			</div>
			<div>
				<div className="flex-[0.2] text-xs flex flex-col font-bold">
					<div className="flex">
						<span>Review: </span>
						{Array(rating)
							.fill()
							.map((_, i) => (
								<AiFillStar key={i} />
							))}
						<span>{rating + deci} rating</span>
					</div>
					{isInCart(singleProduct, cartItems) ? (
						<Button handleFunc={IncreaseItem}>Add More</Button>
					) : (
						<Button handleFunc={addToCart}>Add to cart</Button>
					)}
				</div>
				<div className="mt-5 text-sm text-gray-400 hover:text-gray-600 hover:cursor-pointer text-center ease-in duration-300">
					<span onClick={() => setSingleProduct([])}>Close</span>
				</div>
			</div>
		</div>
	)
}

export default ProductDetails
