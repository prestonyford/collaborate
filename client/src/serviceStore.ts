import { create } from 'zustand'
import type ProjectCommunicator from './net/ProjectCommunicator/ProjectCommunicator';
import FakeProjectCommunicator from './net/ProjectCommunicator/FakeProjectCommunicator';
import HttpProjectCommunicator from './net/ProjectCommunicator/HttpProjectCommunicator';
import ProjectService from './service/ProjectService';

interface ServiceState {
	projectService: ProjectService
}

const useServiceStore = create<ServiceState>()(set => ({
	projectService: new ProjectService(new HttpProjectCommunicator())
}));

export { useServiceStore };
