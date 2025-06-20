import { useState } from 'react'
import ClickyIcon from './ClickyIcon'
import type CardSummaryDTO from '../../model/dto/CardSummaryDTO'

interface Props {
	title: string
	creationDate: number
}

function BoardColumn(props: Props) {

	const dateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
	
	return (
		<>
			<div className="shadow-md dark:shadow-base-alt rounded-lg bg-base border-accent border-1 py-1 px-2 min-h-[100px]">
				<div className='flex justify-between'>
					<div className=''>{props.title}</div>
					<div className='text-text-muted text-sm flex items-center'>
						<i className="fa-solid fa-calendar-week"></i>
						<span className='ml-0.5 select-none'>{new Date(props.creationDate).toLocaleDateString("en-US", dateOptions)}</span>
					</div>
				</div>
			</div>
		</>
	)
}

export default BoardColumn
