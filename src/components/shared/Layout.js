import Footer from '../Footer'
import Nav from '../Nav'

function Layout({ children }) {
	return (
		<div className="my-[50px] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-50 xl:w-[90%] lg:w-[90%] md:w-[100%] mx-auto justify-center border-2 border-slate-200 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] rounded-[30px] lg:p-6">
			<div className="pt-6 pb-2 px-6 lg:p-0">
				<Nav />
			</div>
			<div className="px-6 lg:p-0 my-[10px]">{children}</div>
			<div>
				<Footer />
			</div>
		</div>
	)
}

export default Layout
