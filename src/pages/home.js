import React from 'react'
import axios from 'axios'
import Layout from '../components/shared/Layout'
import Card from '../components/Card'
import ProductDetails from '../components/ProductDetails'
import { Helmet } from 'react-helmet'

const Home = function () {
	const [prod, setShowProduct] = React.useState(false)
	const [fetchAllBeads, setFetchAllBeads] = React.useState([])
	const [fetchAllHair, setFetchAllHair] = React.useState([])
	const [singleProduct, setSingleProduct] = React.useState([])
	const [lastLength, setLastLength] = React.useState(8)
	const filterList = [
		{ id: '1', name: 'Default sorting' },
		{ id: '2', name: 'type 1' },
		{ id: '3', name: 'type 2' },
	]

	async function fetchProducts() {
		try {
			const {
				data: { products },
			} = await axios.get('/api/v1/products')
			setFetchAllBeads(products.filter((b) => b.type.toLowerCase() === 'beads'))
			setFetchAllHair(products.filter((b) => b.type.toLowerCase() === 'braids'))
		} catch (error) {
			console.log(error)
		}
	}

	React.useEffect(() => {
		fetchProducts()
	}, [])

	const scrollToTop = function scrollToTop() {
		window.scrollTo(0, 0)
	}

	const Beauties = () => {
		return (
			<div>
				<div>
					{fetchAllHair && (
						<div className="text-cyan-900 ml-[30px] xl:ml-[100px] mt-10 font-bold">
							<span>Hair and Extensions</span>
						</div>
					)}
					<div className="w-full justify-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{fetchAllHair.slice(0, lastLength).map((product) => (
							<div
								key={product._id}
								className="px-2 mb-5 justify-center items-center flex flex-row">
								<Card
									key={product._id}
									product={product}
									setSingleproduct={setSingleProduct}
									scrollToTop={scrollToTop}
								/>
							</div>
						))}
					</div>
				</div>
				<div>
					{fetchAllBeads && (
						<div className="text-cyan-900 ml-[30px] xl:ml-[100px] mt-10 font-bold">
							<span>Beads and Accessories</span>
						</div>
					)}
					<div className="w-full justify-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
						{fetchAllBeads.slice(0, lastLength).map((product) => (
							<div
								key={product._id}
								className="px-2 mb-5 justify-center items-center flex flex-row">
								<Card
									key={product._id}
									product={product}
									setSingleproduct={setSingleProduct}
									scrollToTop={scrollToTop}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	}

	React.useEffect(() => {
		setTimeout(() => {
			setShowProduct(true)
		}, 2000)
	}, [])

	return (
		<>
			<Helmet>
				<title>Home</title>
			</Helmet>

			<Layout>
				<div className="w-[100%]">
					<div className="bg-yellow-500 p-10 rounded-[30px] h-[250px]">
						<div className="flex flex-col md:flex-row justify-between items-center">
							<span className="text-xs flex-[0.45] text-white mb-5 md:mb-0">
								Home<span className="text-black font-bold"> / Shop</span>
							</span>
							<div className="flex-[0.55] flex justify-between items-center">
								<div className="hidden md:inline">
									<span className="font-bold mr-28 md:mr-0 text-xl">Shop</span>
								</div>
								<div className="flex h-[30px] items-center">
									{/* <span className="text-xs mr-3">
									Showing 1 - {lastLength} of {fetchAllBeads.length} results
								</span> */}
									<select
										className="mt-3 bg-yellow-100 text-black px-2 w-[120px] border border-gray-100 rounded-md text-xs shadow-sm placeholder-gray-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 outline-0 mb-3"
										// onChange={handleOnChange}
										id="length"
										// value={bundles.length}
										name="length">
										{filterList.map((options) => (
											<option key={options.id}>{options.name}</option>
										))}
									</select>
								</div>
							</div>
						</div>
					</div>
					<div className="md:mt-[-210px] mt-[-130px] md:p-10 w-full pb-1">
						{singleProduct.length !== 0 && (
							<div>
								<ProductDetails
									singleProduct={singleProduct}
									setSingleProduct={setSingleProduct}
								/>
							</div>
						)}
						{fetchAllBeads && fetchAllHair && prod ? (
							<Beauties />
						) : (
							<div className="text-center my-10 text-xs text-neutral-50">
								Loading Extensions...
							</div>
						)}
					</div>
					{/* {fetchAllBeads && lastLength !== fetchAllBeads.length && (
					<div
						onClick={() => {
							if (lastLength !== fetchAllBeads.length) {
								setLastLength(lastLength + 4)
							}
						}}
						className="text-sm text-blue-800 font-bold text-center mb-5 hover:cursor-pointer hover:text-blue-500">
						Load More
					</div>
				)} */}
				</div>
			</Layout>
		</>
	)
}

export default Home
