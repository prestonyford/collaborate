import { create } from 'zustand'
import type TaskDTO from '../../model/dto/TaskDTO';
import type LabelDTO from '../../model/dto/LabelDTO';
import { useServiceStore } from '../../serviceStore';

interface TaskState {
	projectID?: string
	isLoading: boolean
	task: TaskDTO | null
	projectLabels: LabelDTO[]
	editingDescription: boolean
	initialize: (projectID: string, taskID: string) => Promise<void>
	reset: () => void
	setEditingDescription: (val: boolean) => void
	saveDescription: (description: string) => Promise<void>
}

const initialState = {
	projectID: undefined,
	isLoading: false,
	task: null,
	projectLabels: [],
	editingDescription: false
}

const useTaskStore = create<TaskState>()((set, get) => {
	const { projectCommunicator } = useServiceStore.getState();

	return {
		...initialState,
		initialize: async (projectID: string, taskID: string) => {
			set({ projectID, isLoading: true });
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
		},
		setEditingDescription: val => set({ editingDescription: val }),
		saveDescription: async (description: string) => {
			const { projectID, task } = get();
			if (!projectID || !task) throw new Error("Cannot save without project and task loaded.");
			await projectCommunicator.updateCardDescription(projectID, task.id, description);
			set({
				task: {
					...task,
					description
				}
			});
		}
	}
});

export { useTaskStore };
