import clsx from "clsx"
import Popup from "../../components/base/Popup"
import TextInput from "../../components/base/TextInput"
import ProjectSharingEditor from "../board/ProjectSharingEditor"
import { useState } from "react"
import type PendingShare from "../../model/dto/PendingShare"
import { useUserStore } from "../../userStore"
import type CreateProjectRequest from "../../net/request/CreateProjectRequest"

interface Props {
	onCancel: () => void
	onCreate: (data: CreateProjectRequest) => void
	isLoading?: boolean
}

function CreateProjectPopup(props: Props) {
	const [name, setName] = useState("");
	const [shares, setShares] = useState<PendingShare[]>([]);
	const [nameValidationMessage, setNameValidationMessage] = useState<string | null>(null);
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

	function handleInputNname(val: string) {
		setNameValidationMessage(null);
		setName(val);
	}

	function validate() {
		if (name === "") {
			setNameValidationMessage("You must enter a name for the project.");
			return false;
		}
		return true;
	}

	function tryCreate() {
		if (!validate()) {
			return;
		}
		props.onCreate({ name, usernames: shares.map(s => s.sharedWith) })
	}

	return (
		<Popup size='medium' title='Create Project' loading={props.isLoading} onEscape={props.onCancel} buttons={[{
			text: 'Cancel',
			variant: 'secondary',
			onClick: props.onCancel
		}, {
			text: 'Create Project',
			variant: 'primary',
			onClick: tryCreate
		}]}>
			<div className={clsx("px-6 py-4 overflow-y-auto", { 'opacity-50 pointer-events-none': props.isLoading })}>
				<label htmlFor="name" className="block"><strong>Name</strong></label>
				<TextInput id="name" value={name} onChange={handleInputNname} invalid={!!nameValidationMessage} />
				<label htmlFor="sharing" className="block mt-4"><strong>Sharing</strong></label>
				<div className="p-2 border border-accent rounded-xl shadow-sm">
					<ProjectSharingEditor username={me!.username} shares={shares} onRemoveShare={removeShare} onAddShare={addShare} />
				</div>
				<div className="mt-4">
					<p><i className="text-text-muted text-sm">Labels, columns, and tasks can be managed after the project is created.</i></p>
					<p className="mb-1 text-red-400 text-sm">
						{nameValidationMessage}
					</p>
				</div>
			</div>
		</Popup>
	)
}

export default CreateProjectPopup
