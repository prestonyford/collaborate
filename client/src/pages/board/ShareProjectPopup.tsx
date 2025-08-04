import Popup from "../../components/base/Popup"
import { useBoardStore } from "./boardStore"
import type ProjectShare from "../../model/dto/ProjectShare"
import clsx from "clsx"
import TextInput from "../../components/base/TextInput"
import Button from "../../components/base/Button"
import { act, useState } from "react"
import LoadingIcon from "../../components/base/LoadingIcon"

interface Props {
	onCancel: () => void
	onSubmit: () => void
}

function ShareProjectPopup(props: Props) {
	const liveShares = useBoardStore((state) => state.projectShares);
	const [activeShares, setActiveShares] = useState(liveShares);

	const [addUserUsername, setAddUserUsername] = useState<string>("");

	const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

	function removeShare(id: string) {
		setActiveShares(activeShares.filter(s => s.id !== id));
	}

	function handleConfirm() {

	}

	return (
		<Popup size='medium' title='Share Project' onEscape={props.onCancel} buttons={[{
			text: 'Cancel',
			variant: 'secondary',
			onClick: props.onCancel
		}, {
			text: 'Save',
			variant: 'primary',
			onClick: handleConfirm
		}]}>
			<div className="px-10 py-2 flex flex-col gap-4">
				<div className="grid grid-cols-[auto_1fr_1fr_auto] w-full text-center">
					<div></div>
					<div className="bg-accent p-1 border-t border-l border-accent">Username</div>
					<div className="bg-accent p-1 border-t border-x border-accent">Date shared</div>
					<div></div>
					{ activeShares.length > 0
						? activeShares.map((s, i) =>
							<div className="contents" key={s.id}>
								<div></div>
								<div className={clsx("text-text-muted p-1 border-t border-l border-accent", {"border-b": i === activeShares.length - 1})}>
									{s.sharedWith}
								</div>
								<div className={clsx("text-text-muted p-1 border-t border-x border-accent", {"border-b": i === activeShares.length - 1})}>
									{new Date(s.sharedTime).toLocaleDateString("en-US", dateOptions)}
								</div>
								<div className="text-left flex items-center px-2">
									<i className="fa-solid fa-xmark cursor-pointer" onClick={() => removeShare(s.id)}></i>
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
						<TextInput className="grow" placeholder="Username" value={addUserUsername} onChange={setAddUserUsername} />
						<div className="flex gap-2">
							<Button disabled={!addUserUsername} content="Add" variant={"primary"} />
							<div className={clsx("invisible")}>
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
