import { useState } from 'react'
import ClickyIcon from './ClickyIcon'
import { useBoardStore } from './BoardStore'
import CardSummary from './CardSummary'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import clsx from 'clsx'

interface Props {
	index: number
	columnID: string
	columnName: string
	columnColor?: string
}

function BoardColumn(props: Props) {
	const cardSummaries = useBoardStore((state) => state.cardSummaries[props.columnID]);
	
	return (
		<>
			<Draggable draggableId={`column-${props.columnID}`} index={props.index}>
				{(provided) => (
					<div
						className={clsx(
							"mx-2 flex-shrink-0 w-[360px] h-full shadow-xl dark:shadow-base-alt rounded-2xl bg-base border-accent border-1 overflow-hidden"
						)}
						ref={provided.innerRef}
						{...provided.draggableProps}
					>
						<div className='w-full h-[8px]' style={{ backgroundColor: props.columnColor }}></div>
						<div className="w-full h-full p-3 pt-3 flex flex-col relative">
							<div className='flex justify-between gap-2 pb-2'>
								<div>
									<i className="fa-solid fa-grip-vertical mr-2 cursor-grab" {...provided.dragHandleProps}></i>
									<strong className='truncate'>{props.columnName}</strong>
								</div>
								<div className='flex gap-1'>
									<ClickyIcon icon="fa-solid fa-plus" />
									<ClickyIcon icon="fa-solid fa-ellipsis" />
								</div>
							</div>
							<Droppable droppableId={props.columnID} type="card">
								{(provided) => (
									<div
										className='flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden basis-0 grow pb-1'
										ref={provided.innerRef}
										{...provided.droppableProps}
									>
										{cardSummaries?.map((card, i) => <CardSummary key={card.id} index={i} cardID={card.id} title={card.title} creationDate={card.creationDate} />)}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</div>
					</div>
				)}
			</Draggable>
		</>
	)
}

export default BoardColumn
