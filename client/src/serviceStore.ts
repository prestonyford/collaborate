import { create } from 'zustand'
import type ProjectCommunicator from './net/ProjectCommunicator/ProjectCommunicator';
import FakeProjectCommunicator from './net/ProjectCommunicator/FakeProjectCommunicator';
import HttpProjectCommunicator from './net/ProjectCommunicator/HttpProjectCommunicator';

interface ServiceState {
	projectCommunicator: ProjectCommunicator
}

const useServiceStore = create<ServiceState>()(set => ({
	projectCommunicator: new HttpProjectCommunicator()
}));

export { useServiceStore };
