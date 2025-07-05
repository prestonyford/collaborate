import { create } from 'zustand'
import type CardCommunicator from '../../net/CardCommunicator/CardCommunicator';
import FakeCardCommunicator from '../../net/CardCommunicator/FakeCardCommunicator';
import type LabelCommunicator from '../../net/LabelCommunicator/LabelCommunicator';
import FakeLabelCommunicator from '../../net/LabelCommunicator/FakeLabelCommunicator';
import type TaskDTO from '../../model/dto/TaskDTO';
import type LabelDTO from '../../model/dto/LabelDTO';

const cardCommunicator: CardCommunicator = new FakeCardCommunicator();
const labelCommunicator: LabelCommunicator = new FakeLabelCommunicator();

interface TaskState {
	isLoading: boolean
	task: TaskDTO | null
	projectLabels: LabelDTO[]
	initialize: (projectID: string, taskID: string) => Promise<void>
	reset: () => void
}

const initialState = {
	isLoading: false,
	task: null,
	projectLabels: [],
}

const useTaskStore = create<TaskState>()(set => ({
	...initialState,
	initialize: async (projectID: string, taskID: string) => {
		set({ isLoading: true });
		try {
			const [task, projectLabels] = await Promise.all([
				cardCommunicator.getCardInfo(projectID, taskID),
				labelCommunicator.getProjectLabels(projectID),
			]);
			set({ task, projectLabels });
		} finally {
			set({ isLoading: false });
		}
	},
	reset: () => {
		set(initialState);
	}
}));

export { useTaskStore };
