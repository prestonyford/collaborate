import { useState } from 'react'
import ClickyIcon from './ClickyIcon'
import type CardSummaryDTO from '../../model/dto/CardSummaryDTO'
import { Draggable } from '@hello-pangea/dnd'

interface Props {
	index: number
	cardID: string
	title: string
	creationDate: number
}

function CardSummary(props: Props) {

	const dateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
	
	return (
		<>
			<Draggable draggableId={`card-${props.cardID}`} index={props.index}>
				{(provided) => (
					<div
						className="shadow-md dark:shadow-base-alt rounded-lg bg-base border-accent border-1 py-1 px-2 min-h-[100px] mb-1.5"
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
					>
						<div className='flex justify-between'>
							<div className=''>{props.title}</div>
							<div className='text-text-muted text-sm flex items-center'>
								<i className="fa-solid fa-calendar-week"></i>
								<span className='ml-0.5 select-none'>{new Date(props.creationDate).toLocaleDateString("en-US", dateOptions)}</span>
							</div>
						</div>
					</div>
				)}
			</Draggable>
		</>
	)
}

export default CardSummary
