import clsx from 'clsx'
import { useState, type MouseEventHandler } from 'react'

export type ButtonVariant = "primary" | "secondary";

interface Props {
	value: string
	onInput: (val: string) => void
	rows?: number
}

function TextArea({value, onInput, rows = 1}: Props) {
	return (
		<>
			<textarea
				className='border border-gray-300 dark:border-gray-400 rounded-md px-1.5 py-[1px] min-h-[28px]'
				value={value}
				onInput={event => { onInput((event.target as HTMLTextAreaElement).value) }}
				rows={rows}
			>
			</textarea>
		</>
	)
}

export default TextArea
