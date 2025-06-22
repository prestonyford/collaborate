import { useEffect, useState } from 'react'
import Button from '../components/base/Button'
import Dropdown from '../components/base/Dropdown'
import Board from './board/Board';
import { useBoardStore } from './board/BoardStore';
import LoadingIcon from '../components/base/LoadingIcon';

interface Props {

}

function MainPage(props: Props) {
	const isLoading = useBoardStore((state) => state.isLoading);
	const initialize = useBoardStore((state) => state.initialize);
	const [labelFilter, setLabelFilter] = useState<string | null>(null);

	useEffect(() => {
		initialize("");
	}, [initialize]);

	return (
		<>
			<div className="grow min-w-0 h-full">
				<div className="py-4 px-6 flex justify-between items-center h-[72px]">
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
				<div className='w-full h-[calc(100%-72px)]'>
					{isLoading
						? <LoadingIcon />
						: <Board />
					}
				</div>
			</div>
		</>
	)
}

export default MainPage
