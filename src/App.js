import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Shop from './pages/shop'
import Checkout from './pages/checkout'

function App() {
	return (
		<Routes>
			<Route exact path="/checkout" element={<Checkout />} />
			<Route exact path="/shop" element={<Shop />} />
			<Route exact path="/" element={<Home />} />
		</Routes>
	)
}

export default App
