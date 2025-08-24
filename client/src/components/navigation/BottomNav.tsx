import LightDarkToggle from '../base/LightDarkToggle'
import { useNavigate } from 'react-router-dom'
import ProfileIcon from './ProfileIcon'
import { useUserStore } from '../../userStore'

function BottomNav() {
	const navigate = useNavigate();
	return (
		<div className='h-[24px] bg-surface border-t border-accent flex justify-end items-center px-2'>
			<a className='text-sm text-text-muted underline cursor-pointer' href='https://github.com/prestonyford/collaborate' target='_blank'>
				GitHub Repository
			</a>
		</div>
	)
}

export default BottomNav
