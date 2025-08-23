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
	updateProjectName: (projectId: number, newName: string) => Promise<ProjectDTO>
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
		updateProjectName: async function (projectId: number, newName: string) {
			const newProject = await projectService.updateProjectName(projectId, newName);
			const newAllProjects = [...get().allProjects];
			const projectIdx = newAllProjects.findIndex(p => p.id === projectId);
			newAllProjects[projectIdx] = newProject;
			set({ allProjects: newAllProjects });
			return newProject;
		} 
	}
});

export { useProjectsStore };
