export type CreateLabelsRequestItem = {
	title: string,
	color: string
}

export default interface CreateLabelsRequest {
	labels: CreateLabelsRequestItem[]
}
