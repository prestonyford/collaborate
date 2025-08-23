import clsx from "clsx"
import Popup from "../../components/base/Popup"
import TextInput from "../../components/base/TextInput"
import ProjectSharingEditor from "../board/ProjectSharingEditor"
import { useState } from "react"
import type PendingShare from "../../model/dto/PendingShare"
import { useUserStore } from "../../userStore"

interface Props {
	onCancel: () => void
	loading?: boolean
}

function CreateProjectPopup(props: Props) {
	const [shares, setShares] = useState<PendingShare[]>([]);
	const me = useUserStore(state => state.me);

	function removeShare(username: string) {
		setShares(shares.filter(s => s.sharedWith !== username));
	}

	function addShare(username: string) {
		setShares([...shares, {
			projectId: -1,
			sharedWith: username,
			sharedBy: me?.username!
		}]);
	}

	return (
		<Popup size='medium' title='Create Project' onEscape={props.onCancel} buttons={[{
			text: 'Cancel',
			variant: 'secondary',
			onClick: props.onCancel
		}, {
			text: 'Create Project',
			variant: 'primary',
			onClick: () => {}
		}]}>
			<div className={clsx("px-6 py-4 overflow-y-auto", { 'opacity-50 pointer-events-none': props.loading })}>
				<label htmlFor="name" className="block"><strong>Name</strong></label>
				<TextInput id="name" value={""} onChange={() => {}} />
				<label htmlFor="sharing" className="block mt-4"><strong>Sharing</strong></label>
				<div className="p-2 border border-accent rounded-xl shadow-sm">
					<ProjectSharingEditor username={me!.username} shares={shares} onRemoveShare={removeShare} onAddShare={addShare} />
				</div>
				<p className="mt-4">
					<i className="text-text-muted text-sm">Labels, columns, and tasks can be managed once the project is created.</i>
				</p>
			</div>
		</Popup>
	)
}

export default CreateProjectPopup
