import React, { useContext, useState } from 'react'
import emailjs from 'emailjs-com'
import { UserContext } from '../context/user-context'
import Heading from './Heading'
import { db } from '../firebase'
import { MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { GiCheckMark } from 'react-icons/gi'
import { MdClose } from 'react-icons/md'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
// import Button from './shared/Button'
import { AUTHORIZED_ID } from '../constant'

function Shippment() {
	const { user } = useContext(UserContext)
	const [readMore, setReadMore] = React.useState(false)
	const [trackingInput, setShowTrackingInput] = React.useState(false)
	const [modal, setModal] = React.useState(false)
	const [_id, setId] = React.useState('')
	const [matchIdx, setMatchIdx] = React.useState('')
	const [custmr, setCustmr] = React.useState('')
	const [isLoading, setIsLoading] = React.useState(true)
	const [shippingInfo, setShippingInfo] = React.useState({
		shippingHeader: [],
		shippingData: [],
	})
	const [trackingNum, setTrackingNum] = useState({
		number: '',
		courier: '',
	})

	const itemObj = []
	// eslint-disable-next-line array-callback-return
	shippingInfo?.shippingData?.filter((item) => {
		const obj = {
			name: item.title,
			quantity: item.quantity,
			description: item.description,
			id: item.id,
		}
		if (item.id === _id) {
			itemObj.push(obj)
		}
	})

	const messageParams = {
		name: user.displayName,
		message: `Thank you for your patronage. Your order of ${itemObj?.[0]?.quantity} ${itemObj?.[0]?.name}, is being processed and your tracking information is: Tracking No - ${trackingNum.number}, Courier - ${trackingNum.courier}.`,
		client: user?.email,
	}

	const handleChangeAuthUser = (e) => {
		setTrackingNum({ ...trackingNum, [e.target.name]: e.target.value })
	}

	const getObjectHeader = (object) => {
		let objectKeys = []
		if (object) {
			for (let i = 0; i < object.length; i++) {
				objectKeys.push(Object?.keys(object?.[i]?.data || []))
			}
		}
		objectKeys.map((item) => item.sort())
		return objectKeys
	}

	React.useEffect(() => {
		// getting address and details for shipping
		user &&
			db
				.collection('admin')
				.doc(`${AUTHORIZED_ID.id_one}/`)
				.collection('all-purchased')
				.orderBy('title', 'asc')
				.onSnapshot((snapshot) => {
					const results = snapshot.docs.map((doc) => ({
						data: doc.data(),
					}))
					if (results) {
						let data = []
						for (const result of results) {
							data.push({
								address: result?.data.address,
								customer: result?.data.customer,
								description: result?.data.description,
								email: result?.data.email,
								id: result?.data.id,
								price: `$${result?.data.price}`,
								quantity: result?.data.quantity,
								title: result?.data.title,
							})
						}

						setShippingInfo({
							shippingHeader: getObjectHeader(results),
							shippingData: data,
						})
					}
				})
	}, [user])

	if (isLoading) {
		setTimeout(() => {
			setIsLoading(false)
		}, 5000)
	}
	const toggleRead = (idx) => {
		setMatchIdx(idx)
		setReadMore(!readMore)
	}
	const toggleModal = (idx, customer) => {
		setCustmr(customer)
		setMatchIdx(idx)
		setModal(true)
	}

	const hideShipped = (id) => {
		db.collection('admin')
			.doc(`${AUTHORIZED_ID.id_one}/`)
			.collection('all-purchased')
			.onSnapshot((snapshot) => {
				snapshot.docs.map(
					(doc) =>
						doc.data().id === id &&
						db
							.collection('admin')
							.doc(`${AUTHORIZED_ID.id_one}/`)
							.collection('all-purchased')
							.doc(doc.id)
							.delete()
				)
			})

		// generate automated email to client
		const SendClientSuccessfulPurchaseEmail = () => {
			emailjs
				.send(
					'service_2eu7o7n',
					'template_fu9xmt5',
					messageParams,
					'sNlN8jUh8a3zM6R3m'
				)
				.then((res) => {})
				.catch((err) => console.log(err))
		}

		setTimeout(() => {
			SendClientSuccessfulPurchaseEmail()
		}, 1000)

		setShowTrackingInput(false)
		setModal(false)
	}

	const scrollToTop = function scrollToTop() {
		window.scrollTo(0, 0)
	}

	return (
		<div className="flex flex-col items-center my-5">
			<Heading>Shipment</Heading>
			{/* {user?.email === AUTHORIZED_ID.id_one || AUTHORIZED_ID.id_two ? ( */}
			<div>
				{trackingInput && (
					<div className="mt-10 w-full">
						<input
							type="text"
							name="number"
							id="number"
							value={trackingNum.number}
							onChange={handleChangeAuthUser}
							placeholder="Tracking Number"
							className="mt-1 block lg:w-[30%] mx-auto w-[70%] px-3 py-2 border border-neutral-100 text-sm shadow-xl placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-0 focus:ring-blue-600 isabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 outline-0 mb-5"
						/>
						<input
							type="text"
							name="courier"
							id="courier"
							value={trackingNum.courier}
							onChange={handleChangeAuthUser}
							placeholder="Courier Name"
							className="mt-1 block lg:w-[30%] mx-auto w-[70%] px-3 py-2 border border-neutral-100 text-sm shadow-xl placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-0 focus:ring-blue-600 isabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 outline-0 mb-5"
						/>
						<div
							className={
								trackingNum.number === '' || trackingNum.courier === ''
									? 'flex flex-col justify-center text-sm text-gray-200'
									: 'flex flex-col justify-center text-sm text-green-700 hover:text-gray-400 mb-10'
							}>
							<button
								disabled={
									trackingNum.number === '' || trackingNum.courier === ''
								}
								onClick={() => hideShipped(_id)}>
								Submit Tracking
							</button>
						</div>
					</div>
				)}
				<main className="history-page">
					{shippingInfo?.shippingHeader?.length === 0 &&
					shippingInfo?.shippingHeader?.length === 0 ? (
						isLoading ? (
							<span>Please hold, fetching PVG data...</span>
						) : (
							<span>Data not Found</span>
						)
					) : (
						<>
							<div className="max-w-[90%] mr-[50px] md:px-[50px] md:max-w-[80%] lg:max-w-[100%] md:overflow-x-auto">
								<table>
									<thead>
										<tr className="table-head-row">
											{shippingInfo?.shippingHeader?.[0]?.map((head, idx) => (
												<th key={idx} className="table-head-item">
													{head}{' '}
													{head === 'appointment' || head === 'reservation'
														? ' - date'
														: ''}
												</th>
											))}
										</tr>
									</thead>
									<tbody>
										{shippingInfo?.shippingData?.map((item, idx) => (
											<tr className="relative table-item-row" key={idx}>
												{Object?.values(item)?.map((itm, index) => (
													<td
														className={
															itm?.length >= 100
																? 'table-items align-left'
																: 'table-items'
														}
														key={index}
														onClick={() =>
															toggleModal(item?.id, item?.customer)
														}>
														{typeof itm === 'string'
															? itm?.length >= 100
																? readMore && matchIdx === item?.id
																	? itm
																	: `${itm.substring(0, 50)}...`
																: itm
															: itm}
														{itm?.length >= 100 && (
															<>
																<span onClick={() => toggleRead(item?.id)}>
																	{readMore && matchIdx === item?.id ? (
																		<>
																			<span>Read Less</span>{' '}
																			<MdOutlineKeyboardArrowUp />
																		</>
																	) : (
																		<>
																			<span>Read More</span>{' '}
																			<MdOutlineKeyboardArrowDown />
																		</>
																	)}
																</span>
															</>
														)}
													</td>
												))}
												{modal &&
													matchIdx === item.id &&
													custmr === item?.customer && (
														<div className="been-shipped">
															<div className="mt-[30px] text-xs ">
																Has this product been shipped ? <br />
																<span className="been-shipped-textsm text-green-700 text-sm">
																	Click YES to add tracking number
																</span>
															</div>
															<div className="flex flex-row justify-center">
																<button
																	className="mx-2 flex flex-row text-sm items-center hover:text-green-700"
																	onClick={() => {
																		setId(item.id)
																		setShowTrackingInput(true)
																		scrollToTop()
																	}}>
																	<GiCheckMark className="mr-1" />
																	Yes
																</button>
																<button
																	className="mx-2 flex flex-row text-sm items-center hover:text-red-800"
																	onClick={() => {
																		setShowTrackingInput(false)
																		setModal(false)
																	}}>
																	<MdClose size={20} className="mr-1" />
																	No
																</button>
															</div>
														</div>
													)}
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</>
					)}
				</main>
			</div>
		</div>
	)
}
export default Shippment
