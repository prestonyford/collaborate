import type CardSummaryDTO from "../../model/dto/CardSummaryDTO";
import type TaskDTO from "../../model/dto/TaskDTO";
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
	
	async getCardInfo(projectID: string, cardID: string): Promise<TaskDTO> {
		await new Promise(resolve => setTimeout(resolve, 500));
		return {
			id: cardID,
			columnID: '1',
			title: 'Card Name!!',
			creationDate: 1751732710021,
			labels: ['1', '2'],
			createdBy: 'Preston Ford',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean congue consectetur facilisis. Integer egestas ut risus ut ultricies. Quisque feugiat ullamcorper mi eu semper. Proin vel sapien efficitur, semper lacus ac, tempor tellus. Sed ornare velit vitae nisi tristique euismod. Nulla fringilla laoreet mi, eu semper mi posuere ac. Pellentesque eu rhoncus orci, ac rhoncus sapien. Aliquam pulvinar mauris eu leo aliquam, eu dictum leo molestie. Donec volutpat elementum pulvinar. Donec cursus, lacus at facilisis tincidunt, lorem lectus placerat augue, in pretium lectus elit et purus.',
			activity: []
		}
	}
}