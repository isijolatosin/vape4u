import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineExpand } from 'react-icons/ai'
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

	const salesPrice =
		Math.round(
			(product.price - product.price * (product.percent / 100)) * 100
		) / 100

	const handlePick = function () {
		setSingleproduct(product)
		scrollToTop()
		setIndex(0)
		setShowCaution(false)

		navigate(`/product/${product?.name}?q=${product?._id}`)
	}

	// adding to cart
	const { description, _id, name, image } = product
	const quantity = Number(qnty)
	const price =
		product.sales && product.percent > 0 ? salesPrice : product.price
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
		<div className="bg-neutral-50 w-full h-[300px] md:w-[230px] md:h-[300px] relative rounded-[7px] mt-5 shadow-2xl">
			{product.instock && (
				<div
					className={`${
						product.sales && product.percent > 0
							? 'top-[17px]'
							: 'top-[1px] rounded-tl-[7px]'
					} text-white font-light text-[11px] bg-yellow-500 absolute w-[30%] z-10 text-center`}>
					sold out
				</div>
			)}

			<div
				onClick={handlePick}
				className="h-[300px] relative hover:cursor-pointer">
				<img
					id={product._id}
					src={product?.image}
					alt={product.name}
					className="w-[100%] max-h-[80%] md:max-w-[100%] md:max-h-[200px] rounded-[7px] mx-auto object-contain  border-t-[1px] border-gray-100"
				/>
				<div className="absolute top-0 right-0 text-[10px] text-gray-500 p-3">
					<AiOutlineExpand className="text-lg" />
				</div>
			</div>
			<div className="bg-blur absolute bottom-0 w-full rounded-b-[20px] pt-2 uppercase text-center text-[11px] text-cyan-900 font-light flex flex-col leading-2 px-2">
				<span className="text-[10px]">{product.name.substring(0, 20)}...</span>
				<div className="flex flex-row justify-between items-center w-[100%] mx-auto">
					<span className="lowercase font-bold">Color: {product.color}</span>
					<div>
						{product.sales && product.percent && (
							<span className="font-bold mr-2">
								$
								{!Number.isInteger(salesPrice)
									? salesPrice
									: `${salesPrice}.00`}
							</span>
						)}
						<span
							className={`${
								product.sales && product.percent
									? 'line-through font-light'
									: 'font-bold'
							}`}>
							$
							{!Number.isInteger(product.price)
								? product.price
								: `${product.price}.00`}
						</span>
					</div>
				</div>
				<div className="mt-2">
					{showCaution && cardId === product?._id && (
						<span className="text-red-700 lowercase font-light">
							Hey! select your quantity
						</span>
					)}
					{!isInCart(singleProduct, cartItems) && (
						<div className="relative mt-2 bg-neutral-200 flex flex-row">
							<input
								type="number"
								name="number"
								id="number"
								value={qnty}
								onChange={handleQuantity}
								placeholder=""
								className="block w-full pl-3 py-[1px] text-gray-600 rounded-r-[7px] border border-neutral-200 text-[10px]  placeholder-gray-600 focus:outline-none focus:border-gray-200 focus:ring-0 focus:ring-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 outline-0"
							/>
							<label className="flex flex-row items-center capitalize px-2 rounded-[2px] text-neutral-500 font-light pt-[2px] text-[9px]">
								Quantity
							</label>
						</div>
					)}
				</div>
				<div className=" my-3 text-neutral-900 hover:cursor-pointer">
					{isInCart(singleProduct, cartItems) ? (
						<button
							disabled={product?.instock}
							onClick={cartItems.length !== 0 ? IncreaseItem : null}
							className="text-yellow-600 w-full text-center bg-neutral-100 py-2 hover:bg-neutral-200 ease duration-300 text-[10px] mr-1">
							Add More
						</button>
					) : (
						<button
							disabled={product?.instock}
							onClick={addToCart}
							className="py-2 w-full bg-neutral-200 text-center text-gray-500 hover:bg-neutral-300 hover:text-gray-50 ease duration-300text-[10px] mr-1">
							Add to cart
						</button>
					)}
				</div>
			</div>
			{product.sales && product.percent > 0 && (
				<div className="text-red-500 font-bold text-[12px] bg-black absolute w-[30%] text-center top-[1px] rounded-tl-[7px]">
					{product.percent}% off
				</div>
			)}
		</div>
	)
}

export default Card
