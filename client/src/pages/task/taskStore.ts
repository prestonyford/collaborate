import { create } from 'zustand'
import type TaskDTO from '../../model/dto/TaskDTO';
import type LabelDTO from '../../model/dto/LabelDTO';
import { useServiceStore } from '../../serviceStore';

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

const useTaskStore = create<TaskState>()(set => {
	const { projectCommunicator } = useServiceStore.getState();

	return {
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
	}
});

export { useTaskStore };
