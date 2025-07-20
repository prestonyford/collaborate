import type CardDiscussionItemDTO from "../../model/dto/CardDiscussionItemDTO";
import type CardSummaryDTO from "../../model/dto/CardSummaryDTO";
import type ColumnDTO from "../../model/dto/ColumnDTO";
import type LabelDTO from "../../model/dto/LabelDTO";
import type ProjectDTO from "../../model/dto/ProjectDTO";
import type TaskDTO from "../../model/dto/TaskDTO";
import HttpCommunicator from "../HttpCommunicator";
import type ProjectCommunicator from "./ProjectCommunicator";

export default class HttpProjectCommunicator extends HttpCommunicator implements ProjectCommunicator {
	async getOwnedAndSharedProjects(): Promise<ProjectDTO[]> {
		return this.makeRequest<ProjectDTO[]>(`/projects`);
	}
	async getProject(projectID: string): Promise<ProjectDTO> {
		return this.makeRequest<ProjectDTO>(`/projects/${projectID}`);
	}
	async getProjectLabels(projectID: string): Promise<LabelDTO[]> {
		return this.makeRequest<LabelDTO[]>(`/projects/${projectID}/labels`);
	}
	async getColumnsByProject(projectID: string): Promise<ColumnDTO[]> {
		return this.makeRequest<ColumnDTO[]>(`/projects/${projectID}/columns`);
	}
	async createColumn(projectID: string, name: string, color: string): Promise<ColumnDTO> {
		return this.makeRequest<ColumnDTO>(`/projects/${projectID}/columns`, {
			method: 'POST',
			body: JSON.stringify({ name, color })
		});
	}
	async createTask(projectID: string, columnID: string, name: string, description: string): Promise<TaskDTO> {
		return this.makeRequest<TaskDTO>(`/projects/${projectID}/columns/${columnID}/tasks`, {
			method: 'POST',
			body: JSON.stringify({ title: name, description })
		});
	}
	async getCardSummaries(projectID: string, columnID: string, pageSize: number, lastCardID: string | null): Promise<[CardSummaryDTO[], boolean]> {
		const params = new URLSearchParams({
			limit: pageSize.toString(),
		});
		if (lastCardID) {
			params.set("last", lastCardID);
		}
		const response = await this.makeRequest<{tasks: CardSummaryDTO[], hasMore: boolean}>(`/projects/${projectID}/columns/${columnID}/taskSummaries?${params}`);
		return [response.tasks, response.hasMore];
	}
	async getCardInfo(projectID: string, taskID: string): Promise<TaskDTO> {
		return this.makeRequest(`/projects/${projectID}/tasks/${taskID}`);
	}
	async updateCard(projectID: string, taskID: string, diff: TaskDTO): Promise<Partial<TaskDTO>> {
		return await this.makeRequest<Partial<TaskDTO>>(`/projects/${projectID}/tasks/${taskID}`, {
			method: 'PATCH',
			body: JSON.stringify(diff)
		});
	}
	async getCardDiscussion(projectID: string, cardID: string, pageSize: number, lastItemID: string | null): Promise<[boolean, CardDiscussionItemDTO[]]> {
		throw new Error("Method not implemented.");
	}
}
