import { useMemo, useState } from "react";
import Label from "../../components/base/Label";
import Popup from "../../components/base/Popup"
import { useBoardStore } from "./boardStore"
import TextInput from "../../components/base/TextInput";
import Button from "../../components/base/Button";
import ColorInput from "../../components/base/ColorInput";
import type LabelDTO from "../../model/dto/LabelDTO";
import type { CreateLabelsRequestItem } from "../../net/request/CreateLabelsRequest";
import type CreateLabelsRequest from "../../net/request/CreateLabelsRequest";
import type DeleteLabelsRequest from "../../net/request/DeleteLabelsRequest";

interface Props {
	onCancel: () => void
	onSubmit: (createData: CreateLabelsRequest, deleteData: DeleteLabelsRequest) => void
	loading?: boolean
}

function LabelManagerPopup(props: Props) {
	const { projectLabels, columns, cardSummaries } = useBoardStore();
	const [newLabels, setNewLabels] = useState<CreateLabelsRequestItem[]>([]);
	const [labelName, setLabelName] = useState("");
	const [labelColor, setLabelColor] = useState("#ffffff");
	const [existingLabelsToRemove, setExistingLabelsToRemove] = useState<number[]>([]);

	const projectLabelCounts = useMemo(() => {
		const counts: Record<number, number> = {};
		for (const col of columns) {
			const cards = cardSummaries[col.id] ?? [];
			for (const card of cards) {
				for (const labelId of card.labels) {
					counts[labelId] = (counts[labelId] ?? 0) + 1;
				}
			}
		}
		return counts;
	}, [cardSummaries, columns]);

	const visibleExistingLabels = useMemo(() => {
		return projectLabels.filter(l => !existingLabelsToRemove.includes(l.id))
	}, [projectLabels, existingLabelsToRemove])

	function addLabel() {
		if (labelName === "") {
			alert("Please enter a name for the label.");
			return;
		}
		if ([...visibleExistingLabels, ...newLabels].some(l => l.title === labelName)) {
			alert("A label with that name already exists.");
			return;
		}
		setNewLabels([...newLabels, {
			title: labelName,
			color: labelColor
		}]);
		setLabelName("");
	}

	function removeExistingLabel(id: number) {
		setExistingLabelsToRemove([...existingLabelsToRemove, id]);
	}

	function removePendingLabel(name: string) {
		setNewLabels(newLabels.filter(l => l.title !== name));
	}

	async function handleSave() {
		const createData: CreateLabelsRequest = {
			labels: newLabels
		}
		const deleteData: DeleteLabelsRequest = {
			labels: existingLabelsToRemove
		}
		props.onSubmit(createData, deleteData);
	}

	return (
		<Popup size='medium' title='Manage Labels' onEscape={props.onCancel} loading={props.loading} buttons={[{
			text: 'Cancel',
			variant: 'secondary',
			onClick: props.onCancel,
			disabled: false
		}, {
			text: 'Save',
			variant: 'primary',
			onClick: handleSave,
			disabled: false
		}]}>
			<div className="px-10 py-4 flex flex-col gap-4">
				<div>
					<strong>Labels</strong>
					<div className="flex flex-wrap gap-2 max-h-[160px] overflow-y-auto">
						{visibleExistingLabels.length + newLabels.length === 0
							? <p className="m-auto text-text-muted">None</p>
							: <>
								{visibleExistingLabels.map(l =>
									<Label key={l.id} title={l.title} color={l.color} count={projectLabelCounts[l.id] ?? 0} removable onRemove={() => removeExistingLabel(l.id)} />
								)}
								{newLabels.map(l => 
									<Label key={l.title} title={l.title} color={l.color} removable onRemove={() => removePendingLabel(l.title)} />
								)}
							</>
						}
					</div>
				</div>
				<div>
					<label htmlFor="labelName"><strong>Create</strong></label>
					<div className="border border-accent rounded-md py-2 px-4 flex flex-col gap-1">
						<div className="flex gap-2 items-center">
							<label htmlFor="labelName"><strong>Name:</strong></label>
							<TextInput className="" id="labelName" value={labelName} onChange={setLabelName} onEnter={addLabel} />
						</div>
						<div className="flex gap-2 items-center">
							<label htmlFor="labelColor"><strong>Color:</strong></label>
							<ColorInput id="labelColor" value={labelColor} onChange={setLabelColor} />
						</div>
						<div className="flex gap-4 items-center">
							<Button content="Add" variant={"primary"} onClick={addLabel} disabled={labelName === "" || labelColor === ""} />
							{labelName && labelColor && <div className="flex gap-1 items-baseline text-text-muted basis-0 grow min-w-0">
								Preview:
								<Label title={labelName} color={labelColor} />
							</div>}
						</div>
					</div>
				</div>
			</div>
		</Popup>
	)
}

export default LabelManagerPopup
