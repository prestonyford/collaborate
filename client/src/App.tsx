import './App.css'
import { useState } from 'react'
import MainPage from './pages/MainPage'
import Navbar from './components/navigation/Navbar'

function App() {
	return (
		<>
			<div className='h-screen bg-base flex flex-col'>
				<Navbar />
				<MainPage className="grow" />
			</div>
		</>
	)
}

export default App
