import { useState, type ReactNode } from 'react'

interface Props {
	children?: ReactNode
}

function Board({ children }: Props) {
	return (
		<>
			<div className="pb-4 px-6 h-full w-full flex gap-4 overflow-x-auto">
				{ children }
			</div>
		</>
	)
}

export default Board
