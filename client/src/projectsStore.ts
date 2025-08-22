import { create } from 'zustand'
import type ProjectDTO from './model/dto/ProjectDTO';
import { useServiceStore } from './serviceStore';

interface ProjectsState {
	allProjects: ProjectDTO[]
	isLoadingAllProjects: boolean
	refreshAllProjects: () => Promise<void>
}

const useProjectsStore = create<ProjectsState>()(set => {
	const { projectService } = useServiceStore.getState();
	
	return {
		allProjects: [],
		isLoadingAllProjects: false,
		refreshAllProjects: async function () {
			set({ isLoadingAllProjects: true });
			try {
				const allProjects = await projectService.getOwnedAndSharedProjects();
				set({ allProjects });
			} finally {
				set({ isLoadingAllProjects: false });
			}
		}
	}
});

export { useProjectsStore };
