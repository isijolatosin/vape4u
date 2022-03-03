import React from 'react'
import Layout from '../components/shared/Layout'
import Card from '../components/Card'
import PenDetails from '../components/PenDetails'

const Shop = function () {
	const [singlePen, setSinglePen] = React.useState([])
	const [lastLength, setLastLength] = React.useState(8)
	const filterList = [
		{ id: '1', name: 'Default sorting' },
		{ id: '2', name: 'type 1' },
		{ id: '3', name: 'type 2' },
	]

	const products = [
		{
			id: 1,
			name: 'Disposable Vape Pen - 0.3ml',
			url: 'https://popeyesextractions.com/wp-content/uploads/2020/11/disposable-vape-pen.png',
			price: 245,
			desc: "Nike's Air Force 1s were among the most popular sneakers this year.",
		},
		{
			id: 2,
			name: 'G Pen Vaporizer',
			url: 'https://www.kindpng.com/picc/m/186-1868726_png-image-of-g-pen-vaporizer-by-vaporizerblog.png',
			price: 295,
			desc: "Nike's Air Force 1s were among the most popular sneakers this year.",
		},
		{
			id: 3,
			name: 'Purple Vape Pen ',
			url: 'https://www.pngkit.com/png/detail/115-1151683_vape-pen-png-vector-library-purple-vape-pen.png',
			price: 320,
			desc: "Nike's Air Force 1s were among the most popular sneakers this year.",
		},
		{
			id: 4,
			name: 'Ccell Disposable Vape Pen ',
			url: 'https://www.nicepng.com/png/detail/876-8760414_ds0103-ccell-disposable-vape-pen.png',
			price: 420,
			desc: "Nike's Air Force 1s were among the most popular sneakers this year.",
		},
		{
			id: 5,
			name: 'Disposable Vape Pen - 0.3ml',
			url: 'https://www.seekpng.com/png/detail/115-1151744_vape-pen-22-light-edition.png',
			price: 245,
			desc: "Nike's Air Force 1s were among the most popular sneakers this year.",
		},
		{
			id: 6,
			name: 'G Pen Vaporizer',
			url: 'https://www.pngkey.com/png/detail/115-1151668_vape-pen-png-picture-library-library-smok-vape.png',
			price: 295,
			desc: "Nike's Air Force 1s were among the most popular sneakers this year.",
		},
		{
			id: 7,
			name: 'Purple Vape Pen ',
			url: 'https://www.pngkey.com/png/detail/71-713000_vape-pen-and-box-trulieve-pen.png',
			price: 320,
			desc: "Nike's Air Force 1s were among the most popular sneakers this year.",
		},
		{
			id: 8,
			name: 'Ccell Disposable Vape Pen ',
			url: 'https://cdn.shopify.com/s/files/1/0070/8286/8772/products/crush-grape-sirius_600x.png?v=1625004673',
			price: 420,
			desc: "Nike's Air Force 1s were among the most popular sneakers this year.",
		},
		{
			id: 9,
			name: 'Disposable Vape Pen - 0.3ml',
			url: 'https://popeyesextractions.com/wp-content/uploads/2020/11/disposable-vape-pen.png',
			price: 245,
			desc: "Nike's Air Force 1s were among the most popular sneakers this year.",
		},
		{
			id: 10,
			name: 'G Pen Vaporizer',
			url: 'https://www.kindpng.com/picc/m/186-1868726_png-image-of-g-pen-vaporizer-by-vaporizerblog.png',
			price: 295,
			desc: "Nike's Air Force 1s were among the most popular sneakers this year.",
		},
		{
			id: 11,
			name: 'Purple Vape Pen ',
			url: 'https://www.pngkit.com/png/detail/115-1151683_vape-pen-png-vector-library-purple-vape-pen.png',
			price: 320,
			desc: "Nike's Air Force 1s were among the most popular sneakers this year.",
		},
		{
			id: 12,
			name: 'Ccell Disposable Vape Pen ',
			url: 'https://www.nicepng.com/png/detail/876-8760414_ds0103-ccell-disposable-vape-pen.png',
			price: 420,
			desc: "Nike's Air Force 1s were among the most popular sneakers this year.",
		},
		{
			id: 13,
			name: 'Disposable Vape Pen - 0.3ml',
			url: 'https://www.seekpng.com/png/detail/115-1151744_vape-pen-22-light-edition.png',
			price: 245,
			desc: "Nike's Air Force 1s were among the most popular sneakers this year.",
		},
		{
			id: 14,
			name: 'G Pen Vaporizer',
			url: 'https://www.pngkey.com/png/detail/115-1151668_vape-pen-png-picture-library-library-smok-vape.png',
			price: 295,
			desc: "Nike's Air Force 1s were among the most popular sneakers this year.",
		},
		{
			id: 15,
			name: 'Purple Vape Pen ',
			url: 'https://www.pngkey.com/png/detail/71-713000_vape-pen-and-box-trulieve-pen.png',
			price: 320,
			desc: "Nike's Air Force 1s were among the most popular sneakers this year.",
		},
		{
			id: 16,
			name: 'Ccell Disposable Vape Pen ',
			url: 'https://cdn.shopify.com/s/files/1/0070/8286/8772/products/crush-grape-sirius_600x.png?v=1625004673',
			price: 420,
			desc: "Nike's Air Force 1s were among the most popular sneakers this year.",
		},
	]
	const scrollToTop = function scrollToTop() {
		window.scrollTo(0, 0)
	}

	return (
		<Layout>
			<div className="w-[100%]">
				<div className="bg-yellow-500 p-10 rounded-[30px] h-[250px]">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<span className="text-xs flex-[0.45] text-white mb-2 md:mb-0">
							Home<span className="text-black font-bold"> / Shop</span>
						</span>
						<div className="flex-[0.55] flex justify-between items-center">
							<div className="">
								<span className="font-bold mr-28 md:mr-0 text-xl">Shop</span>
							</div>
							<div className="flex h-[30px] items-center">
								<span className="text-xs mr-3">
									Showing 1 - {lastLength} of {products.length} results
								</span>
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
				<div className="md:mt-[-210px] mt-[-180px]  p-10 pb-1">
					{singlePen.length !== 0 && (
						<div>
							<PenDetails singlePen={singlePen} />
						</div>
					)}
					<div className="w-full justify-center grid md:grid-cols-3 lg:grid-cols-4 ">
						{products.slice(0, lastLength).map((pen) => (
							<div
								key={pen.id}
								className="px-2 mb-5 justify-center items-center flex flex-row">
								<Card
									key={pen.id}
									pen={pen}
									setSinglePen={setSinglePen}
									scrollToTop={scrollToTop}
								/>
							</div>
						))}
					</div>
				</div>
				{lastLength !== products.length && (
					<div
						onClick={() => {
							if (lastLength !== products.length) {
								setLastLength(lastLength + 4)
							}
						}}
						className="text-sm text-blue-800 font-bold text-center mb-5 hover:cursor-pointer hover:text-blue-500">
						Load More
					</div>
				)}
			</div>
		</Layout>
	)
}

export default Shop
