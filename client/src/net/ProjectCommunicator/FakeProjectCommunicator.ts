import type ProjectDTO from "../../model/dto/ProjectDTO";
import type ProjectCommunicator from "./ProjectCommunicator";

export default class FakeProjectCommunicator implements ProjectCommunicator {
	async getOwnedAndSharedProjects(): Promise<ProjectDTO[]> {
		return [
			{
				id: '1',
				name: 'Project 1',
				numColumns: 4,
				numTasks: 8,
				owner: 'pyford'
			},
			{
				id: '2',
				name: 'Project 2',
				numColumns: 1,
				numTasks: 2,
				owner: 'pyford'
			},
			{
				id: '3',
				name: 'Project 3',
				numColumns: 0,
				numTasks: 0,
				owner: 'pyford'
			},
			{
				id: '4',
				name: 'Shared Project 1',
				numColumns: 4,
				numTasks: 8,
				owner: 'user1'
			},
			{
				id: '5',
				name: 'LONG NAME LONG NAME LONG NAME',
				numColumns: 4,
				numTasks: 8,
				owner: 'user2'
			},
			{
				id: '6',
				name: 'Shared Project 3',
				numColumns: 4,
				numTasks: 8,
				owner: 'user3'
			},
		]
	}

}