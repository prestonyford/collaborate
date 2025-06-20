import type CardSummaryDTO from "../../model/dto/CardSummaryDTO";
import type CardCommunicator from "./CardCommunicator";

export default class FakeCardCommunicator implements CardCommunicator {
	async getCardSummaries(projectID: string, columnID: string, pageSize: number, lastCardID: string | null): Promise<[CardSummaryDTO[], boolean]> {
		await new Promise(resolve => setTimeout(resolve, 200));
		return [
			columnID === "1" ? [
				{
					id: "1",
					title: "Card 1",
					creationDate: 1750383235022
				},
				{
					id: "2",
					title: "Card 2",
					creationDate: 1750383235022
				},
				{
					id: "3",
					title: "Card 3",
					creationDate: 1750383235022
				},
				{
					id: "4",
					title: "Card 4",
					creationDate: 1750383235022
				},
				{
					id: "5",
					title: "Card 5",
					creationDate: 1750383235022
				},
				{
					id: "6",
					title: "Card 6",
					creationDate: 1750383235022
				}
			] : []
		, false];
	}
	
}