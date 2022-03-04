import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import styled from 'styled-components'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from './CheckoutForm'

const promise = loadStripe(
	'pk_test_51KZS6rHNlaA34TujHM8B3Foxz9KiMBFKgHWhj8RYrJg2CvBungKDdLMgw93uhi9OsAHaskXPgTVfYSamHXrrR2sY00P3Zvqja8'
)

const StripeCheckout = ({ total, itemCount }) => {
	return (
		<Wrapper>
			<Elements stripe={promise}>
				<CheckoutForm total={total} itemCount={itemCount} />
			</Elements>
		</Wrapper>
	)
}

const Wrapper = styled.section`
	form {
		width: 30vw;
		align-self: center;
		box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
			0px 2px 5px 0px rgba(50, 50, 93, 0.1),
			0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
		border-radius: 7px;
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 30px;
		padding-bottom: 30px;
	}

	input {
		border-radius: 6px;
		margin-bottom: 6px;
		padding: 12px;
		border: 1px solid rgba(50, 50, 93, 0.1);
		max-height: 44px;
		font-size: 16px;
		width: 100%;
		background: white;
		box-sizing: border-box;
	}

	.result-message {
		line-height: 22px;
		font-size: 16px;
	}

	.result-message a {
		color: rgb(89, 111, 214);
		font-weight: 600;
		text-decoration: none;
	}

	.hidden {
		display: none;
	}

	#card-error {
		color: rgb(105, 115, 134);
		font-size: 16px;
		line-height: 20px;
		margin-top: 12px;
		text-align: center;
	}

	#card-element {
		border-radius: 4px 4px 0 0;
		padding: 12px;
		border: 1px solid rgba(50, 50, 93, 0.1);
		max-height: 44px;
		width: 100%;
		background: white;
		box-sizing: border-box;
	}

	#payment-request-button {
		margin-bottom: 32px;
	}

	button:hover {
		filter: contrast(115%);
	}

	button:disabled {
		opacity: 0.5;
		cursor: default;
	}

	/* spinner/processing state, errors */
	.spinner,
	.spinner:before,
	.spinner:after {
		border-radius: 50%;
	}

	.spinner {
		color: #ffffff;
		font-size: 22px;
		text-indent: -99999px;
		margin: 0px auto;
		position: relative;
		width: 20px;
		height: 20px;
		box-shadow: inset 0 0 0 2px;
		-webkit-transform: translateZ(0);
		-ms-transform: translateZ(0);
		transform: translateZ(0);
	}

	.spinner:before,
	.spinner:after {
		position: absolute;
		content: '';
	}

	.spinner:before {
		width: 10.4px;
		height: 20.4px;
		background: undefined;
		border-radius: 20.4px 0 0 20.4px;
		top: -0.2px;
		left: -0.2px;
		-webkit-transform-origin: 10.4px 10.2px;
		transform-origin: 10.4px 10.2px;
		-webkit-animation: loading 2s infinite ease 1.5s;
		animation: loading 2s infinite ease 1.5s;
	}

	.spinner:after {
		width: 10.4px;
		height: 10.2px;
		background: undefined;
		border-radius: 0 10.2px 10.2px 0;
		top: -0.1px;
		left: 10.2px;
		-webkit-transform-origin: 0px 10.2px;
		transform-origin: 0px 10.2px;
		-webkit-animation: loading 2s infinite ease;
		animation: loading 2s infinite ease;
	}

	@keyframes loading {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}

	@media only screen and (max-width: 600px) {
		form {
			width: 80vw;
		}
	}
`

export default StripeCheckout