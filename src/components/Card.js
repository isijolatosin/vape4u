import React from 'react'
import { HiViewGrid } from 'react-icons/hi'
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
		<div className="bg-neutral-50 w-full h-full md:w-[230px] md:h-[270px] relative rounded-[20px] mt-5 shadow-2xl">
			<div className="absolute m-3 top-0 left-0 rounded-full p-1 text-neutral-600 shadow-md hover:cursor-pointer">
				<HiViewGrid onClick={handlePick} size={16} />
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
				className="w-[100%] max-h-[100%] md:max-w-[100%] md:max-h-[200px] mt-10 mx-auto object-cover"
			/>
			<div className="bg-blur absolute bottom-0 w-full h-[70px] rounded-b-[20px] py-2 uppercase text-center text-[11px] text-cyan-900 font-light flex flex-col leading-2 px-3">
				<span>{product.name}</span>
				<span>
					$
					{!Number.isInteger(product.price)
						? product.price
						: `${product.price}.00`}
				</span>
			</div>
		</div>
	)
}

export default Card
