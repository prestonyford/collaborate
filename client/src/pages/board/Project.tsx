import { useEffect, useMemo, useState } from 'react'
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
import EditableTitle from '../task/EditableTitle';
import { useProjectsStore } from '../../projectsStore';
import { useProject } from '../../hooks/useProject';

interface Props {

}

function Project(props: Props) {
	const {
		initialize,
		reset,
		createColumn,
		projectLabels,
		shareProject,
		labelFilter,
		setLabelFilter
	} = useBoardStore();

	const {
		updateProjectName,
		isLoadingAllProjects,
	} = useProjectsStore();

	const [createColumnPopupOpen, setCreateColumnPopupOpen] = useState<boolean>(false);
	const [sharePopupOpen, setSharePopupOpen] = useState<boolean>(false);
	const [isSavingShare, setIsSavingShare] = useState<boolean>(false);
	const [isRenamingProjectName, setIsRenamingProjectName] = useState<boolean>(false);

	const { pid } = useParams();
	const projectId = pid ? +pid : undefined;
	if (projectId === undefined) return <NotFound />;

	const project = useProject(projectId);

	const { error, loading } = useAsyncWithError(async () => {
		if (project) {
			await initialize(project.id);
		}
	}, [initialize, reset, project]);

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
			await updateProjectName(projectId!, newName);
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
				{loading || isLoadingAllProjects
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
