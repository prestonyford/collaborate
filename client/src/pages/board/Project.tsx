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
import ShareProjectPopup from './ShareProjectPopup';
import type ShareProjectRequest from '../../net/request/ShareProjectRequest';
import TextInput from '../../components/base/TextInput';
import EditableTitle from '../task/EditableTitle';
import { useProjectsStore } from '../../projectsStore';

interface Props {

}

function Project(props: Props) {
	const initialize = useBoardStore((state) => state.initialize);
	const reset = useBoardStore((state) => state.reset);
	const createColumn = useBoardStore((state) => state.createColumn);
	const project = useBoardStore((state) => state.project);
	const projectLabels = useBoardStore((state) => state.projectLabels);
	const shareProject = useBoardStore((state) => state.shareProject);
	const labelFilter = useBoardStore((state) => state.labelFilter);
	const setLabelFilter = useBoardStore((state) => state.setLabelFilter);
	const renameProject = useBoardStore((state) => state.renameProject);
	const projectsStoreHasInitialized = useProjectsStore((state) => state.hasInitialized);

	const [createColumnPopupOpen, setCreateColumnPopupOpen] = useState<boolean>(false);
	const [sharePopupOpen, setSharePopupOpen] = useState<boolean>(false);
	const [isSavingShare, setIsSavingShare] = useState<boolean>(false);
	const [isRenamingProjectName, setIsRenamingProjectName] = useState<boolean>(false);

	const params = useParams();
	const projectId = params.pid;
	if (projectId === undefined) {
		return <NotFound />;
	}

	const { error, loading } = useAsyncWithError(async () => {
		if (projectsStoreHasInitialized) {
			initialize(+projectId);
		}
	}, [initialize, reset, projectId, projectsStoreHasInitialized]);

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

	async function handleShareProject(data: ShareProjectRequest) {
		setIsSavingShare(true);
		try {
			await shareProject(data);
			setSharePopupOpen(false);
		} catch (error) {
			alert("An error occured while sharing the project. Please try again.");
		} finally {
			setIsSavingShare(false);
		}
	}

	async function handleSaveProjectName(newName: string) {
		setIsRenamingProjectName(true);
		try {
			await renameProject(newName);
		} catch (error) {
			alert("An error occured while renaming the project. Please try again.");
		} finally {
			setIsRenamingProjectName(false);
		}
	}

	return (
		<>
			<Page title={<>
				<EditableTitle title={project?.name || ""} onInput={handleSaveProjectName} loading={isRenamingProjectName} />
				<div className='flex gap-3 text-sm'>
					<LabelChecklistDropdown labels={projectLabels} onInput={setLabelFilter} selectedIds={[...labelFilter]} defaultText="Filter labels" />
					<Button content="Share" variant="secondary" onClick={() => setSharePopupOpen(true)} />
					<Button content="Add column" variant="primary" onClick={() => setCreateColumnPopupOpen(true)} />
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
			{sharePopupOpen && <ShareProjectPopup
				loading={isSavingShare}
				onCancel={() => setSharePopupOpen(false)}
				onSubmit={handleShareProject}
			/>}
		</>
	)
}

export default Project
