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
import ColumnEditorPopup from './ColumnEditorPopup';

interface Props {

}

function Project(props: Props) {
	const initialize = useBoardStore((state) => state.initialize);
	const reset = useBoardStore((state) => state.reset);
	const createColumn = useBoardStore((state) => state.createColumn);
	const project = useBoardStore((state) => state.project);
	const [labelFilter, setLabelFilter] = useState<string | null>(null);

	const [createColumnPopupOpen, setCreateColumnPopupOpen] = useState<boolean>(false);

	const params = useParams();
	const projectID = params.pid;
	if (projectID === undefined) {
		return <NotFound />;
	}

	const { error, loading } = useAsyncWithError(async () => initialize(projectID), [initialize, reset, projectID]);

	if (error) {
		return <ErrorView allowRetry onRetry={() => window.location.reload()} message={error.message} />
	}

	async function handleCreateColumn(name: string, color: string) {
		try {
			await createColumn(name, color);
			setCreateColumnPopupOpen(false);
		} catch (error) {
			alert("An error occured while creating the column. Please try again.");
		}
	}

	return (
		<>
			<Page title={<>
				<h1 className="basis-0 grow truncate pr-2">{project?.name}</h1>
				<div className='flex gap-3 text-sm'>
					<Button content="Add column" variant="primary" onClick={() => setCreateColumnPopupOpen(true)} />
					<Button content="Share" variant="secondary" />
					<LabelChecklistDropdown onInput={() => { }} selectedIds={[]} defaultText="Filter labels" />
				</div>
			</>}>
				{loading
					? <LoadingIcon />
					: <Board />
				}
			</Page>

			{createColumnPopupOpen && <ColumnEditorPopup
				onCancel={() => setCreateColumnPopupOpen(false)}
				onSubmit={handleCreateColumn}
			/>}
		</>
	)
}

export default Project
