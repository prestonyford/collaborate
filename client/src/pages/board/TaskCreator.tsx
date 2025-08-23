import { useMemo, useState } from "react"
import Popup, { type ButtonOption } from "../../components/base/Popup"
import MyCKEditor from "../../components/ckeditor/MyCKEditor"
import TextInput from "../../components/base/TextInput"
import type CreateTaskRequest from "../../net/request/CreateTaskRequest"
import clsx from "clsx"
import { useBoardStore } from "./boardStore"
import Label from "../../components/base/Label"
import LabelChecklistDropdown from "./LabelChecklistDropdown"

interface Props {
	owningColumnName: string
	loading: boolean
	onCancel: () => void
	onCreate: (data: CreateTaskRequest) => void
}

export default function TaskCreator(props: Props) {
	const projectLabels = useBoardStore(state => state.projectLabels);

	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [labels, setLabels] = useState<number[]>([]);

	function handleCreate() {
		props.onCreate({ title: name, description, labels });
	}

	const buttons: ButtonOption[] = [
		{
			text: "Cancel",
			variant: "secondary",
			disabled: props.loading,
			onClick: props.onCancel
		},
		{
			text: "Create Task",
			variant: "primary",
			disabled: props.loading,
			onClick: handleCreate
		},
	]

	const sortedLabels = useMemo(
		() => labels.sort((a, b) => a.toString().localeCompare(b.toString())),
		[labels]
	);
	const projectLabelsMap = useMemo(
		() => Object.fromEntries(projectLabels.map(label => [label.id, label])),
		[projectLabels]
	);

	function handleRemoveLabel(id: number) {
		const newLabels = labels.filter(l => l !== id);
		setLabels(newLabels);
	}

	return (
		<Popup size="large" title={`Create Task - ${props.owningColumnName}`} buttons={buttons} loading={props.loading}>
			<div className={clsx("p-6 pt-4 overflow-y-auto", { 'opacity-50 pointer-events-none': props.loading })}>
				<label htmlFor="name" className="block"><strong>Name</strong></label>
				<TextInput id="name" value={name} onChange={setName} />
				<label htmlFor="description" className="block pt-3"><strong>Description</strong></label>
				<MyCKEditor initialData={description} onChange={setDescription} />
				<label htmlFor="labels" className="block pt-3"><strong>Labels</strong></label>
				<div className="flex flex-col gap-2">
					<div className="flex gap-2">
						{sortedLabels.map(lid => (
							<div key={lid} className="flex items-center">
								<Label title={projectLabelsMap[lid].title} color={projectLabelsMap[lid].color} removable onRemove={() => handleRemoveLabel(lid)} />
							</div>
						))}
					</div>
					<div>
						<LabelChecklistDropdown
							defaultText="Add label"
							labels={projectLabels}
							selectedIds={labels}
							onInput={setLabels}
						/>
					</div>
				</div>
			</div>
		</Popup>
	)
}