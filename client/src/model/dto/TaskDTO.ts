import type CardSummaryDTO from "./CardSummaryDTO"

export default interface TaskDTO {
	id: number
	projectId: number
	columnId: number
	title: string
	creationDate: number
	labels: number[]
	createdBy: string
	description: string
	activity: string[]
}
