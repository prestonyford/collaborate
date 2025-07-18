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
	initialize: (projectID: string) => Promise<void>
	reset: () => void
	setLoading: (isLoading: boolean) => void
	setColumns: (newColumns: ColumnDTO[]) => void
	setColumnCardSummaries: (columnID: string, newCardSummaries: CardSummaryDTO[]) => void
}

const defaultState = {
	isLoading: false,
	project: null,
	projectLabels: [],
	columns: [],
	cardSummaries: {},
}

const useBoardStore = create<ProjectState>()(set => {
	const { projectService } = useServiceStore.getState();
	
	return {
		...defaultState,

		initialize: async (projectID: string) => {
			const [project, projectLabels, columns] = await Promise.all([
				projectService.getProject(projectID),
				projectService.getProjectLabels(projectID),
				projectService.getColumnsByProject(projectID)
			]);
			set({ project, projectLabels, columns });
			for (let col of columns) {
				const [cardSummaries, hasMore] = await projectService.getCardSummaries(projectID, col.id, 10, null);
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

		setColumnCardSummaries: (columnID: string, newCardSummaries: CardSummaryDTO[]) => {
			set(state => ({
				cardSummaries: {
					...state.cardSummaries,
					[columnID]: newCardSummaries
				}
			}));
		}
	}
});

export { useBoardStore };
