import { useState } from 'react'

function Navbar() {
	return (
		<>
			<div className='h-12 bg-surface flex text-3xl items-center gap-2'>
				{/* Hamburger */}
				<div className="h-full hover:bg-surface-active transition-colors flex items-center px-3">
					<i className="fa-solid fa-bars "></i>
				</div>
				<div>
					Jobtracker
				</div>
			</div>
		</>
	)
}

export default Navbar
