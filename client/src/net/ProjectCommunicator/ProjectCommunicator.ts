import type CardSummaryDTO from "../../model/dto/CardSummaryDTO";
import type ColumnDTO from "../../model/dto/ColumnDTO";
import type LabelDTO from "../../model/dto/LabelDTO";
import type ProjectDTO from "../../model/dto/ProjectDTO";
import type TaskDTO from "../../model/dto/TaskDTO";

export default interface ProjectCommunicator {
	getOwnedAndSharedProjects(): Promise<ProjectDTO[]>
	getProjectLabels( projectID: string ): Promise<LabelDTO[]>
	getColumnsByProject(projectID: string): Promise<ColumnDTO[]>
	getCardSummaries( projectID: string, columnID: string, pageSize: number, lastCardID: string | null ): Promise<[CardSummaryDTO[], boolean]>
	getCardInfo( projectID: string, cardID: string ): Promise<TaskDTO>
}
