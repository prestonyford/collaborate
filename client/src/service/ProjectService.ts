import type CardDiscussionItemDTO from "../model/dto/CardDiscussionItemDTO";
import type CardSummaryDTO from "../model/dto/CardSummaryDTO";
import type ColumnDTO from "../model/dto/ColumnDTO";
import type LabelDTO from "../model/dto/LabelDTO";
import type ProjectDTO from "../model/dto/ProjectDTO";
import type TaskDTO from "../model/dto/TaskDTO";
import type ProjectCommunicator from "../net/ProjectCommunicator/ProjectCommunicator";

export default class ProjectService {
	private readonly communicator: ProjectCommunicator

	constructor(communicator: ProjectCommunicator) {
		this.communicator = communicator;
	}

	async getOwnedAndSharedProjects(): Promise<ProjectDTO[]> {
		return this.communicator.getOwnedAndSharedProjects();
	}
	async getProjectLabels(projectID: string): Promise<LabelDTO[]> {
		return this.communicator.getProjectLabels(projectID);
	}
	async getColumnsByProject(projectID: string): Promise<ColumnDTO[]> {
		return this.communicator.getColumnsByProject(projectID);
	}
	async getCardSummaries(projectID: string, columnID: string, pageSize: number, lastCardID: string | null): Promise<[CardSummaryDTO[], boolean]> {
		return this.communicator.getCardSummaries(projectID, columnID, pageSize, lastCardID);
	}
	async getCardInfo(projectID: string, taskID: string): Promise<TaskDTO> {
		return this.communicator.getCardInfo(projectID, taskID);
	}
	async updateCardDescription(projectID: string, cardID: string, description: string): Promise<void> {
		throw this.communicator.updateCardDescription(projectID, cardID, description);
	}
	async getCardDiscussion(projectID: string, cardID: string, pageSize: number, lastItemID: string | null): Promise<[boolean, CardDiscussionItemDTO[]]> {
		throw this.communicator.getCardDiscussion(projectID, cardID, pageSize, lastItemID);
	}
}
