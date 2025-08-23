import { create } from 'zustand'
import type ProjectDTO from './model/dto/ProjectDTO';
import { useServiceStore } from './serviceStore';
import type CreateProjectRequest from './net/request/CreateProjectRequest';

interface ProjectsState {
	allProjects: ProjectDTO[]
	isLoadingAllProjects: boolean
	hasInitialized: boolean
	refreshAllProjects: () => Promise<void>
	createProject: (data: CreateProjectRequest) => Promise<ProjectDTO>
	getProject: (projectId: number) => ProjectDTO | undefined
	updateProject: (projectId: number, newProjectData: ProjectDTO) => void
}

const useProjectsStore = create<ProjectsState>()((set, get) => {
	const { projectService } = useServiceStore.getState();

	return {
		allProjects: [],
		isLoadingAllProjects: false,
		hasInitialized: false,
		refreshAllProjects: async function () {
			set({ isLoadingAllProjects: true });
			try {
				const allProjects = await projectService.getOwnedAndSharedProjects();
				set({ allProjects });
				set({ hasInitialized: true });
			} finally {
				set({ isLoadingAllProjects: false });
			}
		},
		createProject: async function(data: CreateProjectRequest) {
			const project = await projectService.createProject(data);
			set({
				allProjects: [...get().allProjects, project]
			});
			return project;
		},
		getProject: function (projectId: number) {
			return get().allProjects.find(p => p.id === projectId);
		},
		updateProject: function (projectId: number, newProjectData: ProjectDTO) {
			const newAllProjects = [...get().allProjects];
			const projectIdx = newAllProjects.findIndex(p => p.id === projectId);
			newAllProjects[projectIdx] = newProjectData;
			set({ allProjects: newAllProjects });
		} 
	}
});

export { useProjectsStore };
