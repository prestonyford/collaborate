import clsx from "clsx"

interface Props {
	id?: string
	placeholder?: string
	invalid?: boolean
	required?: boolean
	value: string
	onChange: (val: string) => void
}

function TextInput(props: Props) {
	
	return (
		<input
			className={clsx("border rounded-md px-1.5 py-[1px]", props.invalid ? 'border-red-400' : 'border-gray-300 dark:border-gray-400')}
			type="text"
			id={props.id}
			placeholder={props.placeholder}
			value={props.value}
			onChange={e => props.onChange(e.target.value)}
			required={!!props.required}
		>
		</input>
	)
}

export default TextInput
