import { useState } from 'react'
import ClickyIcon from './ClickyIcon'

interface Props {
	columnName: string
	columnColor?: string
}

function BoardColumn(props: Props) {
	
	return (
		<>
			<div className="flex-shrink-0 w-[360px] h-full shadow-xl dark:shadow-base-alt rounded-2xl bg-base border-accent border-1 overflow-hidden">
				<div className='w-full h-[8px]' style={{ backgroundColor: props.columnColor }}></div>
				<div className="w-full h-full p-4 pt-3">
					<div className='flex justify-between gap-2 pb-2'>
						<div>
							<i className="fa-solid fa-grip-vertical mr-1 cursor-grab"></i> {/* TODO: probably don't need cursor-grab after I implement dnd*/}
							<strong className='truncate'>{props.columnName}</strong>
						</div>
						<div className='flex gap-1'>
							<ClickyIcon icon="fa-solid fa-plus" />
							<ClickyIcon icon="fa-solid fa-ellipsis" />
						</div>
					</div>
					<div>
						Content here
					</div>
				</div>
			</div>
		</>
	)
}

export default BoardColumn
