import Sidebar from './components/navigation/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

function Layout() {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] h-full">
			<Sidebar className="hidden lg:block" />
			<Outlet />
		</div>
	);
}

export default Layout
