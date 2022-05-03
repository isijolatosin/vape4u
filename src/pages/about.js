import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/shared/Layout'

const Home = function () {
	return (
		<>
			<Helmet>
				<title>Home</title>
			</Helmet>
			<div className="w-screen h-screen bg-neutral-50 flex items-center">
				<Layout>
					<div className="flex flex-row justify-between items-center">
						children
					</div>
				</Layout>
			</div>
		</>
	)
}

export default Home
