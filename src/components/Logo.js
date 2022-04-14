import React, { useContext } from 'react'
import { GoPrimitiveDot } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { RiGitRepositoryPrivateFill } from 'react-icons/ri'
import { UserContext } from '../context/user-context'
import { AUTHORIZED_ID } from '../constant'

const Logo = function () {
	const { user } = useContext(UserContext)
	return (
		<div className="flex items-center justify center">
			<Link to="/" className="flex items-center">
				<GoPrimitiveDot className="text-neutral-900 p-[0px] rounded-full w-[30px] h-[30px] shadow-lg" />
				<span className="text-cyan-900 font-bold">pvg</span>
			</Link>
			{(user?.email === AUTHORIZED_ID.id_one ||
				user?.email === AUTHORIZED_ID.id_two) && (
				<Link to="/management">
					<RiGitRepositoryPrivateFill className="text-cyan-900 p-[7px] ml-3 rounded-full w-[35px] h-[35px] shadow-lg" />
				</Link>
			)}
		</div>
	)
}

export default Logo
