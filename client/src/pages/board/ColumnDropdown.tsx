import Dropdown from "../../components/base/Dropdown"
import type ColumnDTO from "../../model/dto/ColumnDTO";

type BaseDropdownProps = Omit<React.ComponentPropsWithoutRef<typeof Dropdown>, 'options'>

type Props = BaseDropdownProps & {
	columns: ColumnDTO[],
}

function ColumnDropdown(props: Props) {
	const columnDropdownOptions = props.columns.map(c => ({
		id: c.id,
		renderOption: (id: string) => {
			const column = props.columns.find(c => c.id === id);
			return (
				<div className="border-l-4 px-2 py-1" style={{borderColor: column?.color}}>
					{column?.name}
				</div>
			)
		}
	}));

	return (
		<Dropdown
			{...props}
			options={columnDropdownOptions}
		/>
	)
}

export default ColumnDropdown
