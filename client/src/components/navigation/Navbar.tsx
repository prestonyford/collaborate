import { useState } from 'react'
import LightDarkToggle from '../base/LightDarkToggle'
import { useNavigate } from 'react-router-dom'
import ProfileIcon from './ProfileIcon'

function Navbar() {
	const navigate = useNavigate()
	return (
		<>
			<div className='min-h-[44px] bg-surface flex text-3xl items-center justify-between border-b border-accent'>
				{/* Left */}
				<div className='flex items-center h-full gap-2'>
					<div className="h-full hover:bg-surface-active transition-colors flex items-center px-3">
						<i className="fa-solid fa-bars "></i>
					</div>
					<div className='font-[Merriweather] select-none cursor-pointer' onClick={() => navigate('')}>
						Taskboard
					</div>
				</div>

				{/* Right */}
				<div className='flex items-center h-full gap-4 mr-4'>
					<LightDarkToggle />
					<ProfileIcon />
				</div>
			</div>
		</>
	)
}

export default Navbar
