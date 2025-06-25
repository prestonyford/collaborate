import Popup from "../../components/base/Popup"

interface Props {
	id?: string
	placeholder?: string
	value: string
	onChange: (val: string) => void
}

function TextInput(props: Props) {
	
	return (
		<input
			className="border border-gray-300 dark:border-gray-400 rounded-md px-1.5 py-[1px]"
			type="text"
			id={props.id}
			placeholder={props.placeholder}
			value={props.value}
			onChange={e => props.onChange(e.target.value)}
		>
		</input>
	)
}

export default TextInput
