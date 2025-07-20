import clsx from "clsx"
import type { ButtonVariant } from "./Button"
import { useEffect, type ReactNode } from "react"
import Button from "./Button"
import { createPortal } from "react-dom"
import "./popup.css"

export interface ButtonOption {
	text: string,
	variant: ButtonVariant
	onClick: () => void
}

interface Props {
	size: 'small' | 'medium' | 'large' | 'xl',
	fullHeight?: boolean
	title?: ReactNode
	buttons?: ButtonOption[],
	children?: ReactNode
	onEscape?: () => void
}

function Popup(props: Props) {
	if (props.onEscape !== undefined) {
		useEffect(() => {
			function handleKeyDown(e: KeyboardEvent) {
				if (e.key === "Escape") {
					props.onEscape!();
				}
			}
			window.addEventListener("keydown", handleKeyDown);
			return () => window.removeEventListener("keydown", handleKeyDown);
		}, [props.onEscape]);
	}

	return (
		<>
			{createPortal(
				<div className="fixed inset-0 w-screen h-screen z-40 flex">
					<div className={clsx("pop-in z-50 m-auto text-center bg-base dark:bg-surface border-accent border-1 max-w-screen max-h-screen flex flex-col justify-between", {
						'w-md': props.size === 'small',
						'w-xl': props.size === 'medium',
						'w-2xl': props.size === 'large',
						'w-4xl': props.size === 'xl',
					}, props.fullHeight ? 'min-h-full rounded-t-xl border-b-0' : 'min-h-[200px] rounded-xl'
					)}>
						{props.title !== undefined && <>
							<strong className="mt-3">{props.title}</strong>
						</>}
						<div className="grow text-left overflow-auto">
							{props.children || <div></div>}
						</div>
						{props.buttons?.length && <>
							<div>
								<hr className="text-accent" />
								<div className="p-2 flex justify-end gap-2">
									{props.buttons.map(buttonOption => (
										<Button key={buttonOption.text} content={buttonOption.text} variant={buttonOption.variant} onClick={buttonOption.onClick} />
									))}
								</div>
							</div>
						</>}
					</div>
					<div className="absolute w-full h-full fade bg-black/55"></div>
				</div>,
				document.body
			)}
		</>
	)
}

export default Popup
