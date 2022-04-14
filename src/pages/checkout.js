import React from 'react'
import { Helmet } from 'react-helmet'
import { FaOpencart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/shared/Layout'
import {
	selectCartItems,
	selectItemCount,
	selectTotal,
} from '../slices/appSlices'
import Button from '../components/shared/Button'
import CartItems from '../components/CartItems'
import Total from '../components/Total'

const Checkout = function () {
	const itemCount = useSelector(selectItemCount)
	const total = useSelector(selectTotal)
	const cartItems = useSelector(selectCartItems)
	const navigate = useNavigate()

	return (
		<>
			<Helmet>
				<title>Checkout</title>
			</Helmet>
			<div className="flex items-center">
				<Layout>
					<div className="pb-[30px] w-full flex flex-col items-center justify-center ">
						<div className="flex flex-row items-center mb-5">
							<FaOpencart className="text-2xl text-black" />
							<h2 className="text-2xl ml-2 text-black">Cart</h2>
						</div>
						{cartItems.length === 0 ? (
							<>
								<div className="mb-5">Your Cart is Empty</div>
								<Button type="large" handleFunc={() => navigate('/')}>
									Shop now
								</Button>
							</>
						) : (
							<div className="flex flex-col w-full lg:flex-row lg:w-[90%] justify-center items-center lg:items-start">
								<div className="w-full lg:w-[40%] xl:w-[50%] mb-5">
									{cartItems.map((item) => (
										<CartItems product={item} key={item._id} />
									))}
								</div>
								<div className="w-full lg:ml-5 xl:ml-5 lg:w-[60%] xl:w-[50%]">
									<Total itemCount={itemCount} total={total} />
								</div>
							</div>
						)}
					</div>
				</Layout>
			</div>
		</>
	)
}

export default Checkout
