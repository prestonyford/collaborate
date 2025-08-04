import type CardDiscussionItemDTO from "../model/dto/CardDiscussionItemDTO";
import type CardSummaryDTO from "../model/dto/CardSummaryDTO";
import type ColumnDTO from "../model/dto/ColumnDTO";
import type LabelDTO from "../model/dto/LabelDTO";
import type ProjectDTO from "../model/dto/ProjectDTO";
import type ProjectShare from "../model/dto/ProjectShare";
import type TaskDTO from "../model/dto/TaskDTO";
import { NotFoundError } from "../net/Errors";
import type ProjectCommunicator from "../net/ProjectCommunicator/ProjectCommunicator";
import type CreateTaskRequest from "../net/request/CreateTaskRequest";
import type ShareProjectRequest from "../net/request/ShareProjectRequest";

export default class ProjectService {
	private readonly communicator: ProjectCommunicator

	public constructor(communicator: ProjectCommunicator) {
		this.communicator = communicator;
	}

	public async getOwnedAndSharedProjects(): Promise<ProjectDTO[]> {
		return this.communicator.getOwnedAndSharedProjects();
	}
	public async getProject(projectId: string): Promise<ProjectDTO> {
		try {
			return await this.communicator.getProject(projectId);
		} catch (error) {
			if (error instanceof NotFoundError) {
				throw new NotFoundError("The requested project was not found (has it been shared with you?).");
			}
			throw error;
		}
	}
	public async getProjectLabels(projectId: string): Promise<LabelDTO[]> {
		return this.communicator.getProjectLabels(projectId);
	}
	public async getColumnsByProject(projectId: string): Promise<ColumnDTO[]> {
		return this.communicator.getColumnsByProject(projectId);
	}
	public async getProjectShares(projectId: string): Promise<ProjectShare[]> {
		return this.communicator.getProjectShares(projectId);
	}
	public async createColumn(projectId: string, name: string, color: string): Promise<ColumnDTO> {
		return this.communicator.createColumn(projectId, name, color);
	}
	public async createTask(projectId: string, columnId: string, createData: CreateTaskRequest): Promise<TaskDTO> {
		return this.communicator.createTask(projectId, columnId, createData);
	}
	public async getCardSummaries(projectId: string, columnId: string, pageSize: number, lastCardID: string | null): Promise<[CardSummaryDTO[], boolean]> {
		return this.communicator.getCardSummaries(projectId, columnId, pageSize, lastCardID);
	}
	public async getCardInfo(projectId: string, taskID: string): Promise<TaskDTO> {
		try {
			return await this.communicator.getCardInfo(projectId, taskID);
		} catch (error) {
			if (error instanceof NotFoundError) {
				throw new NotFoundError("The requested task was not found.");
			}
			throw error;
		}
	}
	public async updateCardDescription(projectId: string, taskID: string, description: string): Promise<string> {
		const newTask = await this.communicator.updateCard(projectId, taskID, { description });
		return newTask.description ?? description;
	}
	public async updateCardTitle(projectId: string, taskID: string, title: string): Promise<string> {
		const newTask = await this.communicator.updateCard(projectId, taskID, { title });
		return newTask.title ?? title;
	}
	public async getCardDiscussion(projectId: string, cardID: string, pageSize: number, lastItemID: string | null): Promise<[boolean, CardDiscussionItemDTO[]]> {
		return this.communicator.getCardDiscussion(projectId, cardID, pageSize, lastItemID);
	}
	public async updateCardLabels(projectId: string, cardID: string, labels: string[]): Promise<void> {
		await this.communicator.updateCard(projectId, cardID, { labels });
	}
	public async shareProject(shareData: ShareProjectRequest): Promise<ProjectShare[]> {
		return this.communicator.shareProject(shareData);
	}
}
