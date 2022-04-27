import React from 'react'
import { useDispatch } from 'react-redux'
import { MdAddShoppingCart } from 'react-icons/md'
import { BsCartDash } from 'react-icons/bs'
import { GiTrashCan } from 'react-icons/gi'
import { MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import {
	decreaseCartItem,
	increaseCartItem,
	removeCartItem,
} from '../slices/appSlices'

const CartItems = ({ product }) => {
	const { name, image, price, description, quantity, _id } = product
	const [expand, setExpand] = React.useState(false)
	const dispatch = useDispatch()

	const prdct = { name, _id, image, price, quantity, description }
	const increaseItem = () => {
		dispatch(increaseCartItem(prdct))
	}
	const decreaseItem = () => {
		dispatch(decreaseCartItem(prdct))
	}
	const removeItem = () => {
		dispatch(removeCartItem(prdct))
	}

	return (
		<div className="flex flex-row p-5 w-full bg-gray-50 mb-2  shadow-lg">
			<div className="mr-5">
				<img
					className="w-[80px] h-[80px] rounded-lg object-contain"
					src={image}
					alt={name}
				/>
			</div>
			<div className="flex flex-row justify-between items-center w-[100%] pr-5">
				<div className="text-neutral-600 font-light text-xs">
					<div className="font-bold">
						<h4>{name}</h4>
					</div>
					<p>{`Price: $${price}`}</p>
					<p>{`Quantity: ${quantity}`}</p>
					<div>
						{!expand && description?.length >= 100 ? (
							<span>description: {description.substring(0, 50)}...</span>
						) : (
							<span>Description: {description}</span>
						)}
						{description?.length >= 100 && (
							<span
								onClick={() => setExpand(!expand)}
								className="cursor-pointer">
								{expand ? (
									<div className="flex flex-row text-xs font-bold">
										<span>Read Less</span> <MdOutlineKeyboardArrowUp />
									</div>
								) : (
									<div className="flex flex-row text-xs font-bold">
										<span>Read More</span> <MdOutlineKeyboardArrowDown />
									</div>
								)}
							</span>
						)}
					</div>
				</div>
				<div className="flex flex-col justify-between h-[70%]">
					<div
						className="text-2xl text-neutral-300 hover:cursor-pointer hover:text-neutral-900 ease-in duration-300"
						onClick={increaseItem}>
						<MdAddShoppingCart />
						{/* <span>Add</span> */}
					</div>
					{quantity === 1 && (
						<div
							className="text-2xl text-neutral-300 hover:cursor-pointer hover:text-neutral-900 ease-in duration-300"
							onClick={removeItem}>
							<GiTrashCan />
							{/* <span>Delete</span> */}
						</div>
					)}
					{quantity > 1 && (
						<div
							className="text-2xl text-neutral-300 hover:cursor-pointer hover:text-neutral-900 ease-in duration-300"
							onClick={decreaseItem}>
							<BsCartDash />
							{/* <span>Remove</span> */}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default CartItems
