import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import firebase from '../firebase'
import Layout from '../components/shared/Layout'
import { auth } from '../firebase'
import Button from '../components/shared/Button'
import { Helmet } from 'react-helmet'

const Login = () => {
	const navigate = useNavigate()
	const [isReset, setIsReset] = React.useState(false)
	const [authUser, setAuthUser] = useState({
		email: '',
		password: '',
		error: null,
	})
	const [showpswd, setShowpswd] = useState(false)

	const handleChangeAuthUser = (e) => {
		setAuthUser({ ...authUser, [e.target.name]: e.target.value })
	}

	const togglePassword = () => {
		setShowpswd(!showpswd)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			await auth.signInWithEmailAndPassword(authUser.email, authUser.password)
			navigate('/')
		} catch (error) {
			console.log(error)
			setAuthUser({ ...authUser, error: error.message })
		}
	}

	const resetPassword = (email) => {
		firebase
			.auth()
			.sendPasswordResetEmail(authUser.email)
			.then(() => {
				try {
					setIsReset(true)
				} catch (error) {
					console.log(`error message - ${error.message}`)
				}
			})
	}

	return (
		<div>
			<Helmet>
				<title>Sign-In</title>
			</Helmet>
			<Layout>
				<main className="">
					<section className="flex flex-col items-center mt-[150px] lg:mt-[100px]">
						<div className="text-center">
							<h1 className="text-2xl font-bold mb-10">Sign In</h1>
							{/* <p className="w-[55%] mx-auto my-10">
								Fill in your login credentials to gain access to your personal
								and cart history page.
							</p> */}
						</div>
						<article className="w-full">
							<form onSubmit={handleSubmit}>
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
								<div className="relative h-[38.4px] lg:w-[30%] w-[70%] mx-auto shadow-xl">
									<input
										type={showpswd ? 'text' : 'password'}
										name="password"
										id="password"
										value={authUser.password}
										onChange={handleChangeAuthUser}
										placeholder="Password"
										className="mt-1 block w-full px-3 py-2 border border-neutral-100 text-sm  placeholder-gray-400 focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 outline-0 mb-5"
									/>
									<div className="text-neutral-500 font-light flex flex-row justify-center items-center absolute top-0 bg-pink-900 pr-2 h-full right-0 w-[50px] text-center border border-pink-900">
										<input
											className="border-gray-300 ml-2 rounded-full"
											type="checkbox"
											onClick={togglePassword}
										/>
									</div>
								</div>
								<div className="text-red-800 text-xs mt-5 text-center">
									{authUser.error ? <p>{authUser.error}</p> : null}
								</div>
								<div className="flex flex-row my-10 justify-center">
									<Button onClick={handleSubmit} type="submit">
										Sign In
									</Button>
								</div>
							</form>
						</article>
						<div className="text-neutral-700 items-center text-sm flex flex-col font-light ">
							<span>
								Forgot Password? |{' '}
								<button
									onClick={() => resetPassword(authUser.email)}
									className="text-pink-800 underline">
									Reset
								</button>
							</span>
							{isReset && (
								<div className=" text-blue-800 mt-5">
									<span>{`A password reset link has been sent to this email - ${authUser.email}`}</span>
								</div>
							)}
							<p className="mt-5 mb-10">
								Not a Member? |{' '}
								<Link to="/sign-up">
									<button className="text-pink-800 underline">
										Create Account
									</button>
								</Link>
							</p>
						</div>
					</section>
				</main>
			</Layout>
		</div>
	)
}

export default Login
