import { DragDropContext, Droppable, type DroppableProvided, type DropResult } from '@hello-pangea/dnd'
import { useBoardStore } from './BoardStore';
import BoardColumn from './BoardColumn';

interface Props {
}

function Board(props: Props) {
	const columns = useBoardStore((state) => state.columns);
	const setColumns = useBoardStore((state) => state.setColumns);
	const cardSummaries = useBoardStore((state) => state.cardSummaries);
	const setCardSummary = useBoardStore((state) => state.setColumnCardSummaries);

	function onDragEnd(result: DropResult) {
		const { source, destination, type } = result;
		if (!destination) return;

		if (type === 'column') {
			const newColumns = [...columns];
			const [moved] = newColumns.splice(result.source.index, 1)
			newColumns.splice(destination.index, 0, moved)
			setColumns(newColumns);
		} else if (type === 'card') {
			const sourceColumn = source.droppableId;
			const destinationColumn = destination.droppableId;

			const sourceCards = [...cardSummaries[sourceColumn]];
			const [moved] = sourceCards.splice(source.index, 1);

			const droppedInSameColumn = sourceColumn === destinationColumn;
			if (droppedInSameColumn) {
				sourceCards.splice(destination.index, 0, moved);
				setCardSummary(sourceColumn, sourceCards);
			} else {
				const destCards = [...cardSummaries[destinationColumn]];
				destCards.splice(destination.index, 0, moved);
				setCardSummary(sourceColumn, sourceCards);
				setCardSummary(destinationColumn, destCards);
			}
		}
	}

	return (
		<>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId='board' direction='horizontal' type='column'>
					{(provided: DroppableProvided) => (
						<div
							className="pl-2 pr-4 pb-4 h-full w-full flex overflow-x-auto items-start"
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							{columns.map((column, i) => (
								<div className="flex flex-col" style={{height: 'calc(100%)'}}>
									<BoardColumn
										key={column.id}
										index={i}
										columnID={column.id}
										columnName={column.name}
										columnColor={column.color}
									/>
								</div>
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
