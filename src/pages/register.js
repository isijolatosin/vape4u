import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/shared/Layout'
import { auth, createUserProfileDocument } from '../firebase'
import Button from '../components/shared/Button'

const Register = () => {
	const navigate = useNavigate()
	const [authUser, setAuthUser] = useState({
		name: '',
		email: '',
		phone: '',
		password: '',
		error: null,
	})

	// const validate = (values) => {
	// 	const errors = {}
	// 	if (!values.email) {
	// 		errors.email = 'Required'
	// 	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
	// 		errors.email = 'Invalid email Address'
	// 	}
	// 	if (!values.name) {
	// 		errors.name = 'Required'
	// 	}
	// 	if (!values.password) {
	// 		errors.password = 'Required'
	// 	}
	// 	return errors
	// }

	const handleChangeAuthUser = (e) => {
		setAuthUser({ ...authUser, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				authUser.email,
				authUser.password
			)
			await createUserProfileDocument(user, {
				displayName: authUser.name,
				Phone: authUser.phone,
			})
			navigate('/')
		} catch (error) {
			console.log(error)
			setAuthUser({ ...authUser, error: error.message })
		}
	}

	return (
		<div>
			<Helmet>
				<title>Sign Up</title>
			</Helmet>
			<Layout>
				<section className="flex flex-col items-center mt-[150px] lg:mt-[100px]">
					<div className="text-center">
						<h1 className="text-2xl font-bold">Sign Up</h1>
						<p className="w-[55%] mx-auto my-10">
							By creating account with us, you consent to receiving newsletters
							or promotions from{' '}
							<Link to="/">
								<span className="text-rose-800">PVG International S.</span>
							</Link>
						</p>
					</div>
					<article className="w-full">
						<form onSubmit={handleSubmit}>
							<div>
								<input
									type="text"
									name="name"
									id="name"
									value={authUser.name}
									onChange={handleChangeAuthUser}
									placeholder="Full Name"
									className="mt-1 block lg:w-[30%] mx-auto w-[70%] px-3 py-2 border border-neutral-100 text-sm shadow-xl placeholder-gray-400 focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-200 isabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 outline-0 mb-5"
								/>
							</div>
							<div>
								<input
									type="text"
									name="email"
									id="email"
									value={authUser.email}
									onChange={handleChangeAuthUser}
									placeholder="Email"
									className="mt-1 block lg:w-[30%] mx-auto w-[70%] px-3 py-2 border border-neutral-100 text-sm shadow-xl placeholder-gray-400 focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-200 isabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 outline-0 mb-5"
								/>
							</div>
							<div>
								<input
									type="password"
									name="password"
									id="password"
									value={authUser.password}
									onChange={handleChangeAuthUser}
									placeholder="Password"
									className="mt-1 block lg:w-[30%] mx-auto w-[70%] px-3 py-2 border border-neutral-100 text-sm shadow-xl placeholder-gray-400 focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-200 isabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 outline-0 mb-5"
								/>
							</div>
							<div>
								<input
									type="number"
									name="phone"
									id="number"
									value={authUser.phone}
									onChange={handleChangeAuthUser}
									placeholder="Phone-Number (optional)"
									className="mt-1 block lg:w-[30%] mx-auto w-[70%] px-3 py-2 border border-neutral-100 text-sm shadow-xl placeholder-gray-400 focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-200 isabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 outline-0 mb-5"
								/>
							</div>
							<div className="text-center text-xs text-red-800">
								{authUser.error ? <p>Error message: {authUser.error}</p> : null}
							</div>
							<div className="flex flex-row my-10 justify-center">
								<Button onClick={handleSubmit} type="submit">
									Create Account
								</Button>
							</div>
						</form>
					</article>
					<div>
						<p className="text-neutral-500 font-light">
							Already have an account with us?{' '}
							<Link to="/sign-in">
								<button className="text-pink-800 mb-10">Login</button>
							</Link>{' '}
						</p>
					</div>
					<div>
						<p className="font-light mb-10 w-[70%] mx-auto text-center">
							This site is protected by Google{' '}
							<a
								href="https://policies.google.com/privacy"
								rel="noopener noreferrer">
								<span className="text-pink-800 mb-10 text-sm underline">
									Privacy Policy
								</span>
							</a>{' '}
							and{' '}
							<a
								href="https://policies.google.com/terms"
								rel="noopener noreferrer">
								<span className="text-pink-800 mb-10 text-sm underline">
									Terms of Service
								</span>
							</a>{' '}
							apply
						</p>
					</div>
				</section>
			</Layout>
		</div>
	)
}

export default Register
