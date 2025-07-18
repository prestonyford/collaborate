import { useEffect, useState } from 'react'
import Button from '../../components/base/Button'
import Board from './Board';
import { useBoardStore } from './boardStore';
import LoadingIcon from '../../components/base/LoadingIcon';
import LabelChecklistDropdown from './LabelChecklistDropdown';
import Page from '../Page';
import ErrorView from '../../components/base/ErrorView';
import { useAsyncWithError } from '../../hooks/useAsyncWithError';
import { useParams } from 'react-router-dom';
import NotFound from '../NotFound';

interface Props {

}

function Project(props: Props) {
	const initialize = useBoardStore((state) => state.initialize);
	const reset = useBoardStore((state) => state.reset);
	const project = useBoardStore((state) => state.project);
	const [labelFilter, setLabelFilter] = useState<string | null>(null);

	const params = useParams();
	const projectID = params.pid;
	if (projectID === undefined) {
		return <NotFound />;
	}

	const { error, loading } = useAsyncWithError(async () => initialize(projectID), [initialize, reset, projectID]);

	if (error) {
		return <ErrorView allowRetry onRetry={() => window.location.reload()} message={error.message} />
	}

	return (
		<>
			<Page title={<>
				<h1 className="basis-0 grow truncate pr-2">{project?.name}</h1>
				<div className='flex gap-3 text-sm'>
					<Button content="Add column" variant="primary" />
					<Button content="Share" variant="secondary" />
					<LabelChecklistDropdown onInput={() => { }} selectedIds={[]} defaultText="Filter labels" />
				</div>
			</>}>
				{loading
					? <LoadingIcon />
					: <Board />
				}
			</Page>
		</>
	)
}

export default Project
