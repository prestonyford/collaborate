import { useState } from "react";
import DOMPurify from 'dompurify';
import Button from "../../components/base/Button";
import MyCKEditor from "../../components/ckeditor/MyCKEditor";
import { useTaskStore } from "./taskStore";
import LoadingIcon from "../../components/base/LoadingIcon";
import clsx from "clsx";

interface Props {

}

function Description(props: Props) {
	const task = useTaskStore(state => state.task);
	const editingDescription = useTaskStore(state => state.editingDescription);
	const setEditingDescription = useTaskStore(state => state.setEditingDescription);
	const saveDescription = useTaskStore(state => state.saveDescription);

	const [newDescription, setNewDescription] = useState<string>('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
	const [savingDescription, setSavingDescription] = useState<boolean>(false);

	async function handleSave() {
		setSavingDescription(true);
		await saveDescription(newDescription);
		setEditingDescription(false);
		setSavingDescription(false);
	}

	if (!task) return null;

	return (
		<>
			<div className="mt-4 mb-1 flex items-center">
				<h3 className="">Description</h3>
				<div className="ml-2.5 flex gap-2 items-center">
					{editingDescription
						? <>
							<Button
								content={<>Save <i className="ml-1.5 text-sm fa-solid fa-floppy-disk"></i></>}
								variant={"primary"}
								disabled={savingDescription}
								onClick={handleSave}
							/>
							<Button
								content={<>Cancel <i className="ml-1.5 text-sm fa-solid fa-xmark"></i></>}
								variant={"secondary"}
								disabled={savingDescription}
								onClick={() => setEditingDescription(false)}
							/>
							{savingDescription && <LoadingIcon size="small" />}
						</>
						: <Button
							content={<>Edit <i className="ml-1.5 text-sm fa-solid fa-pen-to-square"></i></>}
							variant={"secondary"}
							onClick={() => setEditingDescription(true)}
						/>
					}
				</div>
			</div>
			{editingDescription
				? <div className={clsx({'opacity-50 pointer-events-none': savingDescription})}>
					<MyCKEditor placeholder="Click to edit" initialData={task.description} onChange={setNewDescription} />
				</div>
				: <p className="text-text-muted" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(task.description) }}></p>
			}

		</>
	)
}

export default Description
