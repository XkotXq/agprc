export default function ScrollerAnim({ children }) {
	return (
		<>
			<span className="group-hover/link:-translate-y-full group-data-[state=open]/link:-translate-y-full transition-transform px-2 duration-500 flex flex-row justify-center items-center">
				{children}
			</span>
			<span className="group-hover/link:-translate-y-full group-data-[state=open]/link:-translate-y-full transition-transform px-2 duration-500 underline flex flex-row justify-center items-center">
				{children}
			</span>
		</>
	);
}
