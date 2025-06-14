import './App.css'
import { useState } from 'react'
import MainPage from './pages/MainPage'
import Navbar from './components/navigation/Navbar'
import Sidebar from './components/navigation/Sidebar'

function App() {
	return (
		<>
			<div className='h-screen bg-base flex flex-col'>
				<Navbar />
				<div className="flex h-full">
					<Sidebar />
					<MainPage />
				</div>
			</div>
		</>
	)
}

export default App
