import { create } from 'zustand'
import type TaskDTO from '../../model/dto/TaskDTO';
import type LabelDTO from '../../model/dto/LabelDTO';
import { useServiceStore } from '../../serviceStore';
import type CardDiscussionItemDTO from '../../model/dto/CardDiscussionItemDTO';

interface TaskState {
	projectID?: string
	task: TaskDTO | null
	projectLabels: LabelDTO[]
	discussionItems: CardDiscussionItemDTO[]
	initialize: (projectID: string, taskID: string) => Promise<void>
	reset: () => void
	saveDescription: (description: string) => Promise<void>
	saveTitle: (title: string) => Promise<void>
	loadDiscussionItems: (pageSize: number, lastItemID: string | null) => Promise<boolean>
}

const initialState = {
	projectID: undefined,
	task: null,
	projectLabels: [],
	discussionItems: []
}

const useTaskStore = create<TaskState>()((set, get) => {
	const { projectService } = useServiceStore.getState();

	return {
		...initialState,
		initialize: async (projectID: string, taskID: string) => {
			set({ projectID });
			const [task, projectLabels] = await Promise.all([
				projectService.getCardInfo(projectID, taskID),
				projectService.getProjectLabels(projectID),
			]);
			set({ task, projectLabels });
		},
		reset: () => {
			set(initialState);
		},
		saveDescription: async (description: string) => {
			const { projectID, task } = get();
			if (!projectID || !task) throw new Error("Cannot save without project and task loaded.");
			await projectService.updateCardDescription(projectID, task.id, description);
			set({
				task: {
					...task,
					description
				}
			});
		},
		saveTitle: async (title: string) => {
			const { projectID, task } = get();
			if (!projectID || !task) throw new Error("Cannot save without project and task loaded.");
			await projectService.updateCardTitle(projectID, task.id, title);
			set({
				task: {
					...task,
					title
				}
			});
		},
		loadDiscussionItems: async (pageSize: number, lastItemID: string | null) => {
			const { projectID, task } = get();
			if (!projectID || !task) throw new Error("Cannot load discussion items without project and task loaded.");
			const [hasMore, newItems] = await projectService.getCardDiscussion(projectID, task.id, pageSize, lastItemID);
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
