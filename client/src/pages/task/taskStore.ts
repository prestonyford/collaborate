import { create } from 'zustand'
import type TaskDTO from '../../model/dto/TaskDTO';
import type LabelDTO from '../../model/dto/LabelDTO';
import { useServiceStore } from '../../serviceStore';
import type CardDiscussionItemDTO from '../../model/dto/CardDiscussionItemDTO';

interface TaskState {
	projectId?: string
	task: TaskDTO | null
	projectLabels: LabelDTO[]
	discussionItems: CardDiscussionItemDTO[]
	initialize: (projectId: string, taskID: string) => Promise<void>
	reset: () => void
	saveDescription: (description: string) => Promise<void>
	saveTitle: (title: string) => Promise<void>
	loadDiscussionItems: (pageSize: number, lastItemID: string | null) => Promise<boolean>
	updateLabels: (labels: string[]) => Promise<void>
}

const initialState = {
	projectId: undefined,
	task: null,
	projectLabels: [],
	discussionItems: []
}

const useTaskStore = create<TaskState>()((set, get) => {
	const { projectService } = useServiceStore.getState();

	return {
		...initialState,
		initialize: async (projectId: string, taskID: string) => {
			set({ projectId });
			const [task, projectLabels] = await Promise.all([
				projectService.getCardInfo(projectId, taskID),
				projectService.getProjectLabels(projectId),
			]);
			set({ task, projectLabels });
		},
		reset: () => {
			set(initialState);
		},
		saveDescription: async (description: string) => {
			const { projectId, task } = get();
			if (!projectId || !task) throw new Error("Cannot save without project and task loaded.");
			await projectService.updateCardDescription(projectId, task.id, description);
			set({
				task: {
					...task,
					description
				}
			});
		},
		saveTitle: async (title: string) => {
			const { projectId, task } = get();
			if (!projectId || !task) throw new Error("Cannot save without project and task loaded.");
			await projectService.updateCardTitle(projectId, task.id, title);
			set({
				task: {
					...task,
					title
				}
			});
		},
		loadDiscussionItems: async (pageSize: number, lastItemID: string | null) => {
			const { projectId, task } = get();
			if (!projectId || !task) throw new Error("Cannot load discussion items without project and task loaded.");
			const [hasMore, newItems] = await projectService.getCardDiscussion(projectId, task.id, pageSize, lastItemID);
			set(state => {
				const existingIDs = new Set(state.discussionItems.map(i => i.id));
				const uniqueNewItems = newItems.filter(i => !existingIDs.has(i.id));
				return {
					discussionItems: [...state.discussionItems, ...uniqueNewItems]
				};
			});
			return hasMore
		},
		updateLabels: async (labels: string[]) => {
			const { projectId, task } = get();
			if (!projectId || !task) throw new Error("Cannot modify labels without project and task loaded.");
			await projectService.updateCardLabels(projectId, task.id, labels);
			set({
				task: {
					...task,
					labels
				}
			});
		}
	}
});

export { useTaskStore };
