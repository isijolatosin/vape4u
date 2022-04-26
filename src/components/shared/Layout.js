import Footer from '../Footer'
import Nav from '../Nav'

function Layout({ children }) {
	return (
		<div className="w-[95%] my-[10px] bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100 2xl:w-[65%] xl:w-[80%] lg:w-[95%] md:w-[100%] mx-auto justify-center border-2 border-slate-200 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] rounded-[30px] lg:p-6">
			<div className="pt-6 pb-2 px-6 lg:p-0">
				<Nav />
			</div>
			<div className="lg:p-0 my-[10px]">{children}</div>
			<div>
				<Footer />
			</div>
		</div>
	)
}

export default Layout
