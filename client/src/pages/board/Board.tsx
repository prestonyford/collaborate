import { DragDropContext, Droppable, type DroppableProvided, type DropResult } from '@hello-pangea/dnd'
import { useState, type ReactNode } from 'react'
import { useBoardStore } from './BoardStore';
import BoardColumn from './BoardColumn';

interface Props {
}

function Board(props: Props) {
	const columns = useBoardStore((state) => state.columns);
	const setColumns = useBoardStore((state) => state.setColumns);

	function onDragEnd(result: DropResult) {
		if (!result.destination) return;
		const newColumns = [...columns];
		const [moved] = newColumns.splice(result.source.index, 1)
		newColumns.splice(result.destination.index, 0, moved)
		setColumns(newColumns);
	}

	return (
		<>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId='columns' direction='horizontal'>
					{(provided: DroppableProvided) => (
						<div
							className="pl-2 pr-4 pb-4 h-full w-full flex overflow-x-auto"
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							{columns.map((column, i) => (
								<BoardColumn
									key={column.id}
									index={i}
									columnID={column.id}
									columnName={column.name}
									columnColor={column.color}
								/>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</>
	)
}

export default Board
