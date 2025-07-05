export default interface TaskDTO {
	id: string
	columnID: string,
	title: string,
	creationDate: number
	labels: string[]
	createdBy: string,
	description: string,
	activity: string[]
}
