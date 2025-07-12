import { create } from 'zustand'
import type TaskDTO from '../../model/dto/TaskDTO';
import type LabelDTO from '../../model/dto/LabelDTO';
import { useServiceStore } from '../../serviceStore';
import type CardDiscussionItemDTO from '../../model/dto/CardDiscussionItemDTO';

interface TaskState {
	projectID?: string
	isLoading: boolean
	task: TaskDTO | null
	projectLabels: LabelDTO[]
	editingDescription: boolean
	discussionItems: CardDiscussionItemDTO[]
	initialize: (projectID: string, taskID: string) => Promise<void>
	reset: () => void
	setEditingDescription: (val: boolean) => void
	saveDescription: (description: string) => Promise<void>
	loadDiscussionItems: (pageSize: number, lastItemID: string | null) => Promise<boolean>
}

const initialState = {
	projectID: undefined,
	isLoading: false,
	task: null,
	projectLabels: [],
	editingDescription: false,
	discussionItems: []
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
		},
		loadDiscussionItems: async (pageSize: number, lastItemID: string | null) => {
			const { projectID, task } = get();
			if (!projectID || !task) throw new Error("Cannot load discussion items without project and task loaded.");
			const [hasMore, newItems] = await projectCommunicator.getCardDiscussion(projectID, task.id, pageSize, lastItemID);
			set(state => {
				const existingIDs = new Set(state.discussionItems.map(i => i.id));
				const uniqueNewItems = newItems.filter(i => !existingIDs.has(i.id));
				return {
					discussionItems: [...state.discussionItems, ...uniqueNewItems]
				};
			});
			return hasMore
		}
	}
});

export { useTaskStore };
