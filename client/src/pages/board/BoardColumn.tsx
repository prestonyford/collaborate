import ClickyIcon from './ClickyIcon'
import { useBoardStore } from './BoardStore'
import CardSummary from './CardSummary'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import clsx from 'clsx'
import Popup from '../../components/base/Popup'
import { useState } from 'react'
import CreateCardPopup from './CreateCardPopup'

interface Props {
	index: number
	columnID: string
	columnName: string
	columnColor?: string
}

type Popups = 'CreateCard'

function BoardColumn(props: Props) {
	const cardSummaries = useBoardStore((state) => state.cardSummaries[props.columnID]);

	const [popupOpen, setPopupOpen] = useState<Popups | null>(null);

	return (
		<>
			<Draggable draggableId={`column-${props.columnID}`} index={props.index}>
				{(provided) => (
					<div
						className={clsx(
							"mx-2 w-[360px] shadow-xl dark:shadow-base-alt rounded-2xl bg-base border-accent border-1 flex flex-col max-h-full overflow-hidden"
						)}
						ref={provided.innerRef}
						{...provided.draggableProps}
						style={{ ...provided.draggableProps.style, }}
					>
						<div className='w-full min-h-[8px]' style={{ backgroundColor: props.columnColor }}></div>
						<div className="w-full h-full grow p-3 flex flex-col relative pb-2">
							<div className='flex justify-between gap-2 pb-2'>
								<div>
									<i className="fa-solid fa-grip-vertical mr-2 cursor-grab" {...provided.dragHandleProps}></i>
									<strong className='truncate'>{props.columnName}</strong>
								</div>
								<div className='flex gap-1'>
									<ClickyIcon icon="fa-solid fa-plus" onClick={() => setPopupOpen('CreateCard')} />
									<ClickyIcon icon="fa-solid fa-ellipsis" />
								</div>
							</div>
							<Droppable droppableId={props.columnID} type="card">
								{(provided, snapshot) => (
									<>
										<div
											className='flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden shrink grow min-h-[60px] relative'
											ref={provided.innerRef}
											{...provided.droppableProps}
										>
											{cardSummaries?.map((card, i) =>
												<CardSummary key={card.id} index={i} cardID={card.id} title={card.title} creationDate={card.creationDate} labelIDs={card.labels} />
											)}
											{cardSummaries.length === 0 &&
												<p className={clsx('m-auto w-full select-none text-text-muted text-sm text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity', snapshot.isDraggingOver ? 'opacity-0' : 'opacity-100')}>
													Drag a card here or create one with the + button
												</p>
											}
											{provided.placeholder}
										</div>
									</>
								)}
							</Droppable>
						</div>
					</div>
				)}
			</Draggable>

			{ popupOpen === 'CreateCard' && <CreateCardPopup onCancel={() => setPopupOpen(null)} />}
		</>
	)
}

export default BoardColumn
