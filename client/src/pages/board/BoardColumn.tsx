import { useState } from 'react'
import ClickyIcon from './ClickyIcon'

interface Props {
	columnName: string
}

function BoardColumn(props: Props) {
	
	return (
		<>
			<div className="flex-shrink-0 w-[360px] h-full shadow-xl dark:shadow-base-alt rounded-2xl bg-base border-accent border-1 p-4">
				<div className='flex justify-between gap-2'>
					<strong className='truncate'>{props.columnName}</strong>
					<div className='flex gap-1'>
						<ClickyIcon icon="fa-solid fa-plus" />
						<ClickyIcon icon="fa-solid fa-ellipsis" />
					</div>
				</div>
			</div>
		</>
	)
}

export default BoardColumn
