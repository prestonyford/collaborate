import { useState } from 'react'

interface Props {
	className?: string
}

function MainPage(props: Props) {
	return (
		<>
			<div className={props.className}>
			</div>
		</>
	)
}

export default MainPage
