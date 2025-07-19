import clsx from "clsx"
import TextInput from "./TextInput"

interface Props {
	id: string,
	value: string,
	invalid?: boolean
	required?: boolean
	onChange: (color: string) => void
}

export default function ColorInput(props: Props) {
	return <div className={clsx("flex flex-wrap gap-1 items-center px-1", {'border rounded-md border-red-400': props.invalid})}>
		<input
			className=""
			type="color"
			id={props.id}
			value={props.value}
			onChange={e => props.onChange(e.target.value)}
			required={!!props.required}
		>
		</input>
		<div className="text-text-muted">
			{props.value}
		</div>
	</div>
}