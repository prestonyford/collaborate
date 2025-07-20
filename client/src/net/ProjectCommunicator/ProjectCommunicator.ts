import type CardDiscussionItemDTO from "../../model/dto/CardDiscussionItemDTO";
import type CardSummaryDTO from "../../model/dto/CardSummaryDTO";
import type ColumnDTO from "../../model/dto/ColumnDTO";
import type LabelDTO from "../../model/dto/LabelDTO";
import type ProjectDTO from "../../model/dto/ProjectDTO";
import type TaskDTO from "../../model/dto/TaskDTO";
import type CreateTaskRequest from "../request/CreateTaskRequest";

export default interface ProjectCommunicator {
	getOwnedAndSharedProjects(): Promise<ProjectDTO[]>
	getProject( projectId: string ): Promise<ProjectDTO>
	getProjectLabels( projectId: string ): Promise<LabelDTO[]>
	getColumnsByProject(projectId: string): Promise<ColumnDTO[]>
	createColumn(projectId: string, name: string, color: string): Promise<ColumnDTO>
	createTask(projectId: string, columnId: string, createData: CreateTaskRequest): Promise<TaskDTO>

	// Cards
	getCardSummaries( projectId: string, columnId: string, pageSize: number, lastCardID: string | null ): Promise<[CardSummaryDTO[], boolean]>
	getCardInfo( projectId: string, cardID: string ): Promise<TaskDTO>
	updateCard( projectId: string, cardID: string, diff: Partial<TaskDTO> ): Promise<Partial<TaskDTO>>
	getCardDiscussion( projectId: string, cardID: string, pageSize: number, lastItemID: string | null ): Promise<[boolean, CardDiscussionItemDTO[]]>
}
