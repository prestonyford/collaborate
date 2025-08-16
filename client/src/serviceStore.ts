import { create } from 'zustand'
import type ProjectCommunicator from './net/ProjectCommunicator/ProjectCommunicator';
import FakeProjectCommunicator from './net/ProjectCommunicator/FakeProjectCommunicator';
import HttpProjectCommunicator from './net/ProjectCommunicator/HttpProjectCommunicator';
import ProjectService from './service/ProjectService';
import AuthService from './service/AuthService';
import HttpAuthCommunicator from './net/AuthCommunicator/HttpAuthCommunicator';
import UserService from './service/UserService';
import FakeUserCommunicator from './net/UserCommunicator/FakeUserCommunicator';
import HttpUserCommunicator from './net/UserCommunicator/HttpUserCommunicator';

interface ServiceState {
	projectService: ProjectService
	authService: AuthService
	userService: UserService
}

const useServiceStore = create<ServiceState>()(set => ({
	projectService: new ProjectService(new FakeProjectCommunicator()),
	authService: new AuthService(new HttpAuthCommunicator()),
	userService: new UserService(HttpUserCommunicator.getInstance()) // Should probably make all the rest singletons too
}));

export { useServiceStore };
