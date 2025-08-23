import type CardDiscussionItemDTO from "../../model/dto/CardDiscussionItemDTO";
import type CardSummaryDTO from "../../model/dto/CardSummaryDTO";
import type ColumnDTO from "../../model/dto/ColumnDTO";
import type LabelDTO from "../../model/dto/LabelDTO";
import type ProjectDTO from "../../model/dto/ProjectDTO";
import type ProjectShare from "../../model/dto/ProjectShare";
import type TaskDTO from "../../model/dto/TaskDTO";
import HttpCommunicator from "../HttpCommunicator";
import type CreateProjectRequest from "../request/CreateProjectRequest";
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
	async getProject(projectId: number): Promise<ProjectDTO> {
		return this.makeRequest<ProjectDTO>(`/projects/${projectId}`);
	}
	async createProject(data: CreateProjectRequest): Promise<ProjectDTO> {
		return this.makeRequest<ProjectDTO>(`/projects`, {
			method: 'POST',
			body: JSON.stringify(data)
		});
	}
	async getProjectLabels(projectId: number): Promise<LabelDTO[]> {
		return this.makeRequest<LabelDTO[]>(`/projects/${projectId}/labels`);
	}
	async getProjectLabelCounts(projectId: number): Promise<Record<number, number>> {
		return this.makeRequest<Record<number, number>>(`/projects/${projectId}/labelCounts`);
	}
	async getColumnsByProject(projectId: number): Promise<ColumnDTO[]> {
		return this.makeRequest<ColumnDTO[]>(`/projects/${projectId}/columns`);
	}
	async createColumn(projectId: number, name: string, color: string): Promise<ColumnDTO> {
		return this.makeRequest<ColumnDTO>(`/projects/${projectId}/columns`, {
			method: 'POST',
			body: JSON.stringify({ name, color })
		});
	}
	async createTask(projectId: number, columnId: number, createData: CreateTaskRequest): Promise<TaskDTO> {
		return this.makeRequest<TaskDTO>(`/projects/${projectId}/columns/${columnId}/tasks`, {
			method: 'POST',
			body: JSON.stringify(createData)
		});
	}
	async getCardSummaries(projectId: number, columnId: number, pageSize: number, lastCardID: number | null): Promise<[CardSummaryDTO[], boolean]> {
		const params = new URLSearchParams({
			limit: pageSize.toString(),
		});
		if (lastCardID) {
			params.set("last", lastCardID.toString());
		}
		const response = await this.makeRequest<{tasks: CardSummaryDTO[], hasMore: boolean}>(`/projects/${projectId}/columns/${columnId}/taskSummaries?${params}`);
		return [response.tasks, response.hasMore];
	}
	async getCardInfo(projectId: number, taskID: number): Promise<TaskDTO> {
		return this.makeRequest(`/projects/${projectId}/tasks/${taskID}`);
	}
	async updateCard(projectId: number, taskID: number, diff: TaskDTO): Promise<Partial<TaskDTO>> {
		return await this.makeRequest<Partial<TaskDTO>>(`/projects/${projectId}/tasks/${taskID}`, {
			method: 'PATCH',
			body: JSON.stringify(diff)
		});
	}
	async getCardDiscussion(projectId: number, taskID: number, pageSize: number, lastItemID: string | null): Promise<[boolean, CardDiscussionItemDTO[]]> {
		throw new Error("Method not implemented.");
	}
	async getProjectShares(projectId: number): Promise<ProjectShare[]> {
		return this.makeRequest<ProjectShare[]>(`/projects/${projectId}/shares`);
	}
	async shareProject(shareData: ShareProjectRequest): Promise<ProjectShare[]> {
		return this.makeRequest<ProjectShare[]>(`/projects/${shareData.projectId}/shares`, {
			method: 'POST',
			body: JSON.stringify(shareData)
		});
	}
	async updateProject(projectId: number, diff: Partial<ProjectDTO>): Promise<ProjectDTO> {
		return await this.makeRequest<ProjectDTO>(`/projects/${projectId}`, {
			method: 'PATCH',
			body: JSON.stringify(diff)
		});
	}
}
