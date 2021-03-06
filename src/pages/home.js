import React, { useContext } from 'react'
import axios from 'axios'
import Layout from '../components/shared/Layout'
import Card from '../components/Card'
import ProductDetails from '../components/ProductDetails'
import { Helmet } from 'react-helmet'
import { BiUpArrowAlt } from 'react-icons/bi'
import { VscChromeClose } from 'react-icons/vsc'
import { db } from '../firebase'
import { AUTHORIZED_ID } from '../constant'
import { UserContext } from '../context/user-context'

const Home = function () {
	const { user } = useContext(UserContext)
	const [prod, setShowProduct] = React.useState(false)
	const [showVisit, setShowVisit] = React.useState(false)
	const [index, setIndex] = React.useState(0)
	const [noOfVisits, setNoOfVisits] = React.useState(0)
	const [fetchAllBeads, setFetchAllBeads] = React.useState([])
	const [fetchAllHair, setFetchAllHair] = React.useState([])
	const [singleProduct, setSingleProduct] = React.useState([])
	const [showCaution, setShowCaution] = React.useState(false)
	const [selectedProduct, setSelectedProduct] = React.useState('')
	const [showTopBtn, setShowTopBtn] = React.useState(false)
	const filterList = [
		{
			id: '2',
			filterName: 'Hair & Extensions',
			name: 'Hair',
			src: require('../assets/hair.jpeg'),
		},
		{
			id: '3',
			filterName: 'Handmade Beads',
			name: 'Beads',
			src: require('../assets/bead.jpeg'),
		},
	]

	async function fetchProducts() {
		try {
			const {
				data: { products },
			} = await axios.get('/api/v1/products')
			setTimeout(() => {
				setFetchAllBeads(
					products.filter(
						(b) =>
							b.type.toLowerCase().includes('bead') ||
							b.type.toLowerCase().includes('gold plated')
					)
				)
				setFetchAllHair(
					products.filter((b) => b.type.toLowerCase().includes('braid'))
				)
			}, 1900)
		} catch (error) {
			console.log(error)
		}
	}

	function getVisits() {
		var xhr = new XMLHttpRequest()
		xhr.open('GET', 'https://api.countapi.xyz/hit/pvginternational-s.com/pvg') // change the ext before working in dev env
		xhr.responseType = 'json'
		xhr.onload = function () {
			db.collection('admin')
				.doc(`${AUTHORIZED_ID.id_one}/`)
				.collection('visits')
				.doc('pvg1234')
				.update({
					visits: this.response.value,
				})
		}
		xhr.send()

		setShowVisit(false)
	}

	React.useEffect(() => {
		fetchProducts()

		db.collection('admin')
			.doc(`${AUTHORIZED_ID.id_one}/`)
			.collection('visits')
			.onSnapshot((snapshot) => {
				const results = snapshot.docs.map((doc) => ({
					data: doc.data(),
				}))
				// console.log(results)
				if (results) {
					const data = {
						visits: results[results.length - 1].data.visits,
					}
					setNoOfVisits(data)
					// console.log(data)
				}
			})

		setTimeout(function () {
			setShowVisit(true)
		}, 10000)
	}, [])

	const scrollToTop = function scrollToTop() {
		window.scrollTo(0, 0)
	}

	const handlePickProduct = (val) => {
		setSelectedProduct(val)
	}

	const Beauties = () => {
		return (
			<div className="mt-[-40px]">
				<div className=" pb-5">
					{fetchAllHair.length > 1 && (
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
					{fetchAllBeads.length > 1 && (
						<div className="border-t-[1px] pt-5 mt-5">
							<span className="text-gray-500 ml-[30px] xl:ml-[100px] mt-2 font-normal">
								Beads and Accessories
							</span>
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
				<div className="border-b-[1px] pb-5 overflow-y-scroll">
					{fetchAllHair.length > 1 && (
						<div className="text-gray-700 ml-[30px] xl:ml-[100px] mt-10 md:mt-0 font-normal">
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
					{fetchAllBeads.length > 1 && (
						<div className="text-gray-500 ml-[30px] xl:ml-[100px] mt-10 md:mt-0 font-normal">
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

		window.addEventListener('scroll', () => {
			if (window.scrollY > 900) {
				setShowTopBtn(true)
			} else {
				setShowTopBtn(false)
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [window.scrollY])

	const goToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	return (
		<>
			<Helmet>
				<title>PVG</title>
			</Helmet>

			<Layout>
				<div className="relative w-[100%]">
					{showVisit && (
						<div className="absolute flex items-center justify-between px-10 text-neutral-100 w-full md:w-[55%] h-[700px] md:h-[300px] md:right-[22%] md:top-[250px] bg-blur2 z-50 md:mt-[-50px] rounded-lg">
							Thank you for choosing PVG Internationals
							<VscChromeClose
								onClick={getVisits}
								size={35}
								className="border-[1px] p-2 rounded-full hover:text-neutral-500 hover:border-neutral-500 ease duration-300 hover:cursor-pointer"
							/>
						</div>
					)}
					{showTopBtn && (
						<div>
							<BiUpArrowAlt
								onClick={goToTop}
								className="scrollToTopBtn z-100 absolute bottom-[-45px] right-0"
							/>
						</div>
					)}
					{(user?.email === AUTHORIZED_ID.id_one ||
						user?.email === AUTHORIZED_ID.id_two) && (
						<p className="text-xs text-center mb-2 text-green-700">
							Number of Visits: {noOfVisits?.visits}
						</p>
					)}
					<div className="bg-yellow-500 p-5 rounded-[30px] h-[250px]">
						<div className="flex flex-row justify-between items-center bg-neutral-700 h-[60px] px-2 rounded-lg">
							<span className="text-xs mt-5 md:mt-0 md:flex-[0.45] text-white mb-5 pl-2 md:mb-0">
								Home<span className="text-black font-bold"> / Shop</span>
							</span>
							<div className="md:flex-[0.55] md:flex md:justify-between">
								<div className="hidden md:inline">
									<span className="font-bold mr-28 text-gray-400 md:mr-0 text-xl">
										PVG
										<span className="text-xs font-normal">
											{' '}
											International-s
										</span>
									</span>
								</div>
								<div className="flex flex-row items-center justify-between w-[200px] mr-2">
									<span
										onClick={() => setSelectedProduct('')}
										className="text-xs hover:cursor-pointer navStyleChild ease-in duration-300 hover:opacity-[0.5] text-white">
										Reset Categories
									</span>
									{filterList.map((item) => (
										<div
											key={item.id}
											onClick={() => handlePickProduct(item?.filterName)}
											className="flex justify-center flex-col items-center hover:cursor-pointer ease-in duration-300 navStyleChild">
											<img
												id={item.id}
												src={item?.src}
												alt={item.id}
												className="w-[30px] h-[30px] rounded-full"
											/>
											<span className="text-[10px] ease-in duration-300 hover:underline text-white">
												{item.name}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className=" mt-[-200px] mb-[50px] md:p-10 w-full pb-1">
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
							selectedProduct !== '' ? (
								<FilteredByProduct />
							) : (
								<Beauties />
							)
						) : (
							<div className="tw-rounded-full mt-10 progress">
								<div className="inner"></div>
							</div>
						)}
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Home
