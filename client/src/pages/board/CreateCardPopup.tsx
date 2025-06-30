import { useMemo, useState } from "react"
import Popup from "../../components/base/Popup"
import TextInput from "../../components/base/TextInput"
import type CardSummaryDTO from "../../model/dto/CardSummaryDTO"
import Dropdown from "../../components/base/Dropdown"
import { useBoardStore } from "./BoardStore"
import ColumnDropdown from "./ColumnDropdown"
import TextArea from "../../components/base/TextArea"
import Label from "../../components/base/Label"
import ChecklistDropdown from "../../components/base/ChecklistDropdown"
import LabelChecklistDropdown from "./LabelChecklistDropdown"

interface Props {
	onCancel: () => void
}

function CreateCardPopup(props: Props) {
	const [formData, setFormData] = useState<Partial<CardSummaryDTO>>({});
	const [description, setDescription] = useState<string>("");

	const columns = useBoardStore((state) => state.columns);
	const projectLabels = useBoardStore((state) => state.projectLabels);
	const projectLabelsMap = useMemo(
		() => Object.fromEntries(projectLabels.map(label => [label.id, label])),
		[projectLabels]
	);
	
	function setLabels(labels: string[]) {
		setFormData({ ...formData, labels })
	}
	function removeLabel(id: string) {
		setFormData({ ...formData, labels: (formData.labels || []).filter(l => l !== id) })
	}
	
	return (
		<Popup size='medium' title='Create Card' onEscape={props.onCancel} buttons={[{
			text: 'Cancel',
			variant: 'secondary',
			onClick: props.onCancel
		}, {
			text: 'Confirm',
			variant: 'primary',
			onClick: () => {}
		}]}>
			<div className="p-2 flex">
				<div className="m-auto grid grid-cols-[1fr_3fr] text-right gap-2 w-[70%] items-baseline">
					<label htmlFor="name">Name:</label>
					<TextInput id="name" value={formData.title ?? ''} onChange={title => setFormData({...formData, title})} />
					<label htmlFor="column">Column:</label>
					<ColumnDropdown selectedId={formData.columnID} columns={columns} onSelect={columnID => setFormData({ ...formData, columnID })} />
					<label htmlFor="description">Description:</label>
					<TextArea value={description} onInput={setDescription} rows={3} />
					<label htmlFor="labels">Labels:</label>
					<div className="flex flex-col gap-1">
						<div className="flex">
							<LabelChecklistDropdown onInput={setLabels} selectedIds={formData.labels ?? []} defaultText="Add" />
						</div>
						{!!formData.labels?.length && <div className="flex flex-wrap gap-x-2 gap-y-1">
							{formData.labels?.map(l =>
								<Label key={l} title={projectLabelsMap[l].title} color={projectLabelsMap[l].color} removable={true} onRemove={() => removeLabel(l)} />
							)}
						</div>}
					</div>
				</div>
			</div>
		</Popup>
	)
}

export default CreateCardPopup
