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

interface Props {
	loading: boolean
	onCancel: () => void
	onSubmit: (data: ShareProjectRequest) => void
}

type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type PendingShare = MakeOptional<ProjectShare, "sharedTime" | "sharedBy">

function ShareProjectPopup(props: Props) {
	const userService = useServiceStore(state => state.userService);
	const liveShares = useBoardStore(state => state.projectShares);
	const project = useBoardStore(state => state.project);
	const me = useUserStore(state => state.me);
	const [activeShares, setActiveShares] = useState<PendingShare[]>(liveShares);

	const [addUserUsername, setAddUserUsername] = useState<string>("");
	const [queryingUsername, setQueryingUsername] = useState<boolean>(false);

	const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

	function removeShare(username: string) {
		setActiveShares(activeShares.filter(s => s.sharedWith !== username));
	}

	async function handleAddUser() {
		if (!addUserUsername || queryingUsername) {
			return;
		}
		if (me && me.username === addUserUsername) {
			alert("You cannot share a project that you own with yourself.");
			return;
		}

		setQueryingUsername(true);
		try {
			const user = await userService.checkUsername(addUserUsername);
			if (user) {
				const newShare = {
					projectId: project!.id,
					sharedWith: addUserUsername
				}
				setActiveShares([...activeShares, newShare])
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

	function handleSave() {
		props.onSubmit({
			projectId: project!.id,
			usernames: activeShares.map(s => s.sharedWith)
		});
	}

	return (
		<Popup size='medium' title='Share Project' loading={props.loading} onEscape={props.onCancel} buttons={[{
			text: 'Cancel',
			variant: 'secondary',
			onClick: props.onCancel,
			disabled: queryingUsername
		}, {
			text: 'Save',
			variant: 'primary',
			onClick: handleSave,
			disabled: queryingUsername
		}]}>
			<div className="px-10 py-2 flex flex-col gap-4">
				<div className="grid grid-cols-[auto_1fr_1fr_auto] w-full text-center">
					<div></div>
					<div className="bg-accent p-1 border-t border-l border-accent">Username</div>
					<div className="bg-accent p-1 border-t border-x border-accent">Date shared</div>
					<div></div>
					{activeShares.length > 0
						? activeShares.map((s, i) =>
							<div className="contents" key={s.sharedWith}>
								<div></div>
								<div className={clsx("text-text-muted p-1 border-t border-l border-accent", { "border-b": i === activeShares.length - 1 })}>
									{s.sharedWith}
								</div>
								<div className={clsx("text-text-muted p-1 border-t border-x border-accent", { "border-b": i === activeShares.length - 1 })}>
									{s.sharedTime
										? new Date(s.sharedTime).toLocaleDateString("en-US", dateOptions)
										: '-'
									}
								</div>
								<div className="text-left flex items-center px-2">
									<i className="fa-solid fa-xmark cursor-pointer" onClick={() => removeShare(s.sharedWith)}></i>
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
					<strong>Add user</strong>
					<div className="flex gap-2 flex-wrap text-text-muted">
						<TextInput disabled={queryingUsername} className="grow" placeholder="Username" value={addUserUsername} onChange={setAddUserUsername} onEnter={handleAddUser} />
						<div className="flex gap-2">
							<Button disabled={!addUserUsername || queryingUsername} content="Add" variant="primary" onClick={handleAddUser} />
							<div className={clsx({ "invisible": !queryingUsername })}>
								<LoadingIcon size="small" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Popup>
	)
}

export default ShareProjectPopup
