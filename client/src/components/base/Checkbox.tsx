interface Props {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label?: string;
	id?: string;
	className?: string;
}

function Checkbox ({ checked, onChange, label, id, className }: Props) {
	return <label className={className} onClick={event => event.stopPropagation()}>
		<input
			type="checkbox"
			checked={checked}
			onChange={e => onChange(e.target.checked)}
			id={id}
			className="mr-2"
		/>
		{label}
	</label>
};

export default Checkbox;