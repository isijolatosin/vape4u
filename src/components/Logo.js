import React from 'react'
import { GoPrimitiveDot } from 'react-icons/go'
import { Link } from 'react-router-dom'

const Logo = function () {
	return (
		<Link to="/" className="flex items-center">
			<GoPrimitiveDot className="text-neutral-900 p-[0px] rounded-full w-[30px] h-[30px] shadow-lg" />
			<span className="text-neutral-800 font-bold">vape4u</span>
		</Link>
	)
}

export default Logo
