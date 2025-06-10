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
					'border border-action cursor-pointer rounded-sm px-2',
					{'bg-action': props.variant === "primary"}
				)}>
					{ props.text }
				</div>
			</div>
		</>
	)
}

export default Button
