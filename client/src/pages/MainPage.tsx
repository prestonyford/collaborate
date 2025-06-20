import { useEffect, useState } from 'react'
import Button from '../components/base/Button'
import Dropdown from '../components/base/Dropdown'
import Board from './board/Board';
import BoardColumn from './board/BoardColumn';
import { useBoardStore } from './board/BoardStore';

interface Props {
	
}

function MainPage(props: Props) {
	const columns = useBoardStore((state) => state.columns)
	const initialize = useBoardStore((state) => state.initialize)
	const [labelFilter, setLabelFilter] = useState<string | null>(null);

	useEffect(() => {
		initialize("");
	}, [initialize]);
	
	return (
		<>
			<div className="grow flex flex-col min-w-0">
				<div className="py-4 px-6 flex justify-between items-center">
					<h1 className="basis-0 grow truncate pr-2">Project Name Here</h1>
					<div className='flex gap-3 text-sm'>
						<Button text="Add column" variant="primary" />
						<Button text="Share" variant="secondary" />
						<Dropdown
							defaultText='Select a label'
							selectedId={labelFilter ?? undefined}
							options={[
								{ id: '0', text: 'All labels' },
								{ id: '1', text: 'One' },
								{ id: '2', text: 'Two' },
								{ id: '3', text: 'Three' },
							]}
							triggerClass='min-w-[150px]'
							onSelect={id => setLabelFilter(id)}
						/>
					</div>
				</div>
				<div className='grow w-full'>
					<Board>
						{columns.map(column => <BoardColumn key={column.id} columnID={column.id} columnName={column.name} columnColor={column.color} />)}
					</Board>
				</div>
			</div>
		</>
	)
}

export default MainPage
