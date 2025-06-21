import { create } from 'zustand'
import type ColumnDTO from '../../model/dto/ColumnDTO';
import type ColumnCommunicator from '../../net/ColumnCommunicator/ColumnCommunicator';
import FakeColumnCommunicator from '../../net/ColumnCommunicator/FakeColumnCommunicator';
import type CardSummaryDTO from '../../model/dto/CardSummaryDTO';
import type CardCommunicator from '../../net/CardCommunicator/CardCommunicator';
import FakeCardCommunicator from '../../net/CardCommunicator/FakeCardCommunicator';

const columnCommunicator: ColumnCommunicator = new FakeColumnCommunicator();
const cardCommunicator: CardCommunicator = new FakeCardCommunicator();

interface ProjectState {
	isLoading: boolean
	columns: ColumnDTO[]
	cardSummaries: Record<string, CardSummaryDTO[]>
	initialize: (projectID: string) => Promise<void>
	setColumns: (newColumns: ColumnDTO[]) => void
	setCardSummary: (columnID: string, newCardSummaries: CardSummaryDTO[]) => void
}

const useBoardStore = create<ProjectState>()(set => ({
	isLoading: false,
	columns: [],
	cardSummaries: {},
	
	initialize: async (projectID: string) => {
		set({ isLoading: true });
		try {
			const newColumns = await columnCommunicator.getColumnsByProject(projectID);
			for (let col of newColumns) {
				const [cardSummaries, hasMore] = await cardCommunicator.getCardSummaries(projectID, col.id, 10, null);
				set(state => ({ cardSummaries: {
					...state.cardSummaries,
					[col.id]: cardSummaries
				} }));
			}
			set({ columns: newColumns });
		} finally {
			set({ isLoading: false });
		}
	},

	setColumns: (newColumns: ColumnDTO[]) => {
		set({ columns: newColumns });
	},

	setCardSummary: (columnID: string, newCardSummaries: CardSummaryDTO[]) => {
		set(state => ({ cardSummaries: {
			...state.cardSummaries,
			[columnID]: newCardSummaries
		} }));
	}
}));

export { useBoardStore };
