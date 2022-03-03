import React from 'react'
import Layout from '../components/shared/Layout'

const Checkout = function () {
	return (
		<div className="w-screen h-screen bg-neutral-50 flex items-center">
			<Layout>
				<div className="flex flex-row justify-between items-center">
					children
				</div>
			</Layout>
		</div>
	)
}

export default Checkout
