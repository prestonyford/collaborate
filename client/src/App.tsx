import { useState } from 'react'
import Project from './pages/Project'
import Navbar from './components/navigation/Navbar'
import Sidebar from './components/navigation/Sidebar/Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import CardPage from './pages/task/CardPage'

function App() {
	return (
		<>
			<BrowserRouter>
				<div className='h-screen bg-base flex flex-col'>
					<Navbar />
					<div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] h-[calc(100%-44px)]">
						<Sidebar className='hidden lg:block' />
						<Routes>
							<Route index element={<Project />} />
							<Route path="projects" element={<Project />} />
							<Route path="projects/:pid" element={<Project />} />
							<Route path="projects/:pid/tasks" element={<CardPage />} />
							<Route path="projects/:pid/tasks/:tid" element={<CardPage />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</div>
				</div>
			</BrowserRouter>
		</>
	)
}

export default App
