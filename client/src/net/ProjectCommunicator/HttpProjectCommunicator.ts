import type CardDiscussionItemDTO from "../../model/dto/CardDiscussionItemDTO";
import type CardSummaryDTO from "../../model/dto/CardSummaryDTO";
import type ColumnDTO from "../../model/dto/ColumnDTO";
import type LabelDTO from "../../model/dto/LabelDTO";
import type ProjectDTO from "../../model/dto/ProjectDTO";
import type ProjectShare from "../../model/dto/ProjectShare";
import type TaskDTO from "../../model/dto/TaskDTO";
import HttpCommunicator from "../HttpCommunicator";
import type CreateTaskRequest from "../request/CreateTaskRequest";
import type ShareProjectRequest from "../request/ShareProjectRequest";
import type ProjectCommunicator from "./ProjectCommunicator";

export default class HttpProjectCommunicator extends HttpCommunicator implements ProjectCommunicator {
	public constructor() {
		super("/api");
	}

	async getOwnedAndSharedProjects(): Promise<ProjectDTO[]> {
		return this.makeRequest<ProjectDTO[]>(`/projects`);
	}
	async getProject(projectId: string): Promise<ProjectDTO> {
		return this.makeRequest<ProjectDTO>(`/projects/${projectId}`);
	}
	async getProjectLabels(projectId: string): Promise<LabelDTO[]> {
		return this.makeRequest<LabelDTO[]>(`/projects/${projectId}/labels`);
	}
	async getColumnsByProject(projectId: string): Promise<ColumnDTO[]> {
		return this.makeRequest<ColumnDTO[]>(`/projects/${projectId}/columns`);
	}
	async createColumn(projectId: string, name: string, color: string): Promise<ColumnDTO> {
		return this.makeRequest<ColumnDTO>(`/projects/${projectId}/columns`, {
			method: 'POST',
			body: JSON.stringify({ name, color })
		});
	}
	async createTask(projectId: string, columnId: string, createData: CreateTaskRequest): Promise<TaskDTO> {
		return this.makeRequest<TaskDTO>(`/projects/${projectId}/columns/${columnId}/tasks`, {
			method: 'POST',
			body: JSON.stringify(createData)
		});
	}
	async getCardSummaries(projectId: string, columnId: string, pageSize: number, lastCardID: string | null): Promise<[CardSummaryDTO[], boolean]> {
		const params = new URLSearchParams({
			limit: pageSize.toString(),
		});
		if (lastCardID) {
			params.set("last", lastCardID);
		}
		const response = await this.makeRequest<{tasks: CardSummaryDTO[], hasMore: boolean}>(`/projects/${projectId}/columns/${columnId}/taskSummaries?${params}`);
		return [response.tasks, response.hasMore];
	}
	async getCardInfo(projectId: string, taskID: string): Promise<TaskDTO> {
		return this.makeRequest(`/projects/${projectId}/tasks/${taskID}`);
	}
	async updateCard(projectId: string, taskID: string, diff: TaskDTO): Promise<Partial<TaskDTO>> {
		return await this.makeRequest<Partial<TaskDTO>>(`/projects/${projectId}/tasks/${taskID}`, {
			method: 'PATCH',
			body: JSON.stringify(diff)
		});
	}
	async getCardDiscussion(projectId: string, taskID: string, pageSize: number, lastItemID: string | null): Promise<[boolean, CardDiscussionItemDTO[]]> {
		throw new Error("Method not implemented.");
	}
	async getProjectShares(projectId: string): Promise<ProjectShare[]> {
		throw new Error("Method not implemented.");
	}
	async shareProject(shareData: ShareProjectRequest): Promise<ProjectShare[]> {
		throw new Error("Method not implemented.");
	}
}
