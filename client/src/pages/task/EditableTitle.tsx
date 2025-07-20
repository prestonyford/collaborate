import { useState } from "react";
import TextInput from "../../components/base/TextInput";
import clsx from "clsx";
import Button from "../../components/base/Button";
import LoadingIcon from "../../components/base/LoadingIcon";

interface Props {
	title: string
	onInput: (title: string) => void
	loading?: boolean
}

const loadingClasses = "opacity-50 pointer-events-none";

export default function EditableTitle(props: Props) {
	const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
	const [newTitle, setNewTitle] = useState<string>(props.title);

	function handleInput(event: React.MouseEvent) {
		event.stopPropagation();
		props.onInput(newTitle);
		setIsEditingTitle(false);
	}

	function handleCancel(event: React.MouseEvent) {
		event.stopPropagation();
		setIsEditingTitle(false);
		setNewTitle(props.title);
	}

	return <div className={clsx("flex")} onClick={() => setIsEditingTitle(true)}>
		<h1 className={clsx({ 'w-0 overflow-hidden whitespace-nowrap': isEditingTitle })}>{props.title}</h1>
		{isEditingTitle && <div className="flex gap-2">
			<div className={clsx("flex items-stretch text-xl font-bold h-full", { [loadingClasses]: props.loading })}>
				<TextInput value={newTitle} onChange={setNewTitle} />
			</div>
			<div className={clsx("flex items-center gap-2", { [loadingClasses]: props.loading })}>
				<Button content={<>Save <i className="ml-1.5 text-sm fa-solid fa-floppy-disk"></i></>} variant={"primary"} onClick={handleInput} />
				<Button content={<>Cancel <i className="ml-1.5 text-sm fa-solid fa-xmark"></i></>} variant={"secondary"} onClick={handleCancel} />
			</div>
			{props.loading && <LoadingIcon size="small" />}
		</div>}
	</div>
}
