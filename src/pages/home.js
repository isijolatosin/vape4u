import React from 'react'
import axios from 'axios'
import Layout from '../components/shared/Layout'
import Card from '../components/Card'
import ProductDetails from '../components/ProductDetails'
import { Helmet } from 'react-helmet'

const Home = function () {
	const [prod, setShowProduct] = React.useState(false)
	const [index, setIndex] = React.useState(0)
	const [fetchAllBeads, setFetchAllBeads] = React.useState([])
	const [fetchAllHair, setFetchAllHair] = React.useState([])
	const [singleProduct, setSingleProduct] = React.useState([])
	const [showCaution, setShowCaution] = React.useState(false)
	const [selectedProduct, setSelectedProduct] = React.useState(
		'Filter Products by Categories'
	)
	const filterList = [
		{ id: '1', name: 'Filter Products by Categories' },
		{ id: '2', name: 'Handmade Beads' },
		{ id: '3', name: 'Hair & Extensions' },
	]

	async function fetchProducts() {
		try {
			const {
				data: { products },
			} = await axios.get('/api/v1/products')
			setTimeout(() => {
				setFetchAllBeads(
					products.filter((b) => b.type.toLowerCase().includes('bead'))
				)
				setFetchAllHair(
					products.filter((b) => b.type.toLowerCase().includes('braid'))
				)
			}, 1900)
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

	const handlePickProduct = (e) => {
		setSelectedProduct(e.target.value)
	}

	const Beauties = () => {
		return (
			<div className="mt-[-40px]">
				<div className="border-b-[1px] pb-5">
					{fetchAllHair && (
						<div className="text-gray-700 ml-[30px] xl:ml-[100px] mt-10 font-normal">
							<span>Hair and Extensions</span>
						</div>
					)}
					<div className="w-full justify-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{fetchAllHair.map((product) => (
							<div
								key={product._id}
								className="px-2 mb-5 justify-center items-center flex flex-row">
								<Card
									key={product._id}
									product={product}
									setSingleproduct={setSingleProduct}
									scrollToTop={scrollToTop}
									setIndex={setIndex}
									setShowCaution={setShowCaution}
									showCaution={showCaution}
								/>
							</div>
						))}
					</div>
				</div>
				<div>
					{fetchAllBeads && (
						<div className="text-gray-500 ml-[30px] xl:ml-[100px] mt-2 font-normal">
							<span>Beads and Accessories</span>
						</div>
					)}
					<div className="w-full justify-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
						{fetchAllBeads.map((product) => (
							<div
								key={product._id}
								className="px-2 mb-5 justify-center items-center flex flex-row">
								<Card
									key={product._id}
									product={product}
									setSingleproduct={setSingleProduct}
									scrollToTop={scrollToTop}
									setIndex={setIndex}
									setShowCaution={setShowCaution}
									showCaution={showCaution}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	}

	const FilteredByProduct = () => {
		return (
			selectedProduct !== 'Filter Products by Categories' &&
			(selectedProduct === 'Hair & Extensions' ? (
				<div className="border-b-[1px] pb-5">
					{fetchAllHair && (
						<div className="text-gray-700 ml-[30px] xl:ml-[100px] mt-10 font-normal">
							<span>Hair and Extensions</span>
						</div>
					)}
					<div className="w-full justify-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{fetchAllHair.map((product) => (
							<div
								key={product._id}
								className="px-2 mb-5 justify-center items-center flex flex-row">
								<Card
									key={product._id}
									product={product}
									setSingleproduct={setSingleProduct}
									scrollToTop={scrollToTop}
									setIndex={setIndex}
									setShowCaution={setShowCaution}
									showCaution={showCaution}
								/>
							</div>
						))}
					</div>
				</div>
			) : (
				<div>
					{fetchAllBeads && (
						<div className="text-gray-500 ml-[30px] xl:ml-[100px] mt-10 font-normal">
							<span>Beads and Accessories</span>
						</div>
					)}
					<div className="w-full justify-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
						{fetchAllBeads.map((product) => (
							<div
								key={product._id}
								className="px-2 mb-5 justify-center items-center flex flex-row">
								<Card
									key={product._id}
									product={product}
									setSingleproduct={setSingleProduct}
									scrollToTop={scrollToTop}
									setIndex={setIndex}
									setShowCaution={setShowCaution}
									showCaution={showCaution}
								/>
							</div>
						))}
					</div>
				</div>
			))
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
					<div className="bg-yellow-500 p-5 rounded-[30px] h-[250px]">
						<div className="flex flex-row justify-between items-center">
							<span className="text-xs mt-3 md:mt-0 md:flex-[0.45] text-white mb-5 pl-2 md:mb-0">
								Home<span className="text-black font-bold"> / Shop</span>
							</span>
							<div className="md:flex-[0.55] md:flex md:justify-between">
								<div className="hidden md:inline">
									<span className="font-bold mr-28 md:mr-0 text-xl">Shop</span>
								</div>
								<div className="h-[30px] items-center">
									{/* <span className="text-xs mr-3">
									Showing 1 - {lastLength} of {fetchAllBeads.length} results
								</span> */}
									<select
										name="selectedProduct"
										id="selectedProduct"
										value={selectedProduct}
										onChange={handlePickProduct}
										className="bg-yellow-100 text-gray-500 font-light px-2 w-[200px] border border-gray-100 rounded-md text-xs shadow-sm placeholder-gray-200 focus:outline-none focus:border-gray-50 focus:ring-1 focus:ring-gray-50 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 outline-0">
										{filterList.map((options) => (
											<option key={options.id}>{options.name}</option>
										))}
									</select>
								</div>
							</div>
						</div>
					</div>
					<div className="md:mt-[-230px] mt-[-200px] mb-[50px] md:p-10 w-full pb-1">
						{singleProduct.length !== 0 && (
							<div>
								<ProductDetails
									index={index}
									setIndex={setIndex}
									singleProduct={singleProduct}
									setSingleProduct={setSingleProduct}
									setShowCaution={setShowCaution}
									showCaution={showCaution}
								/>
							</div>
						)}
						{fetchAllBeads && fetchAllHair && prod ? (
							selectedProduct !== 'Filter Products by Categories' ? (
								<FilteredByProduct />
							) : (
								<Beauties />
							)
						) : (
							<div className="scanner">
								<h1>Fetching PVG data...</h1>
							</div>
						)}
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Home
