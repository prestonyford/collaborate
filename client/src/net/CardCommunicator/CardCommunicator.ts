import type CardSummaryDTO from "../../model/dto/CardSummaryDTO";

export default interface CardCommunicator {
	getCardSummaries( projectID: string, columnID: string, pageSize: number, lastCardID: string | null ): Promise<[CardSummaryDTO[], boolean]>
}