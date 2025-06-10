import { useState } from 'react'
import Button from '../components/base/Button'

interface Props {
	className?: string
}

function MainPage(props: Props) {
	return (
		<>
			<div className={props.className + " p-4"}>
				<Button text="Add job" variant="primary" />
			</div>
		</>
	)
}

export default MainPage
