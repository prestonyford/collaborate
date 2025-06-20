import { useState } from 'react'
import ClickyIcon from './ClickyIcon'
import { useBoardStore } from './BoardStore'
import CardSummary from './CardSummary'

interface Props {
	columnID: string
	columnName: string
	columnColor?: string
}

function BoardColumn(props: Props) {
	const cardSummaries = useBoardStore((state) => state.cardSummaries[props.columnID]);
	
	return (
		<>
			<div className="flex-shrink-0 w-[360px] h-full shadow-xl dark:shadow-base-alt rounded-2xl bg-base border-accent border-1 overflow-hidden">
				<div className='w-full h-[8px]' style={{ backgroundColor: props.columnColor }}></div>
				<div className="w-full h-full p-3 pt-3 flex flex-col relative">
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
					<div className='flex flex-col gap-1 overflow-y-auto [&::-webkit-scrollbar]:hidden basis-0 grow pb-2'>
						{cardSummaries?.map(card => <CardSummary key={card.id} title={card.title} creationDate={card.creationDate} />)}
					</div>
				</div>
			</div>
		</>
	)
}

export default BoardColumn
