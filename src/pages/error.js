import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { AiOutlineRollback } from 'react-icons/ai'
import Button from '../components/shared/Button'
import Layout from '../components/shared/Layout'
import CursorText from '../components/shared/CursorText'

function NotFound() {
	const [showText, setShowText] = React.useState(false)
	const handleShow = () => {
		!showText && setShowText(true)
	}
	const handleHide = () => {
		setShowText(false)
	}
	return (
		<>
			<Helmet>
				<title>Error Page</title>
			</Helmet>
			<Layout>
				<div className="flex flex-col items-center my-[100px] rounded-lg w-[90%] md:w-[60%] xl:w-[40%] p-10 text-center mx-auto shadow-2xl bg-neutral-200">
					<h1 className="text-3xl font-bold text-red-900">404</h1>
					<p className="text-neutral-600 mt-2 font-light">
						The page you are about to access does not exist
					</p>
					<div
						onMouseOver={handleShow}
						onMouseOut={handleHide}
						className="flex flex-col mt-6 relative">
						<Link to="/">
							<Button>
								<AiOutlineRollback className="text-lg" />
							</Button>
						</Link>
						<CursorText showText={showText}>Back to Home</CursorText>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default NotFound
