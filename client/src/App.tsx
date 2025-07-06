import { useState } from 'react'
import Project from './pages/Project'
import Navbar from './components/navigation/Navbar'
import Sidebar from './components/navigation/Sidebar/Sidebar'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import TaskPage from './pages/task/TaskPage'
import Layout from './Layout'

function App() {
	return (
		<>
			<BrowserRouter>
				<div className='h-screen bg-base flex flex-col'>
					<Navbar />
					<Routes>
						<Route
							index
							element={<Navigate to={`/projects/default`} replace />}
						/>
						<Route
							path="projects"
							element={<Navigate to={`/projects/default`} replace />}
						/>
						<Route path="projects/:pid" element={<Layout />}>
							<Route index element={<Project />} />
							<Route path="tasks" element={<TaskPage />} />
							<Route path="tasks/:tid" element={<TaskPage />} />
							<Route path="tasks/:tid/view" element={<TaskPage />} />
							<Route path="tasks/:tid/edit" element={<TaskPage />} />
						</Route>

						<Route path="*" element={<Layout />}>
							<Route path="*" element={<NotFound />} />
						</Route>
					</Routes>
				</div>
			</BrowserRouter>
		</>
	)
}

export default App
