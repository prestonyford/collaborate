interface Props {
	title: React.ReactNode
	children?: React.ReactNode
}

function Page(props: Props) {

	return (
		<>
			<div className="grow min-w-0 h-full overflow-auto">
				<div className="py-4 px-6 flex justify-between items-center">
					{props.title}
				</div>
				<div className='w-full h-[calc(100%-72px)]'>
					{props.children}
				</div>
			</div>
		</>
	)
}

export default Page
