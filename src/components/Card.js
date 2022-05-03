import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { HiShoppingBag } from 'react-icons/hi'
import { GiExpand } from 'react-icons/gi'
import {
	addToCartItem,
	increaseCartItem,
	selectCartItems,
} from '../slices/appSlices'
import { useDispatch, useSelector } from 'react-redux'
import { isInCart } from '../utils/helpers'

function Card({
	product,
	setSingleproduct,
	scrollToTop,
	setIndex,
	setShowCaution,
	showCaution,
}) {
	const cartItems = useSelector(selectCartItems)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [qnty, setQnty] = React.useState('')
	const [cardId, setCardId] = React.useState('')

	const handlePick = function () {
		setSingleproduct(product)
		scrollToTop()
		setIndex(0)
		setShowCaution(false)

		navigate(`/product/${product?.name}?q=${product?._id}`)
	}

	// adding to cart
	const { description, _id, name, price, image } = product
	const quantity = Number(qnty)
	const singleProduct = { description, _id, name, price, image, quantity }

	const addToCart = () => {
		setCardId(product?._id)
		if (quantity < 1 || quantity === 0) {
			setShowCaution(true)
		}
		setQnty(0)
		quantity > 0 && dispatch(addToCartItem(singleProduct))
	}

	const IncreaseItem = () => {
		setQnty(0)
		dispatch(increaseCartItem(singleProduct))
	}

	const handleQuantity = (e) => {
		setShowCaution(false)
		setQnty(e.target.value)
	}

	return (
		<div className="bg-neutral-50 w-full h-[300px] md:w-[230px] md:h-[270px] relative rounded-[7px] mt-5 shadow-2xl">
			{product.instock && (
				<div className="text-white font-light text-[11px] bg-yellow-500 absolute w-[33%] text-center top-[24px]">
					sold out
				</div>
			)}
			<div className="absolute m-3 top-0 right-0 text-neutral-900 hover:cursor-pointer">
				{isInCart(singleProduct, cartItems) ? (
					<div className="flex flex-row items-center">
						<span className="text-[10px] mr-1 text-yellow-600">Add More</span>
						<HiShoppingBag
							className="shadow-md border-[1px] border-yellow-400 text-yellow-500 rounded-full p-1"
							onClick={cartItems.length !== 0 ? IncreaseItem : null}
							size={23}
						/>
					</div>
				) : (
					<div className="flex flex-row items-center">
						<span className="text-[10px] mr-1 text-gray-500">Add to cart</span>
						<HiOutlineShoppingBag
							className="shadow-md p-1 text-gray-500 rounded-full"
							onClick={addToCart}
							size={23}
						/>
					</div>
				)}
			</div>

			<div
				onClick={handlePick}
				className="h-[300px] relative hover:cursor-pointer">
				<img
					id={product._id}
					src={product?.image}
					alt={product.name}
					className="w-[100%] max-h-[80%] md:max-w-[100%] md:max-h-[200px] mt-10 mx-auto object-contain  border-t-[1px] border-gray-100"
				/>
				<div
					className={`flex flex-row items-center justify-between w-[55%] bg-yellow-100 text-[10px] text-gray-500 absolute ${
						product.sales ? 'top-[17px]' : 'top-0'
					} left-0 py-1 px-2`}>
					<span>Product Details</span>
					<GiExpand />
				</div>
			</div>
			<div className="bg-blur absolute bottom-0 w-full h-[80px] rounded-b-[20px] pt-2 uppercase text-center text-[11px] text-cyan-900 font-light flex flex-col leading-2 px-2">
				<span className="text-[10px]">{product.name.substring(0, 20)}...</span>
				<div className="flex flex-row justify-between items-center w-[100%] mx-auto">
					<span className="lowercase font-bold">Color: {product.color}</span>
					<span className="font-bold">
						$
						{!Number.isInteger(product.price)
							? product.price
							: `${product.price}.00`}
					</span>
				</div>
				<div className="mt-2">
					{showCaution && cardId === product?._id && (
						<span className="text-red-700 lowercase font-light">
							Hey! select your quantity
						</span>
					)}
					{!isInCart(singleProduct, cartItems) && (
						<div className="relative mt-2">
							<label className="absolute capitalize -top-2 right-10 bg-yellow-100 border border-yellow-300 px-2 rounded-[2px] text-yellow-600 font-light pt-[2px] text-[9px]">
								Quantity
							</label>
							<input
								type="number"
								name="number"
								id="number"
								value={qnty}
								onChange={handleQuantity}
								placeholder=""
								className="block w-full px-3 py-[1px] bg-yellow-100 text-yellow-600 rounded-[7px] border border-yellow-300 text-[10px]  placeholder-yellow-600 focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 outline-0"
							/>
						</div>
					)}
				</div>
			</div>
			{product.sales && (
				<div className="text-white font-light text-[11px] bg-black absolute w-[30%] text-center top-[40px]">
					sales
				</div>
			)}
		</div>
	)
}

export default Card
