import type LabelDTO from "../../model/dto/LabelDTO";

export default interface LabelCommunicator {
	getProjectLabels( projectID: string ): Promise<LabelDTO[]>
}