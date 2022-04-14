import React from 'react'
import { Helmet } from 'react-helmet'
import Heading from '../components/Heading'
import Inventory from '../components/Inventory'
import Layout from '../components/shared/Layout'
import Shippment from '../components/Shippment'
import { BsFillArrowUpSquareFill } from 'react-icons/bs'
import AllInventories from '../components/AllInventories'
// import { UserContext } from '../context/user-context'

function Management() {
	const [section, setSection] = React.useState('all-inventory')
	// const { user } = useContext(UserContext)
	// const isSales = localStorage.getItem('isSales')

	const toggleSection = (e) => {
		setSection(e.target.id)
	}

	const SectionComp = () => {
		if (section === 'all-inventory') {
			return <AllInventories />
		}
		if (section === 'inventory') {
			return <Inventory />
		}
		if (section === 'shipping') {
			return <Shippment />
		}
	}

	return (
		<>
			<Helmet>
				<title>Management Portal</title>
			</Helmet>
			<Layout>
				<div className={'pt-5 flex flex-col w-[100%] items-center'}>
					<Heading>Management portal</Heading>
					<div className="my-5 w-[90%] text-cyan-900 font-bold">
						<ul className="flex text-xs flex-row items-center justify-between w-[100%] lg:w-[50%] mx-auto">
							<li
								id="all-inventory"
								className="hover:cursor-pointer bg-violet-50 px-3 py-[4px] rounded-full hover:bg-violet-100 ease-in duration-300 border-[1px] border-cyan-900"
								onClick={toggleSection}>
								All Inventories
							</li>
							<li
								id="inventory"
								className="hover:cursor-pointer bg-violet-50 px-3 py-[4px] rounded-full hover:bg-violet-100 ease-in duration-300 border-[1px] border-cyan-900"
								onClick={toggleSection}>
								Add to Inventory
							</li>
							<li
								id="shipping"
								className="hover:cursor-pointer bg-violet-50  px-3 py-[4px] rounded-full hover:bg-violet-100 ease-in duration-300 border-[1px] border-cyan-900"
								onClick={toggleSection}>
								Shipment
							</li>
						</ul>
					</div>
					{/* {user && ( */}
					<div className="w-[100%]">
						<SectionComp />
					</div>
					{/* )} */}
					{!section && (
						<div className="flex flex-col items-center my-20 ">
							<div className="text-2xl text-stone-600">
								<BsFillArrowUpSquareFill />
							</div>
							<span className="text-stone-600 my-5 capitalize font-light">
								Action Required!
							</span>
						</div>
					)}
				</div>
			</Layout>
		</>
	)
}

export default Management
