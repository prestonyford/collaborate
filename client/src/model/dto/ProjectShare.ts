export default interface ProjectShare {
	id?: number
	projectId: number
	sharedWith: string
	sharedBy: string
	sharedTime: number
}
