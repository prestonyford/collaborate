import type CardDiscussionItemDTO from "../model/dto/CardDiscussionItemDTO";
import type CardSummaryDTO from "../model/dto/CardSummaryDTO";
import type ColumnDTO from "../model/dto/ColumnDTO";
import type LabelDTO from "../model/dto/LabelDTO";
import type ProjectDTO from "../model/dto/ProjectDTO";
import type ProjectShare from "../model/dto/ProjectShare";
import type TaskDTO from "../model/dto/TaskDTO";
import { HttpError, NotFoundError } from "../net/Errors";
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
	public async getProject(projectId: number): Promise<ProjectDTO> {
		try {
			return await this.communicator.getProject(projectId);
		} catch (error) {
			if (error instanceof HttpError && (error.status === 403 || error.status === 404)) {
				throw new NotFoundError("The requested project was not found (has it been shared with you?).");
			}
			throw error;
		}
	}
	public async getProjectLabels(projectId: number): Promise<LabelDTO[]> {
		return this.communicator.getProjectLabels(projectId);
	}
	public async getProjectLabelCounts(projectId: number): Promise<Record<number, number>> {
		return this.communicator.getProjectLabelCounts(projectId);
	}
	public async getColumnsByProject(projectId: number): Promise<ColumnDTO[]> {
		return this.communicator.getColumnsByProject(projectId);
	}
	public async getProjectShares(projectId: number): Promise<ProjectShare[]> {
		return this.communicator.getProjectShares(projectId);
	}
	public async createColumn(projectId: number, name: string, color: string): Promise<ColumnDTO> {
		return this.communicator.createColumn(projectId, name, color);
	}
	public async createTask(projectId: number, columnId: number, createData: CreateTaskRequest): Promise<TaskDTO> {
		return this.communicator.createTask(projectId, columnId, createData);
	}
	public async getCardSummaries(projectId: number, columnId: number, pageSize: number, lastCardID: number | null): Promise<[CardSummaryDTO[], boolean]> {
		return this.communicator.getCardSummaries(projectId, columnId, pageSize, lastCardID);
	}
	public async getCardInfo(projectId: number, taskID: number): Promise<TaskDTO> {
		try {
			return await this.communicator.getCardInfo(projectId, taskID);
		} catch (error) {
			if (error instanceof NotFoundError) {
				throw new NotFoundError("The requested task was not found.");
			}
			throw error;
		}
	}
	public async updateCardDescription(projectId: number, taskID: number, description: string): Promise<string> {
		const newTask = await this.communicator.updateCard(projectId, taskID, { description });
		return newTask.description ?? description;
	}
	public async updateCardTitle(projectId: number, taskID: number, title: string): Promise<string> {
		const newTask = await this.communicator.updateCard(projectId, taskID, { title });
		return newTask.title ?? title;
	}
	public async getCardDiscussion(projectId: number, cardID: number, pageSize: number, lastItemID: string | null): Promise<[boolean, CardDiscussionItemDTO[]]> {
		return this.communicator.getCardDiscussion(projectId, cardID, pageSize, lastItemID);
	}
	public async updateCardLabels(projectId: number, cardID: number, labels: number[]): Promise<void> {
		await this.communicator.updateCard(projectId, cardID, { labels });
	}
	public async shareProject(shareData: ShareProjectRequest): Promise<ProjectShare[]> {
		return await this.communicator.shareProject(shareData);
	}
	public async updateProjectName(projectId: number, name: string): Promise<ProjectDTO> {
		return await this.communicator.updateProject(projectId, { name });
	}
}
