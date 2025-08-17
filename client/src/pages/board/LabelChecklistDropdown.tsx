import { useMemo } from "react";
import ChecklistDropdown from "../../components/base/ChecklistDropdown";
import Label from "../../components/base/Label";
import type LabelDTO from "../../model/dto/LabelDTO";

type Props = Omit<React.ComponentPropsWithoutRef<typeof ChecklistDropdown<number>>, 'options'> & {
	labels: LabelDTO[]
}

function LabelChecklistDropdown(props: Props) {
	const projectLabelDropdownOptions = useMemo(() => props.labels.map(l => ({
		id: l.id,
		renderOption: (id: number) => {
			const label = props.labels.find(l => l.id === id);
			return <div className="py-0.5 pr-1">
				<Label title={label?.title ?? ''} color={label?.color ?? ''} />
			</div>
		}
	})), [props.labels]);

	return (
		<ChecklistDropdown {...props} options={projectLabelDropdownOptions} />
	);
}

export default LabelChecklistDropdown;
