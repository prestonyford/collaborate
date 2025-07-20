import { useState } from "react"
import Popup, { type ButtonOption } from "../../components/base/Popup"
import MyCKEditor from "../../components/ckeditor/MyCKEditor"
import TextInput from "../../components/base/TextInput"

interface Props {
	owningColumnName: string
	onCancel: () => void
	onCreate: (name: string, description: string) => void
}

export default function TaskCreator(props: Props) {
	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");

	function handleCreate() {
		props.onCreate(name, description);
	}

	const buttons: ButtonOption[] = [
		{
			text: "Cancel",
			variant: "secondary",
			onClick: props.onCancel
		}, 
		{
			text: "Create",
			variant: "primary",
			onClick: handleCreate
		}, 
	]

	return (
		<Popup size="xl" title={<h4>Create Task - {props.owningColumnName}</h4>} buttons={buttons} fullHeight>
			<div className="p-6 pt-4 overflow-y-auto">
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