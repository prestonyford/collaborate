import type CardSummaryDTO from "./CardSummaryDTO"

export default interface TaskDTO {
	id: string
	projectId: string
	columnId: string
	title: string
	creationDate: number
	labels: string[]
	createdBy: string
	description: string
	activity: string[]
}
