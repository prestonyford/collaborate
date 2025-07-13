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
		return this.makeRequest("/projects");
	}
	async getProjectLabels(projectID: string): Promise<LabelDTO[]> {
		return this.makeRequest(`/projectLabels?id=${projectID}`);
	}
	async getColumnsByProject(projectID: string): Promise<ColumnDTO[]> {
		return this.makeRequest(`/projectColumns?id=${projectID}`);
	}
	async getCardSummaries(projectID: string, columnID: string, pageSize: number, lastCardID: string | null): Promise<[CardSummaryDTO[], boolean]> {
		const params = new URLSearchParams({
			id: projectID,
			colid: columnID,
			size: pageSize.toString(),
		});
		if (lastCardID) {
			params.set("last", lastCardID);
		}
		return this.makeRequest(`/projectCardSummaries?${params}`);
	}
	async getCardInfo(projectID: string, taskID: string): Promise<TaskDTO> {
		return this.makeRequest(`/cardInfo?id=${projectID}&taskid=${taskID}`);
	}
	async updateCardDescription(projectID: string, cardID: string, description: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
	async getCardDiscussion(projectID: string, cardID: string, pageSize: number, lastItemID: string | null): Promise<[boolean, CardDiscussionItemDTO[]]> {
		throw new Error("Method not implemented.");
	}
}
