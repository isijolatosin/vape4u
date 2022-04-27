import React from 'react'
import { FiLinkedin, FiFacebook, FiInstagram } from 'react-icons/fi'

function Footer() {
	return (
		<footer className="flex bg-neutral-200 flex-col py-5 justify-center items-center rounded-b-[30px] lg:rounded-lg border-neutral-700">
			<div className="flex text-xs text-neutral-500 font-light">
				<div className="pr-5 border-r-2 border-r-neutral-800 md:flex">
					<p className="">
						&copy; {new Date().getUTCFullYear()}{' '}
						<span>PVG International S</span>
					</p>
					<span>• All right reserved</span>
				</div>
				<div className="md:flex ml-5">
					<p className="">website develop by </p>
					<p className="text-cyan-900 font-semibold ease-in duration-300 hover:text-cyan-500 ">
						<a
							href="https://www.linkedin.com/in/oluwatosin-isijola-33333ba8/"
							target="_blank"
							rel="noopener noreferrer">
							- Tony Isijola
						</a>
					</p>
				</div>
			</div>
			<div className="flex justify-evenly items-center w-[80%] md:w-[40%] mt-3">
				<a
					href="https://www.instagram.com/mamaselense/"
					target="_blank"
					rel="noopener noreferrer">
					<FiInstagram
						size={20}
						className=" text-cyan-900 ease-in duration-300 hover:text-cyan-500"
					/>
				</a>
				<a
					href="https://www.facebook.com/toeneahcassy"
					target="_blank"
					rel="noopener noreferrer">
					<FiFacebook
						size={20}
						className="text-cyan-900 ease-in duration-300 hover:text-cyan-500"
					/>
				</a>
				<a
					href="https://www.linkedin.com/in/oluwatosin-isijola-33333ba8/"
					target="_blank"
					rel="noopener noreferrer">
					<FiLinkedin
						size={20}
						className="text-cyan-900 ease-in duration-300 hover:text-cyan-500"
					/>
				</a>
			</div>
		</footer>
	)
}

export default Footer
