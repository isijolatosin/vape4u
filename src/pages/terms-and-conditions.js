import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/shared/Layout'

const Contact = function () {
	return (
		<>
			<Helmet>
				<title>Contact</title>
			</Helmet>
			<Layout>
				<div className="flex flex-row justify-center items-center">
					<p className="font-light text-center text-[14px] max-w-[80%] lg:max-w-[50%] my-5">
						We at PVG International-s are customer centric, we take pride in our
						customers. We are committed in helping with picking the right hair
						for you, adequate information regarding education on hair
						maintenance, and providing high quality hair extensions. We value
						you our customers and we are committed to long time support. Our
						customers are our sister’s. We respond within 24-48 business hours
						Monday - Friday.
					</p>
				</div>
			</Layout>
		</>
	)
}

export default Contact
