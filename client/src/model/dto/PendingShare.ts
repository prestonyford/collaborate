export default interface PendingShare {
	projectId: number
	sharedWith: string
	sharedBy: string
	sharedTime?: number
}
