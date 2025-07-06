import { create } from 'zustand'
import type ProjectCommunicator from './net/ProjectCommunicator/ProjectCommunicator';
import FakeProjectCommunicator from './net/ProjectCommunicator/FakeProjectCommunicator';

interface ServiceState {
	projectCommunicator: ProjectCommunicator
}

const useServiceStore = create<ServiceState>()(set => ({
	projectCommunicator: new FakeProjectCommunicator()
}));

export { useServiceStore };
