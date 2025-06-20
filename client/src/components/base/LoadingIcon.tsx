import clsx from 'clsx'
import { useState } from 'react'

interface Props {
	modal?: boolean
}

function LoadingIcon({ modal = false }: Props) {
	const spinner = <div><i className="fa-solid fa-spinner animate-spin"></i></div>;
	
	if (modal) {
		return (
			<div className='text-5xl fixed inset-0 w-screen h-screen bg-black/35 z-40 flex justify-center items-center'>
				{spinner}
			</div>
		)
	}
	return (
		<div className='w-full h-full flex justify-center items-center text-5xl'>
			{spinner}
		</div>
	)
}

export default LoadingIcon
