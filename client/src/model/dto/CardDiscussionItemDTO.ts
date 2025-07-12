export default interface CardDiscussionItemDTO {
	id: string,
	taskID: string,
	authorID: string,
	content: string,
	createdAt: number,
	parentID: string | null
}
