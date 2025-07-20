import { useState } from "react"
import Popup, { type ButtonOption } from "../../components/base/Popup"
import MyCKEditor from "../../components/ckeditor/MyCKEditor"
import TextInput from "../../components/base/TextInput"
import type CreateTaskRequest from "../../net/request/CreateTaskRequest"
import clsx from "clsx"

interface Props {
	owningColumnName: string
	loading: boolean
	onCancel: () => void
	onCreate: (data: CreateTaskRequest) => void
}

export default function TaskCreator(props: Props) {
	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");

	function handleCreate() {
		props.onCreate({ title: name, description });
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

	return (
		<Popup size="xl" title={<h4>Create Task - {props.owningColumnName}</h4>} buttons={buttons} loading={props.loading} fullHeight>
			<div className={clsx("p-6 pt-4 overflow-y-auto", {'opacity-50 pointer-events-none': props.loading})}>
				<h4 className="">Name</h4>
				<TextInput value={name} onChange={setName} />
				<h4 className="pt-3">Description</h4>
				<MyCKEditor initialData={description} onChange={setDescription} />
				<h4 className="pt-3">Labels</h4>

				<h4 className="pt-3">Sharing</h4>

			</div>
		</Popup>
	)
}