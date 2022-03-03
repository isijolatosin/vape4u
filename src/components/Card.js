import React from 'react'
import { HiViewGrid } from 'react-icons/hi'
import { BsHandbagFill } from 'react-icons/bs'

function Card({ pen, setSinglePen, scrollToTop }) {
	const handlePick = function () {
		setSinglePen(pen)
		scrollToTop()
	}

	return (
		<div className="bg-neutral-50 w-full h-full md:w-[230px] md:h-[270px] relative rounded-[20px] mt-5 ">
			<div className="absolute m-3 top-0 left-0 rounded-full p-1 text-neutral-600 shadow-md hover:cursor-pointer">
				<HiViewGrid onClick={handlePick} size={12} />
			</div>
			<div className="absolute m-3 top-0 right-0 rounded-full p-1 text-neutral-900 shadow-md hover:cursor-pointer">
				<BsHandbagFill size={12} />
			</div>
			<img
				id={pen.id}
				src={pen.url}
				alt={pen.name}
				className="max-w-[90%] max-h-[300px] md:max-w-[90%] md:max-h-[200px] mt-10 mx-auto object-contain"
			/>
			<div className="bg-blur absolute bottom-0 w-full h-[100px] rounded-b-[20px] py-2 text-center text-xs text-blue-800 font-bold flex flex-col leading-2 px-3">
				<span>{pen.name}</span>
				<span>${pen.price}:00</span>
			</div>
		</div>
	)
}

export default Card
