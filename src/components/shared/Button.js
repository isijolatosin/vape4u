function Button(props) {
	return (
		<button
			onClick={props.handleFunc}
			type={props.type}
			className="bg-black text-xs text-yellow-500 py-2 max-w-[120px] rounded-xl mt-5 font-light hover:bg-gray-600 ease-in duration-300 shadow-xl shadow-neutral-700">
			{props.children}
		</button>
	)
}
export default Button