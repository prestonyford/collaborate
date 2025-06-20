import { type MouseEventHandler } from 'react'

interface Props {
	icon: string
	onClick?: MouseEventHandler
}

function ClickyIcon({icon, onClick}: Props) {
	
	return (
		<>
			<div className='w-[24px] cursor-pointer flex justify-center items-center hover:shadow-sm dark:hover:bg-[rgb(40,40,40)] rounded-md text-lg' onClick={onClick}>
				<i className={icon}></i>
			</div>
		</>
	)
}

export default ClickyIcon
