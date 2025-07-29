import { useMemo, useState } from "react";
import Label from "../../components/base/Label";
import { useTaskStore } from "./taskStore";
import LabelChecklistDropdown from "../board/LabelChecklistDropdown";
import LoadingIcon from "../../components/base/LoadingIcon";

export default function Labels() {
	const task = useTaskStore(state => state.task);
	const projectLabels = useTaskStore(state => state.projectLabels);
	const updateLabels = useTaskStore(state => state.updateLabels);

	if (!task) return;

	const projectLabelsMap = useMemo(
		() => Object.fromEntries(projectLabels.map(label => [label.id, label])),
		[projectLabels]
	);

	const sortedLabels = useMemo(
		() => task.labels.sort((a, b) => a.toString().localeCompare(b.toString())),
		[task.labels]
	);

	const [selectedLabels, setSelectedLabels] = useState<string[]>(task.labels);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function handleLabelDropdownClose() {
		if (
			task?.labels.length === selectedLabels.length
			&& task?.labels.every((l, i) => selectedLabels[i] === l)
		) return;

		setIsLoading(true);
		try {
			await updateLabels(selectedLabels);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	async function handleRemoveLabel(id: string) {
		setIsLoading(true);
		try {
			const newLabels = task!.labels.filter(l => l !== id);
			setSelectedLabels(newLabels)
			await updateLabels(newLabels);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	return <>
		<h3 className="mt-4">Labels</h3>
		<div className="flex flex-col gap-2">
			<div className="flex gap-2 pt-1">
				{sortedLabels.map(lid => (
					<div key={lid} className="flex items-center">
						<Label title={projectLabelsMap[lid].title} color={projectLabelsMap[lid].color} removable onRemove={() => handleRemoveLabel(lid)} />
					</div>
				))}
			</div>
			<div className="flex gap-2">
				<LabelChecklistDropdown
					defaultText="Add label"
					labels={projectLabels}
					selectedIds={selectedLabels}
					onInput={setSelectedLabels}
					onClose={handleLabelDropdownClose}
				/>
				{isLoading && <div>
					<LoadingIcon size="small" />
				</div>}
			</div>
		</div>
	</>
}