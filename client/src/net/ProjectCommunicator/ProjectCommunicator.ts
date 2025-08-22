import type CardDiscussionItemDTO from "../../model/dto/CardDiscussionItemDTO";
import type CardSummaryDTO from "../../model/dto/CardSummaryDTO";
import type ColumnDTO from "../../model/dto/ColumnDTO";
import type LabelDTO from "../../model/dto/LabelDTO";
import type ProjectDTO from "../../model/dto/ProjectDTO";
import type ProjectShare from "../../model/dto/ProjectShare";
import type TaskDTO from "../../model/dto/TaskDTO";
import type CreateTaskRequest from "../request/CreateTaskRequest";
import type ShareProjectRequest from "../request/ShareProjectRequest";

export default interface ProjectCommunicator {
	getOwnedAndSharedProjects(): Promise<ProjectDTO[]>
	getProject( projectId: number ): Promise<ProjectDTO>
	getProjectLabels( projectId: number ): Promise<LabelDTO[]>
	getProjectLabelCounts( projectId: number ): Promise<Record<number, number>>
	getColumnsByProject(projectId: number): Promise<ColumnDTO[]>
	getProjectShares(projectId: number): Promise<ProjectShare[]>
	createColumn(projectId: number, name: string, color: string): Promise<ColumnDTO>
	createTask(projectId: number, columnId: number, createData: CreateTaskRequest): Promise<TaskDTO>
	shareProject(shareData: ShareProjectRequest): Promise<ProjectShare[]>
	updateProject(projectId: number, diff: Partial<ProjectDTO>): Promise<ProjectDTO>

	// Cards
	getCardSummaries( projectId: number, columnId: number, pageSize: number, lastcardID: number | null ): Promise<[CardSummaryDTO[], boolean]>
	getCardInfo( projectId: number, cardID: number ): Promise<TaskDTO>
	updateCard( projectId: number, cardID: number, diff: Partial<TaskDTO> ): Promise<Partial<TaskDTO>>
	getCardDiscussion( projectId: number, cardID: number, pageSize: number, lastItemID: string | null ): Promise<[boolean, CardDiscussionItemDTO[]]>
}
