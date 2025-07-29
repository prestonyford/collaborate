import { useEffect, useState } from 'react'
import Project from './pages/board/Project'
import Navbar from './components/navigation/Navbar'
import Sidebar from './components/navigation/Sidebar/Sidebar'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import TaskPage from './pages/task/TaskPage'
import Layout from './Layout'
import LoginPage from './pages/login/LoginPage'
import { useServiceStore } from './serviceStore'
import { useUserStore } from './userStore'
import LoadingIcon from './components/base/LoadingIcon'

function App() {
	const authService = useServiceStore(state => state.authService);
	const me = useUserStore(state => state.me);
	const setMe = useUserStore(state => state.setMe);
	const authChecked = useUserStore(state => state.authChecked);
	const setAuthChecked = useUserStore(state => state.setAuthChecked);

	useEffect(() => {
		authService.checkStatus()
			.then(user => {
				setMe(user);
			})
			.finally(() => {
				setAuthChecked(true);
			});
	}, []);

	if (!authChecked) {
		return <div className="w-screen h-screen flex">
			<div className="m-auto">
				<LoadingIcon />
			</div>
		</div>
	}

	const indexPath = me ? '/projects' : '/login';

	return (
		<>
			<BrowserRouter>
				<div className='h-screen bg-base flex flex-col'>
					<Navbar />
					<Routes>
						<Route
							index
							element={<Navigate to={indexPath} replace />}
						/>

						<Route
							path="login"
							element={<LoginPage />}
						/>

						<Route
							path="projects"
							element={<Navigate to={`/projects/1`} replace />}
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
