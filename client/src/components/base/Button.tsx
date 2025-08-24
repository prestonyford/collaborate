import clsx from 'clsx'
import { type FormEvent, type FormEventHandler, type ReactNode } from 'react'

export type ButtonVariant = "primary" | "secondary";

interface Props {
	content: string | ReactNode
	variant: ButtonVariant
	disabled?: boolean
	onClick?: FormEventHandler
}

function Button({ content, variant, disabled = false, onClick }: Props) {
	function handleClick(e: FormEvent<HTMLButtonElement>) {
		if (disabled) return;
		onClick?.(e);
	}
	
	return (
		<button className="flex text-sm" disabled={disabled} onClick={handleClick}>
			<div className={clsx(
				'border border-accent cursor-pointer rounded-md px-2 transition-opacity',
				'transition-colors flex items-center justify-center shadow-sm py-1',
				{ 'text-gray-50 bg-indigo-600 hover:bg-indigo-500': variant === "primary" },
				{ 'text-text bg-base hover:bg-base-alt': variant === "secondary" },
				{ 'opacity-60 pointer-events-none': disabled },
			)}>
				{content}
			</div>
		</button>
	)
}

export default Button
