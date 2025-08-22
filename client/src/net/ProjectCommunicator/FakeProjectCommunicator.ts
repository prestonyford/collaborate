import type CardDiscussionItemDTO from "../../model/dto/CardDiscussionItemDTO";
import type CardSummaryDTO from "../../model/dto/CardSummaryDTO";
import type ColumnDTO from "../../model/dto/ColumnDTO";
import type LabelDTO from "../../model/dto/LabelDTO";
import type ProjectDTO from "../../model/dto/ProjectDTO";
import type ProjectShare from "../../model/dto/ProjectShare";
import type TaskDTO from "../../model/dto/TaskDTO";
import type CreateTaskRequest from "../request/CreateTaskRequest";
import type ShareProjectRequest from "../request/ShareProjectRequest";
import type ProjectCommunicator from "./ProjectCommunicator";

export default class FakeProjectCommunicator implements ProjectCommunicator {
	async getOwnedAndSharedProjects(): Promise<ProjectDTO[]> {
		await new Promise(resolve => setTimeout(resolve, 500));
		return [
			{
				id: 1,
				name: 'Project 1',
				numColumns: 4,
				numTasks: 8,
				owner: 'pyford'
			},
			{
				id: 2,
				name: 'Project 2',
				numColumns: 1,
				numTasks: 2,
				owner: 'pyford'
			},
			{
				id: 3,
				name: 'Project 3',
				numColumns: 0,
				numTasks: 0,
				owner: 'pyford'
			},
			{
				id: 4,
				name: 'Shared Project 1',
				numColumns: 4,
				numTasks: 8,
				owner: 'user1'
			},
			{
				id: 5,
				name: 'Shared Project 2',
				numColumns: 4,
				numTasks: 8,
				owner: 'user2'
			},
			{
				id: 6,
				name: 'Shared Project 3',
				numColumns: 4,
				numTasks: 8,
				owner: 'user3'
			},
			{
				id: 7,
				name: 'Shared Project 4',
				numColumns: 4,
				numTasks: 8,
				owner: 'user3'
			},
			{
				id: 8,
				name: 'Shared Project 5',
				numColumns: 4,
				numTasks: 8,
				owner: 'user3'
			},
			{
				id: 9,
				name: 'Shared Project 6',
				numColumns: 4,
				numTasks: 8,
				owner: 'user3'
			},
			{
				id: 10,
				name: 'Shared Project 7',
				numColumns: 4,
				numTasks: 8,
				owner: 'user3'
			},
			{
				id: 11,
				name: 'Shared Project 8',
				numColumns: 4,
				numTasks: 8,
				owner: 'user3'
			},
			{
				id: 12,
				name: 'Shared Project 9',
				numColumns: 4,
				numTasks: 8,
				owner: 'user3'
			},
			{
				id: 13,
				name: 'Shared Project 10',
				numColumns: 4,
				numTasks: 8,
				owner: 'user3'
			},
			{
				id: 14,
				name: 'Shared Project 11',
				numColumns: 4,
				numTasks: 8,
				owner: 'user3'
			},
			{
				id: 15,
				name: 'Shared Project 12',
				numColumns: 4,
				numTasks: 8,
				owner: 'user3'
			},
			{
				id: 16,
				name: 'Shared Project 13',
				numColumns: 4,
				numTasks: 8,
				owner: 'user3'
			},
		]
	}

	async getProject(projectId: number): Promise<ProjectDTO> {
		return {
			id: projectId,
			name: 'Project 1',
			numColumns: 3,
			numTasks: 2,
			owner: 'pyford'
		}
	}

	async getProjectLabels(projectId: number): Promise<LabelDTO[]> {
		return [
			{ id: 0, projectId, title: 'Frontend', color: '#f44336' },        // red
			{ id: 1, projectId, title: 'Backend', color: '#2196f3' },         // blue
			{ id: 2, projectId, title: 'In Progress', color: '#ffeb3b' },     // yellow
			{ id: 3, projectId, title: 'Design Review', color: '#4caf50' },   // green
			{ id: 4, projectId, title: 'UX', color: '#9c27b0' },              // purple
			{ id: 5, projectId, title: '🔥 Hotfix', color: '#ff5722' },       // deep orange
			{ id: 6, projectId, title: 'QA Needed', color: '#795548' },       // brown
			{ id: 7, projectId, title: 'v1.2.0-beta', color: '#607d8b' },     // blue grey
			{ id: 8, projectId, title: 'A', color: '#000000' },               // black
			{ id: 9, projectId, title: 'Z', color: '#ffffff' },               // white
			{ id: 10, projectId, title: 'This Label Has a Really Long Name', color: '#03a9f4' },
			{ id: 11, projectId, title: 'Done', color: '#cddc39' },           // lime
			{ id: 12, projectId, title: 'Stuck', color: '#e91e63' },          // pink
			{ id: 13, projectId, title: 'Low Priority', color: '#ff9800' },   // orange
			{ id: 14, projectId, title: 'Dark Theme Test', color: '#121212' } // very dark
		]
	}

	
	async getProjectLabelCounts(projectId: number): Promise<Record<number, number>> {
		return {
			0: 2,
			1: 1,
			2: 3,
			3: 4,
			4: 0,
			5: 6
		}
	}

