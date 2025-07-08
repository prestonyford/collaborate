import clsx from 'clsx'
import { useState, type MouseEventHandler, type ReactNode } from 'react'

export type ButtonVariant = "primary" | "secondary";

interface Props {
	content: string | ReactNode
	variant: ButtonVariant
	disabled?: boolean
	onClick?: MouseEventHandler
}

function Button({ content, variant, disabled = false, onClick }: Props) {
	function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		if (disabled) return;
		onClick?.(e);
	}
	return (
		<>
			<div className="flex text-sm" onClick={handleClick}>
				<div className={clsx(
					'border border-accent cursor-pointer rounded-md px-2',
					'transition-colors flex items-center justify-center shadow-sm py-1',
					{ 'text-gray-50 bg-indigo-600 hover:bg-indigo-500': variant === "primary" },
					{ 'text-text bg-base hover:bg-base-alt': variant === "secondary" },
					{ 'opacity-60 pointer-events-none': disabled },
				)}>
					{content}
				</div>
			</div>
		</>
	)
}

export default Button
