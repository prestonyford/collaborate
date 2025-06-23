import clsx from "clsx"
import type { ButtonVariant } from "./Button"
import type { ReactNode } from "react"
import Button from "./Button"

interface ButtonOption {
	text: string,
	variant: ButtonVariant
	onClick: () => void
}

interface Props {
	size: 'small' | 'medium' | 'large',
	title?: string
	buttons?: ButtonOption[],
	children?: ReactNode
}

function Popup(props: Props) {
	return (
		<>
			<div className="fixed inset-0 w-screen h-screen bg-black/35 z-40 flex">
				<div className={clsx("m-auto text-center bg-base rounded-xl border-accent border-1 max-w-screen max-h-screen min-h-[200px] flex flex-col justify-between", {
					'w-md': props.size === 'small',
					'w-xl': props.size === 'medium',
					'w-2xl': props.size === 'large'
				})}>
					{props.title !== undefined && <>
						<strong className="mt-3">{props.title}</strong>
					</>}
					{props.children || <div></div>}
					{props.buttons?.length && <>
						<div>
							<hr className="text-accent" />
							<div className="p-2 flex justify-end gap-2">
								{props.buttons.map(buttonOption => (
									<Button text={buttonOption.text} variant={buttonOption.variant} onClick={buttonOption.onClick} />
								))}
							</div>
						</div>
					</>}
				</div>
			</div>
		</>
	)
}

export default Popup
