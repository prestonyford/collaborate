import { create } from 'zustand'
import type ProjectCommunicator from './net/ProjectCommunicator/ProjectCommunicator';
import FakeProjectCommunicator from './net/ProjectCommunicator/FakeProjectCommunicator';
import HttpProjectCommunicator from './net/ProjectCommunicator/HttpProjectCommunicator';
import ProjectService from './service/ProjectService';
import AuthService from './service/AuthService';
import HttpAuthCommunicator from './net/AuthCommunicator/HttpAuthCommunicator';

interface ServiceState {
	projectService: ProjectService
	authService: AuthService
}

const useServiceStore = create<ServiceState>()(set => ({
	projectService: new ProjectService(new HttpProjectCommunicator()),
	authService: new AuthService(new HttpAuthCommunicator())
}));

export { useServiceStore };
