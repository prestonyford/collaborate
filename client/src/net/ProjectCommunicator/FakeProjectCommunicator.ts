import type CardDiscussionItemDTO from "../../model/dto/CardDiscussionItemDTO";
import type CardSummaryDTO from "../../model/dto/CardSummaryDTO";
import type ColumnDTO from "../../model/dto/ColumnDTO";
import type LabelDTO from "../../model/dto/LabelDTO";
import type ProjectDTO from "../../model/dto/ProjectDTO";
import type TaskDTO from "../../model/dto/TaskDTO";
import type ProjectCommunicator from "./ProjectCommunicator";

export default class FakeProjectCommunicator implements ProjectCommunicator {
	async getOwnedAndSharedProjects(): Promise<ProjectDTO[]> {
		await new Promise(resolve => setTimeout(resolve, 500));
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
			{
				id: '7',
				name: 'Shared Project 3',
				numColumns: 4,
				numTasks: 8,
				owner: 'user3'
			},
			{
				id: '8',
				name: 'Shared Project 3',
				numColumns: 4,
				numTasks: 8,
				owner: 'user3'
			},
			{
				id: '9',
				name: 'Shared Project 3',
				numColumns: 4,
				numTasks: 8,
				owner: 'user3'
			},
			{
				id: '10',
				name: 'Shared Project 3',
				numColumns: 4,
				numTasks: 8,
				owner: 'user3'
			},
			{
				id: '11',
				name: 'Shared Project 3',
				numColumns: 4,
				numTasks: 8,
				owner: 'user3'
			},
			{
				id: '12',
				name: 'Shared Project 3',
				numColumns: 4,
				numTasks: 8,
				owner: 'user3'
			},
			{
				id: '13',
				name: 'Shared Project 3',
				numColumns: 4,
				numTasks: 8,
				owner: 'user3'
			},
		]
	}

	async getProjectLabels(projectID: string): Promise<LabelDTO[]> {
		return [
			{ id: '0', title: 'Frontend', color: '#f44336' },        // red
			{ id: '1', title: 'Backend', color: '#2196f3' },         // blue
			{ id: '2', title: 'In Progress', color: '#ffeb3b' },     // yellow
			{ id: '3', title: 'Design Review', color: '#4caf50' },   // green
			{ id: '4', title: 'UX', color: '#9c27b0' },              // purple
			{ id: '5', title: '🔥 Hotfix', color: '#ff5722' },       // deep orange
			{ id: '6', title: 'QA Needed', color: '#795548' },       // brown
			{ id: '7', title: 'v1.2.0-beta', color: '#607d8b' },     // blue grey
			{ id: '8', title: 'A', color: '#000000' },               // black
			{ id: '9', title: 'Z', color: '#ffffff' },               // white
			{ id: '10', title: 'This Label Has a Really Long Name', color: '#03a9f4' },
			{ id: '11', title: 'Done', color: '#cddc39' },           // lime
			{ id: '12', title: 'Stuck', color: '#e91e63' },          // pink
			{ id: '13', title: 'Low Priority', color: '#ff9800' },   // orange
			{ id: '14', title: 'Dark Theme Test', color: '#121212' } // very dark
		]
	}

	async getColumnsByProject(projectID: string): Promise<ColumnDTO[]> {
		return [
			{
				id: "1",
				name: "Column 1",
				color: "#ff6467"
			},
			{
				id: "2",
				name: "Column 2",
				color: "#00D3F2"
			},
			{
				id: "3",
				name: "Column 3",
				color: "#BBF451"
			},
			{
				id: "4",
				name: "Column 4",
				color: "#FFB900"
			},
		]
	}

	async getCardSummaries(projectID: string, columnID: string, pageSize: number, lastCardID: string | null): Promise<[CardSummaryDTO[], boolean]> {
		await new Promise(resolve => setTimeout(resolve, 200));
		return [
			columnID === "1" ? [
				{
					id: "1",
					columnID: "1",
					title: "Card 1",
					creationDate: 1750383235022,
					labels: ['0', '1', '2', '7']
				},
				{
					id: "2",
					columnID: "1",
					title: "Card 2",
					creationDate: 1750383235022,
					labels: ['5', '4']
				},
				{
					id: "3",
					columnID: "1",
					title: "Card 3",
					creationDate: 1750383235022,
					labels: ['12', '3']
				},
				{
					id: "4",
					columnID: "1",
					title: "Card 4",
					creationDate: 1750383235022,
					labels: ['0', '2', '3', '10', '1', '4', '5', '6']
				},
				{
					id: "5",
					columnID: "1",
					title: "Card 5",
					creationDate: 1750383235022,
					labels: []
				},
				{
					id: "6",
					columnID: "1",
					title: "Card 6",
					creationDate: 1750383235022,
					labels: ['13']
				}
			] : []
			, false];
	}

	async getCardInfo(projectID: string, cardID: string): Promise<TaskDTO> {
		await new Promise(resolve => setTimeout(resolve, 500));
		return {
			id: cardID,
			columnID: '1',
			title: 'Card Name!!',
			creationDate: 1751732710021,
			labels: ['1', '2'],
			createdBy: 'Preston Ford',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean congue consectetur facilisis. Integer egestas ut risus ut ultricies. Quisque feugiat ullamcorper mi eu semper. Proin vel sapien efficitur, semper lacus ac, tempor tellus. Sed ornare velit vitae nisi tristique euismod. Nulla fringilla laoreet mi, eu semper mi posuere ac. Pellentesque eu rhoncus orci, ac rhoncus sapien. Aliquam pulvinar mauris eu leo aliquam, eu dictum leo molestie. Donec volutpat elementum pulvinar. Donec cursus, lacus at facilisis tincidunt, lorem lectus placerat augue, in pretium lectus elit et purus.',
			activity: []
		}
	}

	async updateCardDescription(projectID: string, cardID: string, description: string): Promise<void> {
		await new Promise(resolve => setTimeout(resolve, 2000));
		console.log(`Saving card description ${cardID}: ${description}`);
	}

	async getCardDiscussion(projectID: string, cardID: string, pageSize: number, lastItemID: string | null): Promise<[boolean, CardDiscussionItemDTO[]]> {
		return [false, [
			{
				id: 'cmt_1',
				taskID: 'task_123',
				authorID: 'user_1',
				content: 'Initial question or comment.',
				createdAt: Date.now() - 100000,
				parentID: null
			},
			{
				id: 'cmt_2',
				taskID: 'task_123',
				authorID: 'user_2',
				content: 'Reply to the first comment.',
				createdAt: Date.now() - 90000,
				parentID: 'cmt_1'
			},
			{
				id: 'cmt_3',
				taskID: 'task_123',
				authorID: 'user_3',
				content: 'Another top-level comment.',
				createdAt: Date.now() - 80000,
				parentID: null
			},
			{
				id: 'cmt_4',
				taskID: 'task_123',
				authorID: 'user_2',
				content: 'Second-level reply.',
				createdAt: Date.now() - 70000,
				parentID: 'cmt_2'
			},
			{
				id: 'cmt_5',
				taskID: 'task_123',
				authorID: 'user_1',
				content: 'Reply to second top-level.',
				createdAt: Date.now() - 60000,
				parentID: 'cmt_3'
			},
			{
				id: 'cmt_6',
				taskID: 'task_123',
				authorID: 'user_4',
				content: 'Third top-level comment.',
				createdAt: Date.now() - 50000,
				parentID: null
			}
		]];
	}
}