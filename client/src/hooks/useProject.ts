import { useMemo } from "react";
import { useProjectsStore } from "../projectsStore";

export function useProject(projectId: number | undefined) {
	const { hasInitialized, getProject, allProjects } = useProjectsStore();

	return useMemo(() => {
		if (hasInitialized && projectId !== undefined) {
			return getProject(projectId);
		}
		return undefined;
	}, [getProject, projectId, hasInitialized, allProjects]);
}
