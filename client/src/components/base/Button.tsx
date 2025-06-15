import clsx from 'clsx'
import { useState } from 'react'

interface Props {
	text: string
	variant: "primary" | "secondary"
}

function Button(props: Props) {
	return (
		<>
			<div className="flex">
				<div className={clsx(
					'border border-gray-300 dark:border-gray-400 cursor-pointer rounded-md px-2',
					'text-gray-50 transition-colors flex items-center justify-center shadow-sm',
					{'bg-indigo-600 hover:bg-indigo-500': props.variant === "primary"}
				)}>
					{ props.text }
				</div>
			</div>
		</>
	)
}

export default Button
