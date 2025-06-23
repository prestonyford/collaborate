import clsx from 'clsx'
import { useState, type MouseEventHandler } from 'react'

export type ButtonVariant = "primary" | "secondary";

interface Props {
	text: string
	variant: ButtonVariant
	onClick?: MouseEventHandler
}

function Button(props: Props) {
	return (
		<>
			<div className="flex text-sm" onClick={props.onClick}>
				<div className={clsx(
					'border border-gray-300 dark:border-gray-400 cursor-pointer rounded-md px-2',
					'transition-colors flex items-center justify-center shadow-sm py-1',
					{'text-gray-50 bg-indigo-600 hover:bg-indigo-500': props.variant === "primary"},
					{'text-text bg-base hover:bg-base-alt': props.variant === "secondary"}
				)}>
					{ props.text }
				</div>
			</div>
		</>
	)
}

export default Button
