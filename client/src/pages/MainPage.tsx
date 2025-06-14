import { useState } from 'react'
import Button from '../components/base/Button'

interface Props {
	
}

function MainPage(props: Props) {
	return (
		<>
			<div className="grow p-normal">
				<Button text="Add" variant="primary" />
			</div>
		</>
	)
}

export default MainPage
