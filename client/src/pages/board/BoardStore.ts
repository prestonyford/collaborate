import { create } from 'zustand'
import type ColumnDTO from '../../model/dto/ColumnDTO';
import type CardSummaryDTO from '../../model/dto/CardSummaryDTO';
import type LabelDTO from '../../model/dto/LabelDTO';
import { useServiceStore } from '../../serviceStore';
import type ProjectDTO from '../../model/dto/ProjectDTO';
import type CreateTaskRequest from '../../net/request/CreateTaskRequest';
import type ProjectShare from '../../model/dto/ProjectShare';
import type ShareProjectRequest from '../../net/request/ShareProjectRequest';
import { useProjectsStore } from '../../projectsStore';
import type CreateLabelsRequest from '../../net/request/CreateLabelsRequest';
import type DeleteLabelsRequest from '../../net/request/DeleteLabelsRequest';

interface ProjectState {
	isLoading: boolean
	projectId: number
	projectLabels: LabelDTO[]
	columns: ColumnDTO[]
	cardSummaries: Record<number, CardSummaryDTO[]>
	projectShares: ProjectShare[]
	labelFilter: Set<number>
	initialize: (projectId: number) => Promise<void>
	reset: () => void
	setLoading: (isLoading: boolean) => void
	setLabelFilter: (newLabelFilter: number[]) => void
	setColumns: (newColumns: ColumnDTO[]) => void
	moveCard: (srcColumnId: number, targetColumnId: number, oldIndex: number, newIndex: number) => void
	createColumn: (name: string, color: string) => Promise<void>
	createTask: (columnId: number, createData: CreateTaskRequest) => Promise<void>
	shareProject: (shareData: ShareProjectRequest) => Promise<void>
	createLabels: (data: CreateLabelsRequest) => Promise<void>
	deleteLabels: (data: DeleteLabelsRequest) => Promise<void>
}

const defaultState = {
	isLoading: false,
	projectId: -1,
	projectLabels: [],
	columns: [],
	cardSummaries: {},
	projectShares: [],
	labelFilter: new Set<number>()
}

const useBoardStore = create<ProjectState>()((set, get) => {
	const { projectService } = useServiceStore.getState();
	const { getProject, updateProject } = useProjectsStore.getState();

	return {
		...defaultState,

		initialize: async (projectId: number) => {
			const [projectLabels, columns, projectShares] = await Promise.all([
				projectService.getProjectLabels(projectId),
				projectService.getColumnsByProject(projectId),
				projectService.getProjectShares(projectId)
			]);
			set({ projectId, projectLabels, columns, projectShares });
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

		setLabelFilter: (labelFilter: number[]) => {
			set({ labelFilter: new Set(labelFilter) });
		},

		setColumns: (newColumns: ColumnDTO[]) => {
			set({ columns: newColumns });
		},

		moveCard: (srcColumnId: number, destColumnId: number, oldIndex: number, newIndex: number) => {
			set(state => {
				const cardSummaries = { ...state.cardSummaries };

				const srcCards = [...cardSummaries[srcColumnId]];
				const [card] = srcCards.splice(oldIndex, 1);
				cardSummaries[srcColumnId] = srcCards;

				if (srcColumnId === destColumnId) {
					srcCards.splice(newIndex, 0, card);
					cardSummaries[srcColumnId] = srcCards;
				} else {
					const destCards = [...cardSummaries[destColumnId]];
					destCards.splice(newIndex, 0, card);
					cardSummaries[destColumnId] = destCards;
					projectService.updateCardColumn(state.projectId, card.id, destColumnId);
				}

				return { cardSummaries };
			});
		},


		createColumn: async (name: string, color: string) => {
			const pid = get().projectId;
			if (!pid) {
				throw new Error("Cannot create a column outside of a project");
			}
			const newColumn = await projectService.createColumn(pid, name, color);
			const newColumns = [...get().columns, newColumn];
			set(state => ({
				columns: newColumns,
				cardSummaries: {
					...state.cardSummaries,
					[newColumn.id]: []
				}
			}));
			const project = getProject(pid);
			if (project) {
				updateProject(pid, {
					...project,
					numColumns: newColumns.length
				});
			}
		},

		createTask: async (columnId: number, createData: CreateTaskRequest) => {
			const pid = get().projectId;
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
			const project = getProject(pid);
			if (project) {
				updateProject(pid, {
					...project,
					numTasks: project.numTasks + 1
				});
			}
		},

		shareProject: async (shareData: ShareProjectRequest) => {
			const newShares = await projectService.shareProject(shareData);
			set({ projectShares: newShares });
		},

		createLabels: async (data: CreateLabelsRequest) => {
			const pid = get().projectId;
			if (!pid) {
				throw new Error("Cannot create a column outside of a project");
			}
			const newLabels = await projectService.createProjectLabels(pid, data);
			set(state => ({
				projectLabels: [...state.projectLabels, ...newLabels]
			}));
		},

		deleteLabels: async (data: DeleteLabelsRequest) => {
			const pid = get().projectId;
			if (!pid) {
				throw new Error("Cannot create a column outside of a project");
			}
			await projectService.deleteProjectLabels(pid, data);
			const ids = new Set(data.labels)
			set(state => ({
				projectLabels: state.projectLabels.filter(l => !ids.has(l.id))
			}));
		}
	}
});

export { useBoardStore };
