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
	const [labels, setLabels] = useState<string[]>([]);

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
			text: "Create",
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

	function handleRemoveLabel(id: string) {
		const newLabels = labels.filter(l => l !== id);
		setLabels(newLabels);
	}

	return (
		<Popup size="xl" title={<h4>Create Task - {props.owningColumnName}</h4>} buttons={buttons} loading={props.loading} fullHeight>
			<div className={clsx("p-6 pt-4 overflow-y-auto", { 'opacity-50 pointer-events-none': props.loading })}>
				<h4 className="">Name</h4>
				<TextInput value={name} onChange={setName} />
				<h4 className="pt-3">Description</h4>
				<MyCKEditor initialData={description} onChange={setDescription} />
				<h4 className="pt-3">Labels</h4>
				<div className="flex flex-col gap-2">
					<div className="flex gap-2 pt-1">
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

				<h4 className="pt-3">Sharing</h4>

			</div>
		</Popup>
	)
}