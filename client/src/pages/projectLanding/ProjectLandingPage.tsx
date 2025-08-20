import { useEffect, useMemo, useState } from "react";
import Page from "../Page"
import { useServiceStore } from "../../serviceStore";
import type ProjectDTO from "../../model/dto/ProjectDTO";
import { useUserStore } from "../../userStore";
import type LabelDTO from "../../model/dto/LabelDTO";
import LoadingIcon from "../../components/base/LoadingIcon";
import { useNavigate } from "react-router-dom";
import ProjectItemList from "./ProjectItemList";

interface Props {

}

function ProjectLandingPage(props: Props) {
	const navigate = useNavigate();
	const projectService = useServiceStore(state => state.projectService);
	const me = useUserStore(state => state.me);
	const [isLoading, setIsLoading] = useState(false);
	const [allProjects, setAllProjects] = useState<ProjectDTO[]>([]);
	const [projectLabels, setProjectLabels] = useState<Record<number, LabelDTO[]>>({});
	const [projectLabelCounts, setProjectLabelCounts] = useState<Record<number, Record<number, number>>>({});

	useEffect(() => {
		const loadProjectsAndLabels = async () => {
			try {
				setIsLoading(true);
				const projects = await projectService.getOwnedAndSharedProjects();
				setAllProjects(projects);

				const labels = await Promise.all(projects.map(async (project) => {
					const labels = await projectService.getProjectLabels(project.id);
					return { projectId: project.id, labels };
				}));

				const labelsMap = labels.reduce((acc, { projectId, labels }) => {
					acc[projectId] = labels;
					return acc;
				}, {} as Record<number, LabelDTO[]>);

				const labelCounts = await Promise.all(projects.map(async p => {
					const counts = await projectService.getProjectLabelCounts(p.id);
					return { projectId: p.id, counts }
				}));

				const labelCountMap = labelCounts.reduce((acc, { projectId, counts }) => {
					acc[projectId] = counts;
					return acc;
				}, {} as Record<number, Record<number, number>>);

				setProjectLabels(labelsMap);
				setProjectLabelCounts(labelCountMap);
			} catch (error) {
				console.error('Failed to load projects and labels:', error);
			} finally {
				setIsLoading(false);
			}
		};

		loadProjectsAndLabels();
	}, [projectService]);

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
					{isLoading
						? <LoadingIcon />
						: <ProjectItemList
							projects={ownedProjects}
							projectLabels={projectLabels}
							projectLabelCounts={projectLabelCounts}
							handleProjectClick={handleProjectClick}
							showCreateButton
						/>
					}

					<h1 className="my-2">Shared Projects</h1>
					{isLoading
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
