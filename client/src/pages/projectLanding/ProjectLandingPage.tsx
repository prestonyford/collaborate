import { useEffect, useMemo, useState } from "react";
import Page from "../Page"
import { useServiceStore } from "../../serviceStore";
import type ProjectDTO from "../../model/dto/ProjectDTO";
import { useUserStore } from "../../userStore";
import type LabelDTO from "../../model/dto/LabelDTO";
import LoadingIcon from "../../components/base/LoadingIcon";
import { useNavigate } from "react-router-dom";
import ProjectItemList from "./ProjectItemList";
import { useProjectsStore } from "../../projectsStore";

interface Props {

}

function ProjectLandingPage(props: Props) {
	const navigate = useNavigate();
	const projectService = useServiceStore(state => state.projectService);
	const allProjects = useProjectsStore(state => state.allProjects);
	const isLoadingAllProjects = useProjectsStore(state => state.isLoadingAllProjects);
	const me = useUserStore(state => state.me);
	const [projectLabels, setProjectLabels] = useState<Record<number, LabelDTO[]>>({});
	const [projectLabelCounts, setProjectLabelCounts] = useState<Record<number, Record<number, number>>>({});

	useEffect(() => {
		const loadProjectsAndLabels = async () => {
			const labels = await Promise.all(allProjects.map(async (project) => {
				const labels = await projectService.getProjectLabels(project.id);
				return { projectId: project.id, labels };
			}));

			const labelsMap = labels.reduce((acc, { projectId, labels }) => {
				acc[projectId] = labels;
				return acc;
			}, {} as Record<number, LabelDTO[]>);

			const labelCounts = await Promise.all(allProjects.map(async p => {
				const counts = await projectService.getProjectLabelCounts(p.id);
				return { projectId: p.id, counts }
			}));

			const labelCountMap = labelCounts.reduce((acc, { projectId, counts }) => {
				acc[projectId] = counts;
				return acc;
			}, {} as Record<number, Record<number, number>>);

			setProjectLabels(labelsMap);
			setProjectLabelCounts(labelCountMap);
		};

		loadProjectsAndLabels();
	}, [allProjects]);

	const ownedProjects = useMemo(
		() => allProjects.filter(p => p.owner === me?.username),
		[allProjects]
	);
	const sharedProjects = useMemo(
		() => allProjects.filter(p => p.owner !== me?.username),
		[allProjects]
	);

	function handleProjectClick(projectId: number) {
		navigate(`/projects/${projectId}`)
	}

	return (
		<>
			<Page>
				<div className="py-4 px-6">
					<h1 className="mb-2">Owned Projects</h1>
					{isLoadingAllProjects
						? <div className="min-h-[60px]">
							<LoadingIcon />
						</div>
						: <ProjectItemList
							projects={ownedProjects}
							projectLabels={projectLabels}
							projectLabelCounts={projectLabelCounts}
							handleProjectClick={handleProjectClick}
							showCreateButton
						/>
					}

					<h1 className="mt-4 mb-2">Shared Projects</h1>
					{isLoadingAllProjects
						? <LoadingIcon />
						: <ProjectItemList
							projects={sharedProjects}
							projectLabels={projectLabels}
							projectLabelCounts={projectLabelCounts}
							handleProjectClick={handleProjectClick}
						/>
					}
				</div>
			</Page>
		</>
	)
}

export default ProjectLandingPage
