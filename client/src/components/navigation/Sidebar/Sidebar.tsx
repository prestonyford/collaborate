import clsx from 'clsx'
import SidebarProjectItem from './SidebarProjectItem'
import { useNavigate, useParams } from 'react-router-dom'
import { useServiceStore } from '../../../serviceStore';
import type ProjectDTO from '../../../model/dto/ProjectDTO';
import { act, useEffect, useMemo, useState } from 'react';

interface Props {
	className?: string
}

function Sidebar({ className = '' }: Props) {
	const navigate = useNavigate();
	const params = useParams();
	const activeProjectID = params.pid;

	const projectCommunicator = useServiceStore((state) => state.projectCommunicator);

	const [allProjects, setAllProjects] = useState<ProjectDTO[]>([]);
	useEffect(() => {
		(async () => {
			const res = await projectCommunicator.getOwnedAndSharedProjects();
			setAllProjects(res);
		})();
	}, [projectCommunicator]);

	const ownedProjects = useMemo(() => allProjects.filter(p => p.owner === 'pyford'), [allProjects]);
	const sharedProjects = useMemo(() => allProjects.filter(p => p.owner !== 'pyford'), [allProjects]);

	return (
		<>
			<div className={clsx('h-full border-r border-accent bg-surface', className)}>
				<div className='flex'>
					<button className='grow mx-3 mt-2 mb-1 p-1.5 flex items-center justify-center bg-attention hover:bg-attention-hover transition-colors cursor-pointer rounded-2xl'>
						<strong>Create Project</strong>
					</button>
				</div>
				<h4 className='px-1 mt-2'>Owned</h4>
				<div className="flex flex-col">
					{ownedProjects.map((p, i) =>
						<SidebarProjectItem
							key={p.id}
							projectName={p.name}
							numColumns={p.numColumns}
							numTasks={p.numTasks}
							last={i === ownedProjects.length - 1}
							active={p.id === activeProjectID}
							onClick={() => navigate(`/projects/${p.id}`)}
						/>
					)}
				</div>
				<h4 className='px-1 mt-3'>Shared with me</h4>
				<div className="flex flex-col">
					{sharedProjects.map((p, i) =>
						<SidebarProjectItem
							key={p.id}
							projectName={p.name}
							numColumns={p.numColumns}
							numTasks={p.numTasks}
							owner={p.owner}
							last={i === ownedProjects.length - 1}
							active={p.id === activeProjectID}
							onClick={() => navigate(`/projects/${p.id}`)}
						/>
					)}
				</div>
			</div>
		</>
	)
}

export default Sidebar
