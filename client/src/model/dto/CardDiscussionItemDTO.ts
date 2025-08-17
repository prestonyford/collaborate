export default interface CardDiscussionItemDTO {
	id: number,
	taskID: number,
	authorID: string,
	content: string,
	createdAt: number,
	parentID: string | null
}
