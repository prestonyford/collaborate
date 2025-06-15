import { useState } from 'react'
import LightDarkToggle from '../base/LightDarkToggle'

function Navbar() {
	return (
		<>
			<div className='h-12 bg-surface flex text-3xl items-center justify-between border-b border-accent'>
				{/* Left */}
				<div className='flex items-center h-full gap-2'>
					<div className="h-full hover:bg-surface-active transition-colors flex items-center px-3">
						<i className="fa-solid fa-bars "></i>
					</div>
					<div className='font-[Merriweather] select-none'>
						Taskboard
					</div>
				</div>

				{/* Right */}
				<div className='flex items-center h-full gap-2 mr-4'>
					<LightDarkToggle />
				</div>
			</div>
		</>
	)
}

export default Navbar
