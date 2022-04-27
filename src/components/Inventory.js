import React from 'react'
import axios from 'axios'
import InventoryForm from './InventoryForm'

function Inventory() {
	const [isTrueSales, setIsTrueSales] = React.useState(false)
	const [isTrueInstock, setIsTrueInstock] = React.useState(false)
	const [postError, setPostError] = React.useState('')
	const [formData, setFormData] = React.useState({
		title: '',
		type: '',
		color: '',
		price: '',
		length: '',
		description: '',
	})
	const [imageFile, setImageFile] = React.useState('')

	const handleformDataChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const toggleSales = () => {
		setIsTrueSales(!isTrueSales)
	}
	const toggleInstock = () => {
		setIsTrueInstock(!isTrueInstock)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const product = {
				name: formData.title,
				type: formData.type,
				color: formData.color,
				price: formData.price,
				length: formData.length,
				description: formData.description,
				sales: isTrueSales,
				instock: isTrueInstock,
				image: imageFile,
			}
			await axios.post('/api/v1/products', product)
		} catch (error) {
			setPostError(error.message)
			console.log(error)
		}

		setFormData({
			title: '',
			type: '',
			color: '',
			price: '',
			length: '',
			description: '',
		})
		setIsTrueSales(false)
	}

	const inputTypes = [
		{
			id: '1',
			name: 'title',
			type: 'text',
			value: formData.title,
			placeholder: 'Product Name...',
		},
		{
			id: '2',
			name: 'type',
			type: 'text',
			value: formData.type,
			placeholder: 'Product Type...',
		},
		{
			id: '3',
			name: 'color',
			type: 'text',
			value: formData.color,
			placeholder: 'Product Color...',
		},
		{
			id: '5',
			name: 'length',
			type: 'number',
			value: formData.length,
			placeholder: 'Length...',
		},
		{
			id: '7',
			name: 'price',
			type: 'number',
			value: formData.price,
			placeholder: 'Price CA($)...',
		},
	]

	const uploadFile = async (e) => {
		const imageFile = e.target.files[0]
		const formData = new FormData()
		formData.append('image', imageFile)
		try {
			const {
				data: {
					image: { src },
				},
			} = await axios.post('/api/v1/products/uploads', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			setImageFile(src)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<InventoryForm
			handleSubmit={handleSubmit}
			inputTypes={inputTypes}
			handleformDataChange={handleformDataChange}
			formData={formData}
			isTrueSales={isTrueSales}
			isTrueInstock={isTrueInstock}
			toggleSales={toggleSales}
			toggleInstock={toggleInstock}
			postError={postError}
			buttonText="Add to Inventory"
			uploadFile={uploadFile}
		/>
	)
}

export default Inventory
