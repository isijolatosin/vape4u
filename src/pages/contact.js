import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/shared/Layout'

const Contact = function () {
	const [contactInput, setcontactInput] = React.useState({
		name: '',
		email: '',
		subject: '',
		message: '',
		error: null,
	})
	const handleContactInput = (e) => {
		setcontactInput({ ...contactInput, [e.target.name]: e.target.value })
	}
	function handleSubmit(e) {
		e.preventDefault()
		try {
			window.open(
				`mailto:'pvginternationals@gmail.com'?subject=${contactInput.subject}&body=${contactInput.name}: ${contactInput.message}. My email is ${contactInput.email}`
			)
			setcontactInput({
				name: '',
				email: '',
				subject: '',
				message: '',
				error: null,
			})
		} catch (error) {
			console.log(error)
			setcontactInput({ ...contactInput, error: error.message })
		}
	}
	return (
		<>
			<Helmet>
				<title>Contact</title>
			</Helmet>
			<Layout>
				<div className="flex flex-row justify-center items-center">
					<form
						onSubmit={handleSubmit}
						className="w-full flex flex-col items-center md:max-w-[80%] bg-neutral-50 py-5 mb-5">
						<span className="text-sm font-light mb-2">
							Contact - PVG International - S
						</span>
						<p className="font-light text-center text-[14px] max-w-[80%] lg:max-w-[50%] my-5">
							We at PVG International-s are customer centric, we take pride in
							our customers. We are committed in helping with picking the right
							hair for you, adequate information regarding education on hair
							maintenance, and providing high quality hair extensions. We value
							you our customers and we are committed to long time support. Our
							customers are our sister’s. We respond within 24-48 business hours
							Monday - Friday.
						</p>
						<div className="md:w-[90%] lg:w-[70%] 2xl:w-[50%] mx-auto flex flex-col items-center">
							<input
								type="text"
								name="name"
								id="name"
								value={contactInput.name}
								onChange={handleContactInput}
								placeholder="Full Name"
								className="w-[100%] mb-5 text-neutral-500 font-light bg-white block px-3 py-2 border-gray-200 rounded-[2px] text-xs border-[1px] placeholder-neutral-300 focus:outline-none focus:border-yellow-100 focus:ring-1 focus:ring-yellow-100 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 outline-0"
							/>
							<input
								type="text"
								name="email"
								id="email"
								value={contactInput.email}
								onChange={handleContactInput}
								placeholder="Email"
								className="w-[100%] mb-5 text-neutral-500 font-light bg-white block px-3 py-2 border-gray-200 rounded-[2px] text-xs border-[1px] placeholder-neutral-300 focus:outline-none focus:border-yellow-100 focus:ring-1 focus:ring-yellow-100 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 outline-0"
							/>
							<input
								type="text"
								name="subject"
								id="subject"
								value={contactInput.subject}
								onChange={handleContactInput}
								placeholder="subject"
								className="w-[100%] mb-5 text-neutral-500 font-light bg-white block px-3 py-2 border-gray-200 rounded-[2px] text-xs border-[1px] placeholder-neutral-300 focus:outline-none focus:border-yellow-100 focus:ring-1 focus:ring-yellow-100 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 outline-0"
							/>
							<textarea
								id="message"
								rows="4"
								cols="50"
								name="message"
								value={contactInput.message}
								onChange={handleContactInput}
								placeholder="message..."
								className="w-[100%] mb-5 text-neutral-500 font-light bg-white block px-3 py-2 border-gray-200 rounded-[2px] text-xs border-[1px] placeholder-neutral-300 focus:outline-none focus:border-yellow-100 focus:ring-1 focus:ring-yellow-100 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 outline-0"
							/>
							<div className="text-center text-xs text-red-800">
								{contactInput.error ? (
									<p>Error message: {contactInput.error}</p>
								) : null}
							</div>
							<button
								disabled={
									!contactInput.name ||
									!contactInput.email ||
									!contactInput.subject ||
									!contactInput.message
								}
								className="bg-neutral-600 w-[70%] text-white py-2 text-sm font-light tracking-wide"
								type="submit">
								submit
							</button>
						</div>
					</form>
				</div>
			</Layout>
		</>
	)
}

export default Contact
