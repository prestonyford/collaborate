import Checkbox from "./Checkbox";
import Dropdown, { type Option, type TextOption, type SlotOption } from "./Dropdown";

type BaseDropdownProps = Omit<React.ComponentPropsWithoutRef<typeof Dropdown>, 'selectedId' | 'onSelect'>

interface Props extends BaseDropdownProps {
	selectedIds: string[]
	onInput: (checked: string[]) => void
}

function ChecklistDropdown(props: Props) {

	function isTextOption(opt: Option): opt is TextOption {
		return 'text' in opt;
	}

	function onChange(id: string, checked: boolean) {
		const idWasSelected = props.selectedIds.includes(id)
		if (idWasSelected && !checked) {
			props.onInput(props.selectedIds.filter(_id => _id !== id));
		} else if (!idWasSelected && checked) {
			props.onInput([...props.selectedIds, id]);
		}
	}

	function onOptionClick(event: React.MouseEvent<HTMLDivElement>, id: string, checked: boolean) {
		event.stopPropagation();
		onChange(id, !checked)
	}

	const options: SlotOption[] = props.options.map(o => {
		return {
			id: o.id,
			renderOption: (id: string) => {
				const checked = props.selectedIds.includes(id);
				return <div className="px-2 flex items-baseline">
					<Checkbox checked={checked} onChange={val => onChange(id, val)} />
					<div className="w-full flex cursor-default" onClick={event => onOptionClick(event, id, checked)}>
						{isTextOption(o) ? o.text : o?.renderOption(id)}
					</div>
				</div>
			}
		}
	});
	return (
		<Dropdown {...props} options={options} onSelect={() => {}} />
	);
}

export default ChecklistDropdown