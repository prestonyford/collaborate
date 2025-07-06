import { create } from 'zustand'
import type TaskDTO from '../../model/dto/TaskDTO';
import type LabelDTO from '../../model/dto/LabelDTO';
import type ProjectCommunicator from '../../net/ProjectCommunicator/ProjectCommunicator';
import FakeProjectCommunicator from '../../net/ProjectCommunicator/FakeProjectCommunicator';

const projectCommunicator: ProjectCommunicator = new FakeProjectCommunicator();

interface TaskState {
	isLoading: boolean
	task: TaskDTO | null
	projectLabels: LabelDTO[]
	initialize: (projectID: string, taskID: string) => Promise<void>
	reset: () => void
}

const initialState = {
	isLoading: false,
	task: null,
	projectLabels: [],
}

const useTaskStore = create<TaskState>()(set => ({
	...initialState,
	initialize: async (projectID: string, taskID: string) => {
		set({ isLoading: true });
		try {
			const [task, projectLabels] = await Promise.all([
				projectCommunicator.getCardInfo(projectID, taskID),
				projectCommunicator.getProjectLabels(projectID),
			]);
			set({ task, projectLabels });
		} finally {
			set({ isLoading: false });
		}
	},
	reset: () => {
		set(initialState);
	}
}));

export { useTaskStore };
