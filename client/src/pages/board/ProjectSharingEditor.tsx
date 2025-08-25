import clsx from "clsx"
import TextInput from "../../components/base/TextInput"
import Button from "../../components/base/Button"
import { useState } from "react"
import LoadingIcon from "../../components/base/LoadingIcon"
import { useServiceStore } from "../../serviceStore"
import type PendingShare from "../../model/dto/PendingShare"

interface Props {
	shares: PendingShare[]
	username: string
	onRemoveShare: (username: string) => void
	onAddShare: (username: string) => void
}

function ProjectSharingEditor({ shares, username, onRemoveShare, onAddShare }: Props) {
	const userService = useServiceStore(state => state.userService);

	const [addUserUsername, setAddUserUsername] = useState<string>("");
	const [queryingUsername, setQueryingUsername] = useState<boolean>(false);

	const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

	async function handleAddUser() {
		if (!addUserUsername || queryingUsername) {
			return;
		}
		if (username === addUserUsername) {
			alert("You cannot share a project that you own with yourself.");
			return;
		}
		if (shares.some(s => s.sharedWith === addUserUsername)) {
			alert("This project is already shared with that user.");
			return;
		}

		setQueryingUsername(true);
		try {
			const user = await userService.checkUsername(addUserUsername);
			if (user) {
				onAddShare(addUserUsername);
				setAddUserUsername("");
			} else {
				alert("A user with that username does not exist.");
			}
		} catch (error) {
			alert("An error occured while checking the user.");
			console.error(error);
		} finally {
			setQueryingUsername(false);
		}
	}

	return <>
		<div className="grid grid-cols-[auto_1fr_1fr_auto] w-full text-center">
			<div></div>
			<div className="bg-accent p-1 border-t border-l border-accent rounded-tl-md">Username</div>
			<div className="bg-accent p-1 border-t border-x border-accent rounded-tr-md">Date shared</div>
			<div></div>
			{shares.length > 0
				? shares.map((s, i) =>
					<div className="contents" key={s.sharedWith}>
						<div></div>
						<div className={clsx("text-text-muted p-1 border-t border-l border-accent", { "border-b rounded-bl-md": i === shares.length - 1 })}>
							{s.sharedWith}
						</div>
						<div className={clsx("text-text-muted p-1 border-t border-x border-accent", { "border-b  rounded-br-md": i === shares.length - 1 })}>
							{s.sharedTime
								? new Date(s.sharedTime).toLocaleDateString("en-US", dateOptions)
								: '-'
							}
						</div>
						<div className="text-left flex items-center px-2">
							<i className="fa-solid fa-xmark cursor-pointer" onClick={() => onRemoveShare(s.sharedWith)}></i>
						</div>
					</div>
				)
				: <>
					<div></div>
					<div className="col-span-2 text-text-muted select-none">No users</div>
					<div></div>
				</>
			}
		</div>
		<div>
			<label htmlFor="sharingUsername"><strong>Add user</strong></label>
			<div className="flex gap-2 flex-wrap text-text-muted">
				<TextInput id="sharingUsername" disabled={queryingUsername} className="grow" placeholder="Username" value={addUserUsername} onChange={setAddUserUsername} onEnter={handleAddUser} />
				<div className="flex gap-2">
					<Button disabled={!addUserUsername || queryingUsername} content="Add" variant="primary" onClick={handleAddUser} />
					<div className={clsx({ "invisible": !queryingUsername })}>
						<LoadingIcon size="small" />
					</div>
				</div>
			</div>
		</div>
	</>
}

export default ProjectSharingEditor
