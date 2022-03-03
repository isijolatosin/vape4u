import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cartItems', 'itemCount', 'total'],
}

const initialState = {
	cartItems: [],
	itemCount: 0,
	total: 0,
	bookingObject: '',
}

export const appSlices = createSlice({
	name: 'app',
	initialState,
	reducers: {
		// Add item
		addToCartItem: (state, action) => {
			// check if item is in the cart
			if (!state.cartItems.find((item) => item.id === action.payload.id)) {
				state.cartItems.push({
					...action.payload,
					quantity: 1,
				})
			}

			state.itemCount = state.cartItems.reduce(
				(total, prod) => total + prod.quantity,
				0
			)
			state.total = state.cartItems.reduce(
				(total, prod) => total + prod.price * prod.quantity,
				0
			)
		},

		// Increase Item
		increaseCartItem: (state, action) => {
			const increaseIndex = state.cartItems.findIndex(
				(item) => item.id === action.payload.id
			)

			state.cartItems[increaseIndex].quantity++

			state.itemCount = state.cartItems.reduce(
				(total, prod) => total + prod.quantity,
				0
			)
			state.total = state.cartItems.reduce(
				(total, prod) => total + prod.price * prod.quantity,
				0
			)
		},

		// Decrease Item
		decreaseCartItem: (state, action) => {
			const decreaseIndex = state.cartItems.findIndex(
				(item) => item.id === action.payload.id
			)
			const product = state.cartItems[decreaseIndex]
			if (product.quantity > 1) {
				product.quantity--
			}
			state.itemCount = state.cartItems.reduce(
				(total, prod) => total + prod.quantity,
				0
			)
			state.total = state.cartItems.reduce(
				(total, prod) => total + prod.price * prod.quantity,
				0
			)
		},

		// Remove Item
		removeCartItem: (state, action) => {
			const newCartItems = state.cartItems.filter(
				(item) => item.id !== action.payload.id
			)

			state.cartItems = [...newCartItems]

			state.itemCount = state.cartItems.reduce(
				(total, prod) => total + prod.quantity,
				0
			)
			state.total = state.cartItems.reduce(
				(total, prod) => total + prod.price * prod.quantity,
				0
			)
		},

		// Clear CartItems
		clearCartItem: (state) => {
			state.cartItems = []
			state.itemCount = 0
			state.total = 0
		},
		setBookingObject: (state, action) => {
			state.bookingObject = action.payload
		},
	},
})

export const {
	addToCartItem,
	increaseCartItem,
	decreaseCartItem,
	removeCartItem,
	clearCartItem,
	setBookingObject,
} = appSlices.actions

// Selectors
export const selectCartItems = (state) => state.app.cartItems
export const selectItemCount = (state) => state.app.itemCount
export const selectTotal = (state) => state.app.total
export const selectBookingObject = (state) => state.app.bookingObject

const rootReducer = appSlices.reducer

export default persistReducer(persistConfig, rootReducer)
