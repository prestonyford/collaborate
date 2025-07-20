import type CardDiscussionItemDTO from "../../model/dto/CardDiscussionItemDTO";
import type CardSummaryDTO from "../../model/dto/CardSummaryDTO";
import type ColumnDTO from "../../model/dto/ColumnDTO";
import type LabelDTO from "../../model/dto/LabelDTO";
import type ProjectDTO from "../../model/dto/ProjectDTO";
import type TaskDTO from "../../model/dto/TaskDTO";

export default interface ProjectCommunicator {
	getOwnedAndSharedProjects(): Promise<ProjectDTO[]>
	getProject( projectID: string ): Promise<ProjectDTO>
	getProjectLabels( projectID: string ): Promise<LabelDTO[]>
	getColumnsByProject(projectID: string): Promise<ColumnDTO[]>
	createColumn(projectID: string, name: string, color: string): Promise<ColumnDTO>
	createTask(projectID: string, columnID: string, name: string, description: string): Promise<TaskDTO>

	// Cards
	getCardSummaries( projectID: string, columnID: string, pageSize: number, lastCardID: string | null ): Promise<[CardSummaryDTO[], boolean]>
	getCardInfo( projectID: string, cardID: string ): Promise<TaskDTO>
	updateCard( projectID: string, cardID: string, diff: Partial<TaskDTO> ): Promise<Partial<TaskDTO>>
	getCardDiscussion( projectID: string, cardID: string, pageSize: number, lastItemID: string | null ): Promise<[boolean, CardDiscussionItemDTO[]]>
}
