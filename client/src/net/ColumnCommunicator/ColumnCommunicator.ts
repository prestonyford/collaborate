import type ColumnDTO from "../../model/dto/ColumnDTO";

export default interface ColumnCommunicator {
	getColumnsByProject(projectID: string): Promise<ColumnDTO[]>
}