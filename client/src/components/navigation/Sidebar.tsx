import clsx from 'clsx'
import { useState } from 'react'

interface Props {
	className?: string
}

function Sidebar({ className = '' }: Props) {
	return (
		<>
			<div className={clsx('h-full border-r border-accent p-normal bg-surface shrink-0', className)}>
				Hello, world!
			</div>
		</>
	)
}

export default Sidebar
