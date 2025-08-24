import { DragDropContext, Droppable, type DroppableProvided, type DropResult } from '@hello-pangea/dnd'
import { useBoardStore } from './boardStore';
import BoardColumn from './BoardColumn';
import './board.css'
import { useState } from 'react';
import clsx from 'clsx';

interface Props {
}

function Board(props: Props) {
	const columns = useBoardStore((state) => state.columns);
	const setColumns = useBoardStore((state) => state.setColumns);
	const moveCard = useBoardStore((state) => state.moveCard);
	const [hasAnimated, setHasAnimated] = useState(false);

	function onDragEnd(result: DropResult) {
		const { source, destination, type } = result;
		if (!destination) return;

		if (type === 'column') {
			const newColumns = [...columns];
			const [moved] = newColumns.splice(result.source.index, 1)
			newColumns.splice(destination.index, 0, moved)
			setColumns(newColumns);
		} else if (type === 'card') {
			const sourceColumn = +source.droppableId;
			const destinationColumn = +destination.droppableId;
			moveCard(sourceColumn, destinationColumn, source.index, destination.index);
		}
	}

	function onAnimationEnd(index: number) {
		if (index === columns.length - 1) {
			setHasAnimated(true);
		}
	}

	if (columns.length === 0) {
		return <div className='flex h-full items-center justify-center text-text-muted select-none p-4'>
			This project is empty! Get started by clicking "Add column" above.
		</div>
	}

	return (
		<div className='basis-0 grow min-h-0'>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId='board' direction='horizontal' type='column'>
					{(provided: DroppableProvided) => (
						<div
							className='h-full overflow-y-hidden'
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							<div className="pl-2 pr-4 pb-4 h-full w-full flex overflow-x-auto items-start">
								{columns.map((column, i) => (
									<div
										key={column.id}
										className={clsx("h-full flex flex-col", {'column-item': !hasAnimated})}
										style={{ animationDelay: `${i * 100}ms` }}
										onAnimationEnd={() => onAnimationEnd(i)}
									>
										<BoardColumn
											index={i}
											columnId={column.id}
											columnName={column.name}
											columnColor={column.color}
										/>
									</div>
								))}
							</div>
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	)
}

export default Board
