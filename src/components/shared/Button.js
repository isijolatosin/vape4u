function Button(props) {
	return (
		<button
			disabled={props.isDisabled}
			onClick={props.handleFunc}
			type={props.type}
			className={
				props.type === 'large'
					? 'bg-black text-xs text-yellow-500 py-2 max-w-[120px] px-5 rounded-xl mt-5 font-light hover:bg-gray-600 ease-in duration-300 shadow-xl shadow-neutral-700'
					: 'bg-black text-xs text-yellow-500 py-2 max-w-[120px] px-2 rounded-xl mt-5 font-light hover:bg-gray-600 ease-in duration-300 shadow-xl shadow-neutral-700'
			}>
			{props.children}
		</button>
	)
}
export default Button
