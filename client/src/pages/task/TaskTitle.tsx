import { useState } from "react";
import { useTaskStore } from "./taskStore";
import EditableTitle from "./EditableTitle";

export default function TaskTitle() {
	const task = useTaskStore(state => state.task);
	const saveTitle = useTaskStore(state => state.saveTitle);
	
	const [isSavingTitle, setIsSavingTitle] = useState<boolean>(false);

	if (!task) {
		return;
	}
	
	async function handleUpdateTitle(newTitle: string) {
		setIsSavingTitle(true);
		try {
			await saveTitle(newTitle);
		} catch (error) {
			console.error(error);
			alert("An error occured while updating the task title. Please try again later.");
		} finally {
			setIsSavingTitle(false);
		}
	}

	return (
		<EditableTitle title={task.title} onInput={handleUpdateTitle} loading={isSavingTitle} />
	)
}
