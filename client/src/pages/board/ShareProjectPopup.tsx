import Popup from "../../components/base/Popup"
import { useBoardStore } from "./boardStore"
import type ProjectShare from "../../model/dto/ProjectShare"
import clsx from "clsx"
import TextInput from "../../components/base/TextInput"
import Button from "../../components/base/Button"
import { useState } from "react"
import LoadingIcon from "../../components/base/LoadingIcon"
import { useServiceStore } from "../../serviceStore"
import type ShareProjectRequest from "../../net/request/ShareProjectRequest"
import { useUserStore } from "../../userStore"
import ProjectSharingEditor from "./ProjectSharingEditor"
import type PendingShare from "../../model/dto/PendingShare"

interface Props {
	loading: boolean
	onCancel: () => void
	onSubmit: (data: ShareProjectRequest) => void
}

function ShareProjectPopup(props: Props) {
	const liveShares = useBoardStore(state => state.projectShares);
	const projectId = useBoardStore(state => state.projectId);
	const me = useUserStore(state => state.me);
	const [activeShares, setActiveShares] = useState<PendingShare[]>(liveShares);

	function removeShare(username: string) {
		setActiveShares(activeShares.filter(s => s.sharedWith !== username));
	}

	async function handleAddUser(username: string) {
		if (!me) return;
		setActiveShares([...activeShares, {
			projectId,
			sharedWith: username,
			sharedBy: me?.username
		}]);
	}

	function handleSave() {
		props.onSubmit({
			projectId: projectId,
			usernames: activeShares.map(s => s.sharedWith)
		});
	}

	return (
		<Popup size='medium' title='Share Project' loading={props.loading} onEscape={props.onCancel} buttons={[{
			text: 'Cancel',
			variant: 'secondary',
			onClick: props.onCancel,
			disabled: false
		}, {
			text: 'Save',
			variant: 'primary',
			onClick: handleSave,
			disabled: false
		}]}>
			<div className="px-10 py-2 flex flex-col gap-4">
				<ProjectSharingEditor username={me!.username} shares={activeShares} onRemoveShare={removeShare} onAddShare={handleAddUser} />
			</div>
		</Popup>
	)
}

export default ShareProjectPopup
