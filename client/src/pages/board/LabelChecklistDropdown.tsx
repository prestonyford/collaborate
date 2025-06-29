import { useMemo } from "react";
import ChecklistDropdown from "../../components/base/ChecklistDropdown";
import type ColumnDTO from "../../model/dto/ColumnDTO";
import { useBoardStore } from "./BoardStore";
import Label from "../../components/base/Label";
import Checkbox from "../../components/base/Checkbox";

type Props = Omit<React.ComponentPropsWithoutRef<typeof ChecklistDropdown>, 'options'>

function LabelChecklistDropdown(props: Props) {
	const projectLabels = useBoardStore((state) => state.projectLabels);
	
	const projectLabelDropdownOptions = useMemo(
		() => projectLabels.map(l => ({
			id: l.id,
			renderOption: (id: string) => {
				const label = projectLabels.find(l => l.id === id);
				return <div className="py-0.5">
					<Label title={label?.title ?? ''} color={label?.color ?? ''} />
				</div>
			}
		})),
		[projectLabels]
	)
	return (
		<ChecklistDropdown {...props} options={projectLabelDropdownOptions} defaultText="Add" />
	)
}

export default LabelChecklistDropdown
