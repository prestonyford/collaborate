import clsx from "clsx"

interface Props {
	id?: string
	placeholder?: string
	invalid?: boolean
	required?: boolean
	value: string
	type?: "text" | "password" | "email"
	className?: string
	disabled?: boolean
	onChange: (val: string) => void
	onEnter?: () => void;
}

function TextInput(props: Props) {

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter' && props.onEnter) {
			props.onEnter();
		}
	}

	return (
		<input
			className={clsx(
				"border rounded-md px-1.5 py-[1px] bg-base",
				props.invalid ? 'border-red-400' : 'border-gray-300 dark:border-gray-400',
				props.className ?? '',
				{ 'opacity-60 pointer-events-none': props.disabled }
			)}
			type={props.type ?? "text"}
			id={props.id}
			placeholder={props.placeholder}
			value={props.value}
			onChange={e => props.onChange(e.target.value)}
			onKeyDown={handleKeyDown}
			required={!!props.required}
		>
		</input>
	)
}

export default TextInput
