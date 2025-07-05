import { useEffect, useState } from 'react'
import Button from '../components/base/Button'
import Dropdown from '../components/base/Dropdown'
import Board from './board/Board';
import { useBoardStore } from './board/BoardStore';
import LoadingIcon from '../components/base/LoadingIcon';
import LabelChecklistDropdown from './board/LabelChecklistDropdown';
import Page from './Page';

interface Props {

}

function Project(props: Props) {
	const isLoading = useBoardStore((state) => state.isLoading);
	const initialize = useBoardStore((state) => state.initialize);
	const [labelFilter, setLabelFilter] = useState<string | null>(null);

	useEffect(() => {
		initialize("");
	}, [initialize]);

	return (
		<>
			<Page title={<>
				<h1 className="basis-0 grow truncate pr-2">Project Name Here</h1>
				<div className='flex gap-3 text-sm'>
					<Button text="Add column" variant="primary" />
					<Button text="Share" variant="secondary" />
					<LabelChecklistDropdown onInput={() => {}} selectedIds={[]} defaultText="Filter labels" />
				</div>
			</>}>
				{isLoading
					? <LoadingIcon />
					: <Board />
				}
			</Page>
		</>
	)
}

export default Project
