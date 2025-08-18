import clsx from 'clsx'
import SidebarProjectItem from './SidebarProjectItem'
import { useNavigate, useParams } from 'react-router-dom'
import { useServiceStore } from '../../../serviceStore';
import type ProjectDTO from '../../../model/dto/ProjectDTO';
import { act, useEffect, useMemo, useState } from 'react';
import LoadingIcon from '../../base/LoadingIcon';

interface Props {
	className?: string
}

function Sidebar({ className = '' }: Props) {
	const navigate = useNavigate();
	const params = useParams();
	const activeProjectID = params.pid;

	const projectCommunicator = useServiceStore((state) => state.projectService);

	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const [allProjects, setAllProjects] = useState<ProjectDTO[]>([]);

	useEffect(() => {
		setLoading(true);
		(async () => {
			try {
				const res = await projectCommunicator.getOwnedAndSharedProjects();
				setAllProjects(res);
			} catch (err) {
				if (err instanceof Error) {
					setError(err);
				} else {
					setError(new Error("An error occured while loading projects."));
				}
			} finally {
				setLoading(false);
			}
		})();
	}, [projectCommunicator]);

	const ownedProjects = useMemo(() => allProjects.filter(p => p.owner === 'pyford'), [allProjects]);
	const sharedProjects = useMemo(() => allProjects.filter(p => p.owner !== 'pyford'), [allProjects]);

	return (
		<>
			<div className={clsx('h-full border-r border-accent bg-surface overflow-y-auto', className)}>
				{error
					? <div className='text-text-muted select-none'>
						An error occured while loading projects.
					</div>
					: <>
						<div className='flex'>
							<button className='grow mx-3 my-2 p-1.5 flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-gray-50 transition-colors cursor-pointer rounded-2xl'>
								<strong>Create Project</strong>
							</button>
						</div>
						{loading
							? <div className='mt-4'><LoadingIcon /></div>
							: <>
								<h4 className='px-1.5 pt-2 bg-attention border-accent border-b sticky top-0'>Owned</h4>
								<div className="flex flex-col">
									{ownedProjects.length
										? ownedProjects.map(p =>
											<SidebarProjectItem
												key={p.id}
												projectName={p.name}
												numColumns={p.numColumns}
												numTasks={p.numTasks}
												active={p.id === +(activeProjectID ?? '-1')}
												onClick={() => navigate(`/projects/${p.id}`)}
											/>
										)
										: <div className='text-sm text-text-muted italic select-none ml-1.5'>None</div>
									}
								</div>
								<h4 className='px-1.5 pt-3 bg-attention border-accent border-b sticky top-0'>Shared with me</h4>
								<div className="flex flex-col">
									{sharedProjects.length
										? sharedProjects.map(p =>
											<SidebarProjectItem
												key={p.id}
												projectName={p.name}
												numColumns={p.numColumns}
												numTasks={p.numTasks}
												owner={p.owner}
												active={p.id === +(activeProjectID ?? '-1')}
												onClick={() => navigate(`/projects/${p.id}`)}
											/>
										)
										: <div className='text-sm text-text-muted italic select-none ml-1.5'>None</div>
									}
								</div>
							</>
						}
					</>
				}
			</div>
		</>
	)
}

export default Sidebar
