import { create } from 'zustand'
import type ColumnDTO from '../../model/dto/ColumnDTO';
import type ColumnCommunicator from '../../net/ColumnCommunicator/ColumnCommunicator';
import FakeColumnCommunicator from '../../net/ColumnCommunicator/FakeColumnCommunicator';

const columnCommunicator: ColumnCommunicator = new FakeColumnCommunicator();

interface ProjectState {
	isLoading: boolean
	columns: ColumnDTO[]
	initialize: (projectID: string) => Promise<void>
}

const useBoardStore = create<ProjectState>()(set => ({
	isLoading: false,
	columns: [],
	
	initialize: async (projectID: string) => {
		set({ isLoading: true });
		try {
			const newColumns = await columnCommunicator.getColumnsByProject(projectID);
			set({ columns: newColumns });
		} finally {
			set({ isLoading: false });
		}
	},
}));

export { useBoardStore };