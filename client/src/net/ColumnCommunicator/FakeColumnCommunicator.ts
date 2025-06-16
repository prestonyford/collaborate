import type ColumnDTO from "../../model/dto/ColumnDTO";
import type ColumnCommunicator from "./ColumnCommunicator";

export default class FakeColumnCommunicator implements ColumnCommunicator {
	async getColumnsByProject(projectID: string): Promise<ColumnDTO[]> {
		return [
			{
				id: "1",
				name: "Column 1",
				color: "#ff6467"
			},
			{
				id: "2",
				name: "Column 2",
				color: "#00D3F2"
			},
			{
				id: "3",
				name: "Column 3",
				color: "#BBF451"
			},
			{
				id: "4",
				name: "Column 4",
				color: "#FFB900"
			},
		]
	}
}