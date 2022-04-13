import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Shop from './pages/shop'
import NotFound from './pages/error'
import Checkout from './pages/checkout'
import Management from './pages/management'

function App() {
	return (
		<Routes>
			<Route exact path="/checkout" element={<Checkout />} />
			<Route exact path="/shop" element={<Shop />} />
			<Route exact path="/management" element={<Management />} />
			<Route exact path="*" element={<NotFound />} />
			<Route exact path="/" element={<Home />} />
		</Routes>
	)
}

export default App
