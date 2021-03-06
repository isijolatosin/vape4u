import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { GoAlert } from 'react-icons/go'
import { useDispatch, useSelector } from 'react-redux'
import { clearCartItem, selectCartItems } from '../slices/appSlices'
import { db } from '../firebase'
import Layout from '../components/shared/Layout'
import { UserContext } from '../context/user-context'
import Button from '../components/shared/Button'
import { AUTHORIZED_ID } from '../constant'

const Success = () => {
	const { user } = useContext(UserContext)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const cartItems = useSelector(selectCartItems)
	const userAddress = localStorage.getItem('address')
	const payload = localStorage.getItem('payload')
	const userEmail = user?.email || localStorage.getItem('altEmail')

	React.useEffect(() => {
		userEmail &&
			cartItems.length !== 0 &&
			payload &&
			// eslint-disable-next-line array-callback-return
			cartItems.map((item) => {
				// shopping path
				db.collection('purchased')
					.doc(`${userEmail}/`)
					.collection('shoppings')
					.add({
						id: item._id,
						title: item.name,
						description: item.description,
						quantity: item.quantity,
						price: item.price,
						address: userAddress,
						customer: (user && user?.displayName) || userEmail,
						email: userEmail,
					})
					.then(() => {
						// console.log(`SUCCESSFULL`)
					})
					.catch((error) => console.log('Error' + error.message))

				// admin path
				db.collection('admin')
					.doc(`${AUTHORIZED_ID.id_one}/`)
					.collection('all-purchased')
					.add({
						id: item._id,
						title: item.name,
						description: item.description,
						quantity: item.quantity,
						price: item.price,
						address: userAddress,
						customer: (user && user?.displayName) || userEmail,
						email: userEmail,
					})
					.then(() => {
						console.log(`SUCCESSFULL`)
					})
					.catch((error) => console.log('Error' + error.message))
			})

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleBackToShopping = () => {
		dispatch(clearCartItem())
		localStorage.setItem('payload', '')
		localStorage.setItem('address', '')
		localStorage.setItem('altEmail', '')
		navigate('/')
	}

	return (
		<>
			<Helmet>
				<title>PVG: Success-page</title>
			</Helmet>
			<Layout>
				{payload ? (
					<div className="pt-[150px] bg-neutral-200 lg:mt-[100px] flex flex-col items-center">
						<h1 className="text-md text-neutral-600 uppercase mb-1">
							{user ? `Hey ${user?.displayName}` : 'Hey!'}
						</h1>
						<h1 className="text-xl uppercase">Thank you for your purchase</h1>
						<div className="mt-10 text-neutral-600 font-light text-center">
							<span>
								We are currently processing your order and will send you a
								confirmation email shortly
							</span>
						</div>
						<div className="my-10">
							<Button handleFunc={handleBackToShopping}>
								Continue Shopping
							</Button>
						</div>
					</div>
				) : (
					<div className="text-red-700 flex flex-col items-center justify-center my-10 uppercase font-bold">
						<GoAlert className="mr-5 text-3xl mb-5" />
						You do not have any transactions
					</div>
				)}
			</Layout>
		</>
	)
}

export default Success
