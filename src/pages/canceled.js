import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/shared/Layout'
import Button from '../components/shared/Button'
import Heading from '../components/Heading'

const Canceled = () => {
	const [sales, setSales] = React.useState(false)

	React.useEffect(() => {
		setSales(localStorage.getItem('isSales'))
	}, [])
	return (
		<Layout>
			<div
				className={
					sales
						? 'pt-[230px] bg-neutral-200 lg:mt-[100px] flex flex-col items-center'
						: 'pt-[150px] bg-neutral-200 lg:mt-[100px] flex flex-col items-center'
				}>
				<Heading>payment failed</Heading>
				<div className="my-5">
					<span className="font-semibold text-red-800">
						Payment was not successful
					</span>
				</div>
				<Link className="mb-10" to="/">
					<Button>Continue Shopping</Button>
				</Link>
			</div>
		</Layout>
	)
}

export default Canceled
