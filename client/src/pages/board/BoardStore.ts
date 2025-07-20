import { create } from 'zustand'
import type ColumnDTO from '../../model/dto/ColumnDTO';
import type CardSummaryDTO from '../../model/dto/CardSummaryDTO';
import type LabelDTO from '../../model/dto/LabelDTO';
import { useServiceStore } from '../../serviceStore';
import type ProjectDTO from '../../model/dto/ProjectDTO';


interface ProjectState {
	isLoading: boolean
	project: ProjectDTO | null
	projectLabels: LabelDTO[]
	columns: ColumnDTO[]
	cardSummaries: Record<string, CardSummaryDTO[]>
	initialize: (projectId: string) => Promise<void>
	reset: () => void
	setLoading: (isLoading: boolean) => void
	setColumns: (newColumns: ColumnDTO[]) => void
	setColumnCardSummaries: (columnId: string, newCardSummaries: CardSummaryDTO[]) => void
	createColumn: (name: string, color: string) => Promise<void>
	createTask: (columnId: string, name: string, description: string) => Promise<void>
}

const defaultState = {
	isLoading: false,
	project: null,
	projectLabels: [],
	columns: [],
	cardSummaries: {},
}

const useBoardStore = create<ProjectState>()((set, get) => {
	const { projectService } = useServiceStore.getState();
	
	return {
		...defaultState,

		initialize: async (projectId: string) => {
			const [project, projectLabels, columns] = await Promise.all([
				projectService.getProject(projectId),
				projectService.getProjectLabels(projectId),
				projectService.getColumnsByProject(projectId)
			]);
			set({ project, projectLabels, columns });
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

		setColumnCardSummaries: (columnId: string, newCardSummaries: CardSummaryDTO[]) => {
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
				columns: [...state.columns, newColumn]
			}));
		},
		
		createTask: async (columnId: string, name: string, description: string) => {
			const pid = get().project?.id;
			if (!pid) {
				throw new Error("Cannot create a column outside of a project");
			}
			const newTask = await projectService.createTask(pid, columnId, name, description);
			set(state => ({
				cardSummaries: {
					...state.cardSummaries,
					[newTask.columnId]: [...state.cardSummaries[newTask.columnId], newTask]
				}
			}))
		}
	}
});

export { useBoardStore };
