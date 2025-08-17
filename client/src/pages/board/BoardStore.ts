import { create } from 'zustand'
import type ColumnDTO from '../../model/dto/ColumnDTO';
import type CardSummaryDTO from '../../model/dto/CardSummaryDTO';
import type LabelDTO from '../../model/dto/LabelDTO';
import { useServiceStore } from '../../serviceStore';
import type ProjectDTO from '../../model/dto/ProjectDTO';
import type CreateTaskRequest from '../../net/request/CreateTaskRequest';
import type ProjectShare from '../../model/dto/ProjectShare';
import type ShareProjectRequest from '../../net/request/ShareProjectRequest';


interface ProjectState {
	isLoading: boolean
	project: ProjectDTO | null
	projectLabels: LabelDTO[]
	columns: ColumnDTO[]
	cardSummaries: Record<string, CardSummaryDTO[]>
	projectShares: ProjectShare[]
	initialize: (projectId: number) => Promise<void>
	reset: () => void
	setLoading: (isLoading: boolean) => void
	setColumns: (newColumns: ColumnDTO[]) => void
	setColumnCardSummaries: (columnId: number, newCardSummaries: CardSummaryDTO[]) => void
	createColumn: (name: string, color: string) => Promise<void>
	createTask: (columnId: number, createData: CreateTaskRequest) => Promise<void>
	shareProject: (shareData: ShareProjectRequest) => Promise<void>
}

const defaultState = {
	isLoading: false,
	project: null,
	projectLabels: [],
	columns: [],
	cardSummaries: {},
	projectShares: []
}

const useBoardStore = create<ProjectState>()((set, get) => {
	const { projectService } = useServiceStore.getState();

	return {
		...defaultState,

		initialize: async (projectId: number) => {
			const [project, projectLabels, columns, projectShares] = await Promise.all([
				projectService.getProject(projectId),
				projectService.getProjectLabels(projectId),
				projectService.getColumnsByProject(projectId),
				projectService.getProjectShares(projectId)
			]);
			set({ project, projectLabels, columns, projectShares });
			for (let col of columns) {
				const [cardSummaries, hasMore] = await projectService.getCardSummaries(projectId, col.id, 10, null);
				set(state => ({
					cardSummaries: {
						...state.cardSummaries,
						[col.id]: cardSummaries
					}
				}));
			}
		},

		reset: () => {
			set(defaultState);
		},

		setLoading: (isLoading: boolean) => {
			set({ isLoading });
		},

		setColumns: (newColumns: ColumnDTO[]) => {
			set({ columns: newColumns });
		},

		setColumnCardSummaries: (columnId: number, newCardSummaries: CardSummaryDTO[]) => {
			set(state => ({
				cardSummaries: {
					...state.cardSummaries,
					[columnId]: newCardSummaries
				}
			}));
		},

		createColumn: async (name: string, color: string) => {
			const pid = get().project?.id;
			if (!pid) {
				throw new Error("Cannot create a column outside of a project");
			}
			const newColumn = await projectService.createColumn(pid, name, color);
			set(state => ({
				columns: [...state.columns, newColumn],
				cardSummaries: {
					...state.cardSummaries,
					[newColumn.id]: []
				}
			}));
		},

		createTask: async (columnId: number, createData: CreateTaskRequest) => {
			const pid = get().project?.id;
			if (!pid) {
				throw new Error("Cannot create a column outside of a project");
			}
			const newTask = await projectService.createTask(pid, columnId, createData);
			set(state => ({
				cardSummaries: {
					...state.cardSummaries,
					[newTask.columnId]: [...state.cardSummaries[newTask.columnId], newTask]
				}
			}));
		},

		shareProject: async (shareData: ShareProjectRequest) => {
			const newShares = await projectService.shareProject(shareData);
			set({ projectShares: newShares });
		}
	}
});

export { useBoardStore };
