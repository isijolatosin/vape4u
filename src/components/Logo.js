import React from 'react'
import { GoPrimitiveDot } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { RiGitRepositoryPrivateFill } from 'react-icons/ri'

const Logo = function () {
	return (
		<div className="flex items-center justify center">
			<Link to="/" className="flex items-center">
				<GoPrimitiveDot className="text-neutral-900 p-[0px] rounded-full w-[30px] h-[30px] shadow-lg" />
				<span className="text-neutral-800 font-bold">vape4u</span>
			</Link>
			<Link to="/management">
				<RiGitRepositoryPrivateFill className="text-cyan-900 p-[7px] ml-5 rounded-full w-[35px] h-[35px] shadow-lg" />
			</Link>
		</div>
	)
}

export default Logo
