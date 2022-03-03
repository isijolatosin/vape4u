import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import Button from './shared/Button'

const PenDetails = function ({ singlePen }) {
	const MAX_RATING = 5
	const MIN_RATING = 1
	const [rating] = React.useState(
		Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING)
	)
	const deci = Number(Math.random().toFixed(1))

	return (
		<div className="flex items-center justify-center bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100 rounded-[30px] px-10">
			<div className="flex-[0.3]">
				<p className="text-2xl font-bold text-blue-800 leading-6 mb-2">
					{singlePen.name}
				</p>
				<p className="text-xs leading-4  text-neutral-500">{singlePen.desc}</p>
			</div>
			<div className="flex-[0.35] relative m-10 w-[100px] bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 object-cover rounded-full">
				<img
					id=""
					src={singlePen.url}
					alt=""
					className="w-[300px] object-cover h-[250px] rounded-full "
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
				<Button
				// handleFunc={}
				// type={}
				>
					Add to cart
				</Button>
			</div>
		</div>
	)
}

export default PenDetails
