import Button from './shared/Button'

function InventoryForm({
	handleSubmit,
	inputTypes,
	handleformDataChange,
	formData,
	isTrueSales,
	isTrueInstock,
	toggleSales,
	toggleInstock,
	postError,
	buttonText,
	uploadFile,
}) {
	return (
		<form onSubmit={handleSubmit}>
			<div className="flex flex-col items-center">
				{inputTypes.map((inputType) => (
					<input
						key={inputType.id}
						type={inputType.type}
						name={inputType.name}
						id={inputType.id}
						value={inputType.value}
						onChange={handleformDataChange}
						placeholder={inputType.placeholder}
						className="rounded mt-1 block lg:w-[50%] mx-auto w-[90%] px-3 py-2 border-none text-sm shadow-xl placeholder-gray-400 focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-200 isabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 outline-0 mb-5 placeholder:font-light placeholder:text-xs text-gray-700 font-light"
					/>
				))}
				<textarea
					value={formData.description}
					name="description"
					onChange={handleformDataChange}
					rows={10}
					cols={50}
					placeholder="Description..."
					className="rounded mt-1 block lg:w-[50%] mx-auto w-[90%] px-3 py-2 border-none text-sm shadow-xl placeholder-gray-400 focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-200 isabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 outline-0 mb-5 placeholder:font-light placeholder:text-xs text-gray-700 font-light"
				/>
				<div className="text-cyan-900 text-sm ">
					<span>
						Rename Image and substitute space with a dash ( e.g abc-def )
					</span>
				</div>
				<div className="rounded flex flex-row items-center shadow-xl pl-3 py-2">
					<label className="mr-3 text-gray-500 text-sm">Image</label>
					<input
						type="file"
						onChange={uploadFile}
						className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:bg-gray-200 file:text-cyan-700 hover:file:bg-cyan-100 ease-in duration-300"
					/>
				</div>
				<div className="flex">
					<div className="rounded flex flex-row items-center mt-5 mr-10 shadow-xl p-2">
						<label className="mr-3 text-gray-500 text-sm">Sales</label>
						<input
							type="checkbox"
							checked={isTrueSales}
							className={
								isTrueSales
									? 'ml-2 rounded-full bg-cyan-400'
									: 'ml-2 rounded-full bg-none border-cyan-200'
							}
							onChange={toggleSales}
						/>
					</div>
					<div className="rounded flex flex-row items-center mt-5 shadow-xl p-2">
						<label className="mr-3 text-gray-500 text-sm">In stock</label>
						<input
							type="checkbox"
							checked={isTrueInstock}
							className={
								isTrueInstock
									? 'ml-2 rounded-full bg-cyan-400'
									: 'ml-2 rounded-full bg-none border-cyan-200'
							}
							onChange={toggleInstock}
						/>
					</div>
				</div>
				{postError && (
					<span className="text-xs text-red-700 mt-5">{`Error: ${postError}`}</span>
				)}
				<div className="my-10">
					<Button type="submit">{buttonText}</Button>
				</div>
			</div>
		</form>
	)
}

export default InventoryForm
