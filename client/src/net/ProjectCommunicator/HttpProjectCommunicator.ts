import type CardDiscussionItemDTO from "../../model/dto/CardDiscussionItemDTO";
import type CardSummaryDTO from "../../model/dto/CardSummaryDTO";
import type ColumnDTO from "../../model/dto/ColumnDTO";
import type LabelDTO from "../../model/dto/LabelDTO";
import type ProjectDTO from "../../model/dto/ProjectDTO";
import type TaskDTO from "../../model/dto/TaskDTO";
import type ProjectCommunicator from "./ProjectCommunicator";

export default class HttpProjectCommunicator implements ProjectCommunicator {
	getOwnedAndSharedProjects(): Promise<ProjectDTO[]> {
		throw new Error("Method not implemented.");
	}
	getProjectLabels(projectID: string): Promise<LabelDTO[]> {
		throw new Error("Method not implemented.");
	}
	getColumnsByProject(projectID: string): Promise<ColumnDTO[]> {
		throw new Error("Method not implemented.");
	}
	getCardSummaries(projectID: string, columnID: string, pageSize: number, lastCardID: string | null): Promise<[CardSummaryDTO[], boolean]> {
		throw new Error("Method not implemented.");
	}
	getCardInfo(projectID: string, cardID: string): Promise<TaskDTO> {
		throw new Error("Method not implemented.");
	}
	updateCardDescription(projectID: string, cardID: string, description: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
	getCardDiscussion(projectID: string, cardID: string, pageSize: number, lastItemID: string | null): Promise<[boolean, CardDiscussionItemDTO[]]> {
		throw new Error("Method not implemented.");
	}

}