import type LabelDTO from "../../model/dto/LabelDTO";
import type ProjectDTO from "../../model/dto/ProjectDTO";
import ProjectItem from "./ProjectItem";

interface Props {
	projects: ProjectDTO[]
	projectLabels: Record<number, LabelDTO[]>
	projectLabelCounts: Record<number, Record<number, number>>
	handleProjectClick: (id: number) => void
}

export default function ProjectItemList({ projects, projectLabels, projectLabelCounts, handleProjectClick }: Props) {
	return <>
		{
			projects.length === 0
				? <p className="text-text-muted">No projects</p>
				: <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
					{projects.map(p => <>
						<div className="cursor-pointer" onClick={() => handleProjectClick(p.id)}>
							<ProjectItem
								key={p.id}
								project={p}
								labels={projectLabels[p.id]}
								labelCount={projectLabelCounts[p.id]}
							/>
						</div>
					</>)}
				</div>
		}

	</>
}