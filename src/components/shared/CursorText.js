function CursorText({ showText, id, children, commonId }) {
	return (
		<span
			id={id}
			className={
				'absolute bottom-[-50px] flex flex-row text-center px-2 py-[2px] text-[10px] font-bold mt-2 bg-zinc-100 rounded text-slate-800 ease-in duration-300' +
				(commonId === id && showText ? ' opacity-60' : ' opacity-0')
			}>
			{children}
		</span>
	)
}

export default CursorText
