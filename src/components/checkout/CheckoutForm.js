import React, { useContext } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { GoAlert } from 'react-icons/go'
import { clearCartItem, selectCartItems } from '../../slices/appSlices'
import { useSelector, useDispatch } from 'react-redux'
import { SiMastercard } from 'react-icons/si'
import { RiVisaLine } from 'react-icons/ri'
import { SiAmericanexpress } from 'react-icons/si'
import { UserContext } from '../../context/user-context'
import { SHIPPING_COST, TAX_PERCENT } from '../../constant'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ValidateEmail } from '../../utils/ValidateEmail'

const CheckoutForm = ({ total, itemCount }) => {
	const navigate = useNavigate()
	const stripe = useStripe()
	const elements = useElements()
	const cartItems = useSelector(selectCartItems)
	const [email, setEmail] = React.useState('')
	const [succeeded, setSucceeded] = React.useState(false)
	const [_error, set_Error] = React.useState(null)
	const [processing, setProcessing] = React.useState('')
	const [disabled, setDisabled] = React.useState(true)
	const [alert, setAlert] = React.useState(false)
	const [clientSecret, setClientSecret] = React.useState('')
	const [allowproceed, setAllowProceed] = React.useState(false) //CHANGE BACK TO FALSE
	const [address, setAddress] = React.useState({
		street: '',
		city: '',
		province: '',
		postalcode: '',
		country: '',
	})
	const [shippingCost, setShippingCost] = React.useState({
		country: '',
		cost: '',
	})
	const [error, setError] = React.useState(false)
	const dispatch = useDispatch()
	const { user } = useContext(UserContext)
	const inputOnchangeHandler = (e) => {
		let value = e.target.value
		if (
			e.target.value.toLowerCase() === 'united states of america' ||
			e.target.value.toLowerCase() === 'united states' ||
			e.target.value.toLowerCase() === 'america'
		) {
			value = 'usa'
		}
		if (
			e.target.value.toLowerCase() === 'united kingdom' ||
			e.target.value.toLowerCase() === 'london'
		) {
			value = 'uk'
		}
		setAddress({ ...address, [e.target.name]: value })
	}

	// Submit address
	const handleSubmitAddress = () => {
		if (
			address?.country.toLowerCase() === 'usa' ||
			address?.country.toLowerCase() === 'uk' ||
			address?.country.toLowerCase() === 'canada'
		) {
			const shippingAd = `${address.street}, ${address.city}. ${address.province}. ${address.postalcode}. ${address.country}`

			if (!user || !email) {
				setError(true)
			}
			if (
				(user &&
					address?.city &&
					address?.street &&
					address?.province &&
					address?.postalcode &&
					address?.country) ||
				(email &&
					ValidateEmail(email) &&
					address?.street &&
					address?.city &&
					address?.province &&
					address?.postalcode &&
					address?.country)
			) {
				localStorage.setItem('address', shippingAd)
				localStorage.setItem('altEmail', email)
				setAllowProceed(true)
				setAddress({
					street: '',
					city: '',
					province: '',
					postalcode: '',
					country: '',
				})

				setError(false)
			}
			Object.keys(SHIPPING_COST).filter(
				(cntry) =>
					cntry.toLowerCase() === address.country.toLowerCase() &&
					setShippingCost({
						country: cntry,
						cost: SHIPPING_COST[cntry],
					})
			)
			setEmail('')
		} else {
			setAlert(true)
		}
	}

	const cardStyle = {
		style: {
			base: {
				color: '#32325d',
				fontFamily: 'Arial, sans-serif',
				fontSmoothing: 'antialiased',
				fontSize: '16px',
				'::placeholder': {
					color: '#32325d',
				},
			},
			invalid: {
				color: '#fa755a',
				iconColor: '#fa755a',
			},
		},
	}

	const shipping_fee = Math.floor(shippingCost.cost * 100)
	const taxPercentage = total * TAX_PERCENT
	const tax = Math.floor(taxPercentage * 100)
	const price = Math.floor((total + taxPercentage) * 100)
	const total_amount = price
	const totalPrice = Math.floor(total * 100)

	const createPaymentIntent = async () => {
		try {
			const { data } = await axios.post(
				'/.netlify/functions/create-payment-intent',
				JSON.stringify({ cartItems, shipping_fee, totalPrice, tax })
			)

			setClientSecret(data.clientSecret.split("'")?.[0])
		} catch (error) {
			set_Error(
				error?.response?.data
					? 'Please contact PVG International-S Admin...'
					: ''
			)
		}
	}

	React.useEffect(() => {
		if (shipping_fee !== 0) {
			createPaymentIntent()
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shipping_fee])

	const handleChange = async (event) => {
		setDisabled(event.empty)
		set_Error(event.error ? event.error.message : '')
	}

	const handleSubmit = async (ev) => {
		ev.preventDefault()
		setProcessing(true)

		if (clientSecret) {
			const payload = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})

			localStorage.setItem('payload', payload?.paymentIntent?.client_secret)

			if (payload.error) {
				set_Error(`Payment failed ${payload.error.message}`)
				setProcessing(false)
				setTimeout(() => {
					navigate('/canceled')
				}, 5000)
			} else {
				set_Error(null)
				setProcessing(false)
				setSucceeded(true)
				payload?.paymentIntent?.client_secret &&
					setTimeout(() => {
						navigate('/success')
					}, 5000)
			}
		}
	}

	return (
		<div>
			<div className="flex flex-col max-w-[100%] md:max-w-[70%] mx-auto mt-5">
				<span className="text-xs text-center mb-5 mt-5 font-light">
					We currently ship to these 3 countries -{' '}
					<span className="font-bold">United States</span> -{' '}
					<span className="font-bold">United Kingdom</span> -{' '}
					<span className="font-bold">Canada</span>
				</span>
				{!user && (
					<input
						type="email"
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						value={email}
						className={
							error && !ValidateEmail(email)
								? 'user-email-input input-error font-light text-sm'
								: 'user-email-input font-light text-sm'
						}
					/>
				)}
				<input
					name="street"
					type="text"
					value={address.street}
					onChange={inputOnchangeHandler}
					placeholder="Address"
					className={
						error && !address.street
							? 'user-email-input input-error font-light text-sm'
							: 'user-email-input font-light text-sm'
					}
				/>
				<input
					name="city"
					type="text"
					value={address.city}
					onChange={inputOnchangeHandler}
					placeholder="City"
					className={
						error && !address.city
							? 'user-email-input input-error font-light text-sm'
							: 'user-email-input font-light text-sm'
					}
				/>
				<input
					name="province"
					type="text"
					value={address.province}
					onChange={inputOnchangeHandler}
					placeholder="Province / State"
					className={
						error && !address.province
							? 'user-email-input input-error font-light text-sm'
							: 'user-email-input font-light text-sm'
					}
				/>
				<input
					name="postalcode"
					type="text"
					value={address.postalcode}
					onChange={inputOnchangeHandler}
					placeholder="Postal-Code / Zip-code"
					className={
						error && !address.postalcode
							? 'user-email-input input-error font-light text-sm'
							: 'user-email-input font-light text-sm'
					}
				/>
				<input
					name="country"
					type="text"
					value={address.country}
					onChange={inputOnchangeHandler}
					placeholder="Country - usa / uk / canada"
					className={
						error && !address.country
							? 'user-email-input input-error font-light text-sm'
							: 'user-email-input font-light text-sm'
					}
				/>
			</div>
			{email.substr(email.length - 3) === 'com' && (
				<div className="email-verify  text-center">
					<span className="text-xs font-light">
						Please verify you have the correct email and address
					</span>
				</div>
			)}
			{error && (
				<div className="user-email-input-error text-center text-xs">
					<span>Hey! You have missing credentials!</span>
				</div>
			)}
			{alert && (
				<div className="text-red-800 text-xs flex flex-row items-center justify-center mt-5">
					<GoAlert className="mr-2" />
					<span>
						You are not authorize to make purchase from this region/country
					</span>
				</div>
			)}
			<div className="total-button text-sm mx-auto flex flex-row items-center">
				<button
					disabled={allowproceed}
					onClick={handleSubmitAddress}
					className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 hover:text-neutral-400 ease-in duration-500 mr-5 border-r-2 pr-5"
					type="submit">
					PROCEED
				</button>

				<span
					onClick={() => dispatch(clearCartItem())}
					className="hover:text-neutral-400 hover:cursor-pointer ease-in duration-500 min-w-[100px]">
					CLEAR CART
				</span>
			</div>
			{allowproceed && (
				<div>
					{succeeded ? (
						<article className="text-center mt-5">
							<h4>Thank you. Your payment was successful!</h4>
							<h4 className="text-xs text-green-700 my-4">
								Redirecting to {succeeded ? 'success' : 'canceled'} page...
							</h4>
						</article>
					) : (
						<article className="text-center text-xs p-1 mt-10 max-w-[70%] mx-auto rounded-sm text-neutral-500">
							<p>
								Hello, {user && `${user?.displayName},`} your total of{' '}
								{itemCount} {itemCount > 1 ? 'items' : 'item'} is $
								{((total_amount + shipping_fee) / 100).toFixed(2)} -{' '}
								<span className="text-cyan-800">
									tax & shipping fee included
								</span>
							</p>
						</article>
					)}
				</div>
			)}
			<form
				className={
					allowproceed
						? 'block ease-in duration-300 w-full pt-1 mt-2'
						: 'hidden ease-in duration-300'
				}
				id="payment-form"
				onSubmit={handleSubmit}>
				<div className="flex max-w-[95%] mb-1 items-center mx-auto justify-end mr-4 md:mr-6 lg:mr-5 xl:mr-6">
					<SiMastercard size={20} className="text-yellow-500 mr-3" />
					<RiVisaLine size={30} className="mr-3 text-blue-900" />
					<div className="relative flex items-center mr-5">
						<RiVisaLine size={30} className="text-blue-800" />
						<span className="absolute bottom-[0px] right-[1px] text-[7px] italic">
							DEBIT
						</span>
					</div>
					<SiAmericanexpress size={20} className="text-blue-600 mt-2" />
				</div>
				<CardElement
					id="card-element"
					options={cardStyle}
					onChange={handleChange}
					className="w-[95%] mx-auto border-[1px] border-b-0 p-3 rounded-t-[4px] "
				/>
				<button
					className="bg-neutral-800 w-[95%] flex mx-auto justify-center py-2 rounded-b-md"
					disabled={processing || disabled || succeeded}
					id="submit">
					<span
						className={
							processing || disabled || succeeded
								? 'text-neutral-50 font-light'
								: 'text-orange-500 font-light'
						}>
						{processing ? (
							<div className="spinner" id="spinner"></div>
						) : (
							'Pay now'
						)}
					</span>
				</button>
				{_error && (
					<div
						className="card-error flex items-center justify-center text-xs text-red-700 mt-5"
						// className="flex items-center text-red-700 text-xs justify-center mt-5"
						role="alert">
						<GoAlert className="mr-2" />
						{_error}
					</div>
				)}
				<div className="w-[90%] mx-auto pt-1">
					<p className={succeeded ? 'result-message' : 'result-message hidden'}>
						Payment Succeeded,
						{user?.email === 'tisijola7@gmail.com' && (
							<span>
								{' '}
								see the result in your
								<a
									className="text-blue-600"
									href={`https://dashboard.stripe.com/test/payments`}
									target="_blank"
									rel="noreferrer">
									{' '}
									Stripe Dashboard
								</a>
							</span>
						)}{' '}
						Refresh the page to pay again
					</p>
				</div>
			</form>
		</div>
	)
}

export default CheckoutForm
