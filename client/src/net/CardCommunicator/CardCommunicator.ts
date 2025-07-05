import type CardSummaryDTO from "../../model/dto/CardSummaryDTO";
import type TaskDTO from "../../model/dto/TaskDTO";

export default interface CardCommunicator {
	getCardSummaries( projectID: string, columnID: string, pageSize: number, lastCardID: string | null ): Promise<[CardSummaryDTO[], boolean]>
	getCardInfo( projectID: string, cardID: string ): Promise<TaskDTO>
}