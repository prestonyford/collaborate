import clsx from 'clsx'
import SidebarProjectItem from './SidebarProjectItem'
import { useNavigate, useParams } from 'react-router-dom'
import { useServiceStore } from '../../../serviceStore';
import type ProjectDTO from '../../../model/dto/ProjectDTO';
import { act, useEffect, useMemo, useState } from 'react';
import LoadingIcon from '../../base/LoadingIcon';
import { useProjectsStore } from '../../../projectsStore';
import { useUserStore } from '../../../userStore';

interface Props {
	className?: string
}

function Sidebar({ className = '' }: Props) {
	const navigate = useNavigate();
	const params = useParams();
	const activeProjectID = params.pid;

	const [error, setError] = useState<Error | null>(null);
	const allProjects = useProjectsStore(state => state.allProjects);
	const isLoadingAllProjects = useProjectsStore(state => state.isLoadingAllProjects);
	const me = useUserStore(state => state.me);

	const ownedProjects = useMemo(
		() => allProjects.filter(p => p.owner === me?.username),
		[allProjects]
	);
	const sharedProjects = useMemo(
		() => allProjects.filter(p => p.owner !== me?.username),
		[allProjects]
	);

	return (
		<>
			<div className={clsx('h-full border-r border-accent bg-surface overflow-y-auto', className)}>
				{error
					? <div className='text-text-muted select-none'>
						An error occured while loading projects.
					</div>
					: <>
						{isLoadingAllProjects
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
										: <div className='text-sm text-text-muted select-none h-8 flex justify-center items-center'>None</div>
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
										: <div className='text-sm text-text-muted select-none h-8 flex justify-center items-center'>None</div>
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
