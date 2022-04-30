import React from 'react'
import StripeCheckout from './checkout/stripe-checkout'
import { SHIPPING_COST } from '../constant'

const Total = ({ itemCount, total }) => {
	const canImage = require('../assets/can-image.jpeg')
	const usaImage = require('../assets/usa-image.jpeg')
	const lonImage = require('../assets/lon-image.jpeg')

	return (
		<div className="shadow-lg rounded-lg p-5">
			<div className="py-3 px-5 text-slate-600 max-w-[100%] lg:max-w-[70%] mx-auto flex flex-row justify-between">
				{/* <div>
					<p>Total Items: {itemCount}</p>
					<span>{`Amount to Pay: $${total}`}</span>
				</div> */}
				<ul className="flex justify-center items-center w-full">
					<li className="flex flex-row items-center text-xs font-medium mr-5">
						<img className="h-[8px] mr-2" src={usaImage} alt="usa-flag" />
						USA - ${SHIPPING_COST.usa}:00
					</li>
					<li className="flex flex-row items-center text-xs font-medium mr-5">
						<img className="h-[8px] mr-2" src={canImage} alt="canada-flag" />
						CAN - ${SHIPPING_COST.canada}:00
					</li>
					<li className="flex flex-row items-center text-xs font-medium mr-5">
						<img className="h-[8px] mr-2" src={lonImage} alt="london-flag" />
						UK - ${SHIPPING_COST.uk}:00
					</li>
				</ul>
			</div>
			<StripeCheckout total={total} itemCount={itemCount} />
		</div>
	)
}

export default Total
