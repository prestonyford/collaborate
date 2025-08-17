import Checkbox from "./Checkbox";
import Dropdown, { type Option, type TextOption, type SlotOption, type OptionKey } from "./Dropdown";
``
type BaseDropdownProps<T extends OptionKey> = Omit<React.ComponentPropsWithoutRef<typeof Dropdown<T>>, 'selectedId' | 'onSelect'>

interface Props<T extends OptionKey> extends BaseDropdownProps<T> {
	selectedIds: T[]
	onInput: (checked: T[]) => void
}

function ChecklistDropdown<T extends OptionKey>(props: Props<T>) {

	function isTextOption(opt: Option<T>): opt is TextOption<T> {
		return 'text' in opt;
	}

	function onChange(id: T, checked: boolean) {
		const idStr = id.toString();
		const selectedIdsStrs = props.selectedIds.map(s => s.toString());
		const index = selectedIdsStrs.indexOf(idStr);

		if (index !== -1 && !checked) {
			props.onInput(props.selectedIds.filter(_id => _id.toString() !== idStr));
		} else if (index === -1 && checked) {
			props.onInput([...props.selectedIds, id]);
		}
	}

	function onOptionClick(event: React.MouseEvent<HTMLDivElement>, id: T, checked: boolean) {
		event.stopPropagation();
		onChange(id, !checked)
	}

	const options: SlotOption<T>[] = props.options.map(o => {
		return {
			id: o.id,
			renderOption: (id: T) => {
				const checked = props.selectedIds.some(s => s.toString() === id.toString());
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
		<Dropdown {...props} options={options} onSelect={() => { }} />
	);
}

export default ChecklistDropdown;
