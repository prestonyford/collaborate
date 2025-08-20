import { Draggable } from '@hello-pangea/dnd'
import { useBoardStore } from './boardStore'
import Label from '../../components/base/Label'
import { useMemo } from 'react'

interface Props {
	index: number
	cardID: number
	title: string
	creationDate: number
	labelIDs?: number[]
	onClick?: () => void
}

function CardSummary(props: Props) {
	const projectLabels = useBoardStore((state) => state.projectLabels);
	const projectLabelsMap = useMemo(
		() => Object.fromEntries(projectLabels.map(label => [label.id, label])),
		[projectLabels]
	);

	const dateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
	
	return (
		<>
			<Draggable draggableId={`card-${props.cardID}`} index={props.index}>
				{(provided) => (
					<div
						className="shadow-md rounded-lg bg-surface hover:bg-surface-active transition-colors border-accent border-1 py-1 px-2 mb-1.5 !cursor-pointer flex flex-col justify-between"
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						onClick={props.onClick}
					>
						<div className='flex justify-between mb-1'>
							<div className=''>{props.title}</div>
							<div className='text-text-muted text-sm flex items-center'>
								<i className="fa-solid fa-calendar-week"></i>
								<span className='ml-0.5 select-none'>{new Date(props.creationDate).toLocaleDateString("en-US", dateOptions)}</span>
							</div>
						</div>
						<div className="min-h-[62px]">
							<div className='pb-1 flex gap-1 flex-wrap'>
								{props.labelIDs?.map(labelID =>
									<Label key={labelID} title={projectLabelsMap[labelID]?.title || "???"} color={projectLabelsMap[labelID]?.color} />
								)}
							</div>
						</div>
					</div>
				)}
			</Draggable>
		</>
	)
}

export default CardSummary
