import type CardSummaryDTO from "../../model/dto/CardSummaryDTO";
import type CardCommunicator from "./CardCommunicator";

export default class FakeCardCommunicator implements CardCommunicator {
	async getCardSummaries(projectID: string, columnID: string, pageSize: number, lastCardID: string | null): Promise<[CardSummaryDTO[], boolean]> {
		await new Promise(resolve => setTimeout(resolve, 200));
		return [
			columnID === "1" ? [
				{
					id: "1",
					columnID: "1",
					title: "Card 1",
					creationDate: 1750383235022,
					labels: ['0', '1', '2', '7']
				},
				{
					id: "2",
					columnID: "1",
					title: "Card 2",
					creationDate: 1750383235022,
					labels: ['5', '4']
				},
				{
					id: "3",
					columnID: "1",
					title: "Card 3",
					creationDate: 1750383235022,
					labels: ['12', '3']
				},
				{
					id: "4",
					columnID: "1",
					title: "Card 4",
					creationDate: 1750383235022,
					labels: ['0', '2', '3', '10', '1', '4', '5', '6']
				},
				{
					id: "5",
					columnID: "1",
					title: "Card 5",
					creationDate: 1750383235022,
					labels: []
				},
				{
					id: "6",
					columnID: "1",
					title: "Card 6",
					creationDate: 1750383235022,
					labels: ['13']
				}
			] : []
		, false];
	}
	
}