	async getColumnsByProject(projectId: number): Promise<ColumnDTO[]> {
		// throw new Error("error");
		return [
			{
				id: 1,
				projectId,
				name: "Column 1",
				color: "#ff6467"
			},
			{
				id: 2,
				projectId,
				name: "Column 2",
				color: "#00D3F2"
			},
			{
				id: 3,
				projectId,
				name: "Column 3",
				color: "#BBF451"
			},
			{
				id: 4,
				projectId,
				name: "Column 4",
				color: "#FFB900"
			},
		]
	}

	async getProjectShares(projectId: number): Promise<ProjectShare[]> {
		return [
			{
				id: 1,
				projectId: projectId,
				sharedWith: 'user_123',
				sharedBy: 'user_999',
				sharedTime: Date.now() - 1000000
			},
			{
				id: 2,
				projectId: projectId,
				sharedWith: 'user_456',
				sharedBy: 'user_999',
				sharedTime: Date.now() - 900000
			},
			{
				id: 3,
				projectId: projectId,
				sharedWith: 'user_789',
				sharedBy: 'user_777',
				sharedTime: Date.now() - 700000
			}
		];
	}

	async createColumn(projectId: number, name: string, color: string): Promise<ColumnDTO> {
		return {
			id: 999,
			projectId,
			name,
			color
		}
	}

	async createTask(projectId: number, columnId: number, createData: CreateTaskRequest): Promise<TaskDTO> {
		throw new Error("Method not implemented.");
	}

	async getCardSummaries(projectId: number, columnId: number, pageSize: number, lastcardID: number | null): Promise<[CardSummaryDTO[], boolean]> {
		await new Promise(resolve => setTimeout(resolve, 200));
		return [
			columnId === 1 ? [
				{
					id: 1,
					columnId,
					title: "Card 1",
					creationDate: 1750383235022,
					labels: [0, 1, 2, 7]
				},
				{
					id: 2,
					columnId,
					title: "Card 2",
					creationDate: 1750383235022,
					labels: [5, 4]
				},
				{
					id: 3,
					columnId,
					title: "Card 3",
					creationDate: 1750383235022,
					labels: [12, 3]
				},
				{
					id: 4,
					columnId,
					title: "Card 4",
					creationDate: 1750383235022,
					labels: [0, 2, 3, 10, 1, 4, 5, 6]
				},
				{
					id: 5,
					columnId,
					title: "Card 5",
					creationDate: 1750383235022,
					labels: []
				},
				{
					id: 6,
					columnId,
					title: "Card 6",
					creationDate: 1750383235022,
					labels: [13]
				}
			] : []
			, false];
	}

	async getCardInfo(projectId: number, cardID: number): Promise<TaskDTO> {
		await new Promise(resolve => setTimeout(resolve, 500));
		return {
			id: cardID,
			projectId: projectId,
			columnId: cardID,
			title: 'Card Name!!',
			creationDate: 1751732710021,
			labels: [1, 2],
			createdBy: 'Preston Ford',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean congue consectetur facilisis. Integer egestas ut risus ut ultricies. Quisque feugiat ullamcorper mi eu semper. Proin vel sapien efficitur, semper lacus ac, tempor tellus. Sed ornare velit vitae nisi tristique euismod. Nulla fringilla laoreet mi, eu semper mi posuere ac. Pellentesque eu rhoncus orci, ac rhoncus sapien. Aliquam pulvinar mauris eu leo aliquam, eu dictum leo molestie. Donec volutpat elementum pulvinar. Donec cursus, lacus at facilisis tincidunt, lorem lectus placerat augue, in pretium lectus elit et purus.',
			activity: []
		}
	}

	async updateCard(projectId: number, taskID: number, diff: TaskDTO): Promise<Partial<TaskDTO>> {
		await new Promise(resolve => setTimeout(resolve, 2000));
		console.log(`Updating task ${taskID}: ${diff}`);
		return diff;
	}
	async getCardDiscussion(projectId: number, cardID: number, pageSize: number, lastItemID: string | null): Promise<[boolean, CardDiscussionItemDTO[]]> {
		return [false, [
			{
				id: 1,
				taskID: cardID,
				authorID: 'user_1',
				content: 'Initial question or comment.',
				createdAt: Date.now() - 100000,
				parentID: null
			},
			{
				id: 2,
				taskID: cardID,
				authorID: 'user_2',
				content: 'Reply to the first comment.',
				createdAt: Date.now() - 90000,
				parentID: 'cmt_1'
			},
			{
				id: 3,
				taskID: cardID,
				authorID: 'user_3',
				content: 'Another top-level comment.',
				createdAt: Date.now() - 80000,
				parentID: null
			},
			{
				id: 4,
				taskID: cardID,
				authorID: 'user_2',
				content: 'Second-level reply.',
				createdAt: Date.now() - 70000,
				parentID: 'cmt_2'
			},
			{
				id: 5,
				taskID: cardID,
				authorID: 'user_1',
				content: 'Reply to second top-level.',
				createdAt: Date.now() - 60000,
				parentID: 'cmt_3'
			},
			{
				id: 6,
				taskID: cardID,
				authorID: 'user_4',
				content: 'Third top-level comment.',
				createdAt: Date.now() - 50000,
				parentID: null
			}
		]];
	}

	async shareProject(shareData: ShareProjectRequest): Promise<ProjectShare[]> {
		await new Promise(resolve => setTimeout(resolve, 1000));
		return shareData.usernames.map((username, i) => ({
			id: i,
			projectId: shareData.projectId,
			sharedWith: username,
			sharedBy: 'user_999',
			sharedTime: Date.now() - 1000000
		}));
	}
}