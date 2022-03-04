import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import { BsHandbagFill } from 'react-icons/bs'
import { BsHandbag } from 'react-icons/bs'
import { selectItemCount, selectTotal } from '../slices/appSlices'
import { useSelector } from 'react-redux'

const Nav = function () {
	const [active, setActive] = React.useState()
	const itemCount = useSelector(selectItemCount)
	const total = useSelector(selectTotal)
	const navLinks = [
		{
			id: 1,
			navName: 'home',
			link: '/',
		},
		{
			id: 2,
			navName: 'shop',
			link: '/shop',
		},
	]

	React.useEffect(() => {
		const pathArr = window?.location?.pathname.split('/').filter((x) => x)
		// eslint-disable-next-line array-callback-return
		navLinks.map((itm) => {
			if (pathArr?.[0] === itm.navName) {
				setActive(pathArr?.[0])
			}
			if (window.location.pathname === '/') {
				setActive('home')
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div>
			<div className="flex items-center justify-between">
				<Logo />
				<div className="hidden md:inline">
					{navLinks.map((nav) => (
						<Link
							onClick={() => setActive(nav.navName)}
							className={
								active === nav.navName
									? 'mx-3 text-yellow-500 font-bold text-xs'
									: 'mx-3 text-neutral-800 font-bold text-xs'
							}
							key={nav.id}
							to={nav.link}>
							{nav.navName}
						</Link>
					))}
				</div>
				<Link to="/checkout" className="flex items-center justify-between">
					<span className="text-xs font-bold">${total}:00</span>
					<div
						className={
							itemCount > 0 ? 'ml-5 bg-neutral-200 p-2 rounded-full' : 'ml-5'
						}>
						{itemCount < 1 ? <BsHandbag /> : <BsHandbagFill />}
						{itemCount > 0 && (
							<div className="absolute bg-yellow-500 text-black w-[20px] h-[20px] text-xs top-4 right-5 rounded-full flex items-center justify-center">
								<span>{itemCount}</span>
							</div>
						)}
					</div>
				</Link>
			</div>
			<div className="md:hidden w-[60%] mx-auto flex mt-5 justify-between">
				{navLinks.map((nav) => (
					<Link
						onClick={() => setActive(nav.navName)}
						className={
							active === nav.navName
								? 'mx-3 text-yellow-500 font-bold text-xs ease-in duration-300 hover:text-cyan-900'
								: 'mx-3 text-neutral-800 font-bold text-xs ease-in duration-300 hover:text-cyan-900'
						}
						key={nav.id}
						to={nav.link}>
						{nav.navName}
					</Link>
				))}
			</div>
		</div>
	)
}

export default Nav
