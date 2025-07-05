import { create } from 'zustand'
import type ColumnDTO from '../../model/dto/ColumnDTO';
import type ColumnCommunicator from '../../net/ColumnCommunicator/ColumnCommunicator';
import FakeColumnCommunicator from '../../net/ColumnCommunicator/FakeColumnCommunicator';
import type CardSummaryDTO from '../../model/dto/CardSummaryDTO';
import type CardCommunicator from '../../net/CardCommunicator/CardCommunicator';
import FakeCardCommunicator from '../../net/CardCommunicator/FakeCardCommunicator';
import type LabelDTO from '../../model/dto/LabelDTO';
import type LabelCommunicator from '../../net/LabelCommunicator/LabelCommunicator';
import FakeLabelCommunicator from '../../net/LabelCommunicator/FakeLabelCommunicator';

const columnCommunicator: ColumnCommunicator = new FakeColumnCommunicator();
const cardCommunicator: CardCommunicator = new FakeCardCommunicator();
const labelCommunicator: LabelCommunicator = new FakeLabelCommunicator();

interface ProjectState {
	isLoading: boolean
	projectLabels: LabelDTO[]
	columns: ColumnDTO[]
	cardSummaries: Record<string, CardSummaryDTO[]>
	initialize: (projectID: string) => Promise<void>
	reset: () => void
	setColumns: (newColumns: ColumnDTO[]) => void
	setColumnCardSummaries: (columnID: string, newCardSummaries: CardSummaryDTO[]) => void
}

const defaultState = {
	isLoading: false,
	projectLabels: [],
	columns: [],
	cardSummaries: {},
}

const useBoardStore = create<ProjectState>()(set => ({
	...defaultState,
	
	initialize: async (projectID: string) => {
		set({ isLoading: true });
		try {
			const [projectLabels, columns] = await Promise.all([
				labelCommunicator.getProjectLabels(projectID),
				columnCommunicator.getColumnsByProject(projectID)
			]);
			set({ projectLabels, columns });
			for (let col of columns) {
				const [cardSummaries, hasMore] = await cardCommunicator.getCardSummaries(projectID, col.id, 10, null);
				set(state => ({ cardSummaries: {
					...state.cardSummaries,
					[col.id]: cardSummaries
				} }));
			}
		} finally {
			set({ isLoading: false });
		}
	},

	reset: () => {
		set(defaultState);
	},

	setColumns: (newColumns: ColumnDTO[]) => {
		set({ columns: newColumns });
	},

	setColumnCardSummaries: (columnID: string, newCardSummaries: CardSummaryDTO[]) => {
		set(state => ({ cardSummaries: {
			...state.cardSummaries,
			[columnID]: newCardSummaries
		} }));
	}
}));

export { useBoardStore };
