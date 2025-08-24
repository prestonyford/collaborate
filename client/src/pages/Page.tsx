interface Props {
	title?: React.ReactNode
	children?: React.ReactNode
}

function Page(props: Props) {

	return (
		<>
			<div className="grow min-w-0 h-full overflow-auto flex flex-col">
				{props.title && <div className="py-4 px-6">
					{props.title}
				</div>}
				<div className='w-full flex flex-col grow'>
					{props.children}
				</div>
			</div>
		</>
	)
}

export default Page
