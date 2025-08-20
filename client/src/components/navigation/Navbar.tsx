import { useState } from 'react'
import LightDarkToggle from '../base/LightDarkToggle'
import { useNavigate } from 'react-router-dom'
import ProfileIcon from './ProfileIcon'
import { useUserStore } from '../../userStore'

function Navbar() {
	const navigate = useNavigate()
	const me = useUserStore(state => state.me);
	
	return (
		<>
			<div className='min-h-[44px] bg-surface flex text-3xl items-center justify-between border-b border-accent'>
				{/* Left */}
				<div className='flex items-center h-full gap-2'>
					<div className="h-full hover:bg-surface-active transition-colors flex items-center px-3">
						<i className="fa-solid fa-bars "></i>
					</div>
					<div className='font-[Merriweather] select-none cursor-pointer' onClick={() => navigate('')}>
						Collaborate
					</div>
				</div>

				{/* Right */}
				<div className='flex items-center h-full gap-4 mr-4'>
					<LightDarkToggle />
					{me && <ProfileIcon />}
				</div>
			</div>
		</>
	)
}

export default Navbar
