import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { AiFillCloseCircle } from 'react-icons/ai'
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
import { useNavigate } from 'react-router-dom'

const ProductDetails = function ({
	singleProduct,
	setSingleProduct,
	index,
	setIndex,
	showCaution,
	setShowCaution,
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
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [rating] = React.useState(
		Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING)
	)
	const deci = Number(Math.random().toFixed(1))
	const [qnty, setQnty] = React.useState('')

	const handleQuantity = (e) => {
		setShowCaution(false)
		setQnty(e.target.value)
	}

	// adding to cart
	const { description, _id, name, price, image } = singleProduct
	const quantity = Number(qnty)
	const Pen = { description, _id, name, price, image, quantity }

	const addToCart = () => {
		if (quantity < 1 || quantity === 0) {
			setShowCaution(true)
		}
		setQnty(0)
		quantity > 0 && dispatch(addToCartItem(Pen))
	}

	const IncreaseItem = () => {
		setQnty(0)
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
			<div className="relative flex-[0.4] m-10 w-[100%] h-[480px] md:max-w-[300px] bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 object-cover rounded-lg">
				<div className="max-h-[50%]">
					<img
						id={singleProduct.id}
						src={images[index]}
						alt={singleProduct.id}
						className="object-contain h-[480px] w-[100%] rounded-lg object-bottom shadow-2xl"
					/>
				</div>
				<div className="text-[10px] text-blue-900 font-semibold absolute top-0 rounded-t-lg py-2 text-center bg-blur px-3 w-full">
					{index + 1} of {images.length} photos of{' '}
					{singleProduct.name.toLowerCase()}
				</div>
				{images?.length > 1 && (
					<MdOutlineKeyboardArrowLeft
						onClick={decreaseIndex}
						size={25}
						className="absolute bg-yellow-100 top-[45%] text-yellow-600 rounded-r-sm hover:cursor-pointer left-0"
					/>
				)}
				{images?.length > 1 && (
					<MdOutlineKeyboardArrowRight
						onClick={increaseIndex}
						size={25}
						className="absolute bg-yellow-100 top-[45%] text-yellow-600 rounded-l-sm hover:cursor-pointer right-0"
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
					{!isInCart(singleProduct, cartItems) && (
						<div className="relative mt-2">
							<label className="absolute top-1 left-3 bg-yellow-100 px-2 rounded-[2px] text-blue-800 font-semibold text-[10px]">
								Quantity
							</label>
							<input
								type="number"
								name="number"
								id="number"
								value={qnty}
								onChange={handleQuantity}
								placeholder=""
								className="mt-3 block w-full px-3 py-1 bg-yellow-100 text-yellow-600 rounded-[3px] border border-yellow-300 text-[10px] placeholder-yellow-600 focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 outline-0"
							/>
						</div>
					)}
					{showCaution && !isInCart(singleProduct, cartItems) && (
						<span className="text-red-700 text-[11px] font-light mt-3 mb-[-7px]">
							Hey! select your quantity
						</span>
					)}
					<div className="flex flex-row justify-between w-[80%">
						{isInCart(singleProduct, cartItems) ? (
							<Button handleFunc={IncreaseItem}>Add More (+1)</Button>
						) : (
							<Button handleFunc={addToCart}>Add to cart</Button>
						)}
						<div className="border-l-2 border-gray-900  pl-5 ml-5 mt-5 text-3xl text-gray-900 hover:text-gray-600 hover:cursor-pointer text-left font-light ease-in duration-300">
							<span
								onClick={() => {
									setSingleProduct([])
									navigate(`/`)
								}}>
								<AiFillCloseCircle />
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductDetails
