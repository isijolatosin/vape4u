import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Shop from './pages/shop'
import NotFound from './pages/error'
import Checkout from './pages/checkout'
import Management from './pages/management'
import Login from './pages/login'
import Register from './pages/register'

function App() {
	return (
		<Routes>
			<Route exact path="/checkout" element={<Checkout />} />
			<Route exact path="/shop" element={<Shop />} />
			<Route exact path="/management" element={<Management />} />
			<Route exact path="/sign-in" element={<Login />} />
			<Route exact path="/sign-up" element={<Register />} />
			<Route exact path="*" element={<NotFound />} />
			<Route exact path="/" element={<Home />} />
		</Routes>
	)
}

export default App
