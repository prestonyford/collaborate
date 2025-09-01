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
import { useServiceStore } from '../../serviceStore';
import LabelManagerPopup from './LabelManagerPopup';
import type CreateLabelsRequest from '../../net/request/CreateLabelsRequest';
import type DeleteLabelsRequest from '../../net/request/DeleteLabelsRequest';

interface Props {

}

function Project(props: Props) {
	const {
		projectService
	} = useServiceStore();

	const {
		initialize,
		reset,
		createColumn,
		projectLabels,
		shareProject,
		labelFilter,
		setLabelFilter,
		createLabels,
		deleteLabels
	} = useBoardStore();

	const {
		updateProject,
		isLoadingAllProjects,
	} = useProjectsStore();

	const [createColumnPopupOpen, setCreateColumnPopupOpen] = useState<boolean>(false);
	const [sharePopupOpen, setSharePopupOpen] = useState<boolean>(false);
	const [labelPopupOpen, setLabelPopupOpen] = useState<boolean>(false);
	const [isSavingLabels, setIsSavingLabels] = useState<boolean>(false);
	const [isSavingShare, setIsSavingShare] = useState<boolean>(false);
	const [isRenamingProjectName, setIsRenamingProjectName] = useState<boolean>(false);

	const { pid } = useParams();
	const projectId = pid ? +pid : undefined;
	if (projectId === undefined) return <NotFound />;

	const { error, loading } = useAsyncWithError(async () => {
		await initialize(projectId);
	}, [initialize, reset, projectId]);

	const project = useProject(projectId);

	if (error) {
		return <ErrorView allowRetry onRetry={() => window.location.reload()} message={error.message} />
	}

	async function handleManageLabels(createData: CreateLabelsRequest, deleteData: DeleteLabelsRequest) {
		setIsSavingLabels(true);
		if (createData.labels.length) {
			try {
				const createRequest: CreateLabelsRequest = {
					labels: createData.labels
				}
				await createLabels(createRequest);
			} catch (error) {
				console.error(error);
				alert("An error occured while creating the labels.");
			}
		}
		setIsSavingLabels(false);
		setLabelPopupOpen(false);
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
			const newProject = await projectService.updateProjectName(projectId!, newName);
			updateProject(projectId!, newProject);
		} catch (error) {
			alert("An error occured while renaming the project. Please try again.");
		} finally {
			setIsRenamingProjectName(false);
		}
	}

	return (
		<>
			<Page title={<div className='flex justify-between items-center flex-wrap gap-2'>
				<EditableTitle title={project?.name || ""} onInput={handleSaveProjectName} loading={isRenamingProjectName} />
				<div className='flex gap-3 text-sm'>
					<LabelChecklistDropdown labels={projectLabels} onInput={setLabelFilter} selectedIds={[...labelFilter]} defaultText="Filter labels" />
					<Button content="Manage labels" variant="secondary" onClick={() => setLabelPopupOpen(true)} />
					<Button content="Share" variant="secondary" onClick={() => setSharePopupOpen(true)} />
					<Button content="Add column" variant="primary" onClick={() => setCreateColumnPopupOpen(true)} />
				</div>
			</div>}>
				{loading || isLoadingAllProjects
					? <LoadingIcon />
					: <Board />
				}
			</Page>

			{labelPopupOpen && <LabelManagerPopup
				loading={isSavingLabels}
				onCancel={() => setLabelPopupOpen(false)}
				onSubmit={handleManageLabels}
			/>}
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
