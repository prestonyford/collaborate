import type LabelDTO from "../../model/dto/LabelDTO";
import type ProjectDTO from "../../model/dto/ProjectDTO";
import ProjectItem from "./ProjectItem";
import './projectItemList.css'

interface Props {
	projects: ProjectDTO[]
	projectLabels: Record<number, LabelDTO[]>
	projectLabelCounts: Record<number, Record<number, number>>
	handleProjectClick: (id: number) => void
	showCreateButton?: boolean
}

export default function ProjectItemList({ projects, projectLabels, projectLabelCounts, handleProjectClick, showCreateButton = false }: Props) {
	return <>
		{
			projects.length === 0 && !showCreateButton
				? <p className="text-text-muted">No projects</p>
				: <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
					{projects.map((p, i) => <>
						<div className="appear cursor-pointer" style={{animationDelay: `${30*i}ms`}} onClick={() => handleProjectClick(p.id)}>
							<ProjectItem
								key={p.id}
								project={p}
								labels={projectLabels[p.id]}
								labelCount={projectLabelCounts[p.id]}
							/>
						</div>
					</>)}

					{showCreateButton && <div>
						<div className="rounded-xl border border-accent min-h-[60px] flex text-text-muted hover:bg-indigo-500 hover:text-white transition-colors cursor-pointer">
							<div className="m-auto"><i className="fa-solid fa-plus"></i> Create Project</div>
						</div>
					</div>}
				</div>
		}

	</>
}