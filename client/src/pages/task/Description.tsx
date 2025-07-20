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
	if (!task) return null;

	const saveDescription = useTaskStore(state => state.saveDescription);

	const [isEditingDescription, setIsEditingDescription] = useState<boolean>(false);
	const [newDescription, setNewDescription] = useState<string>(task.description ?? "");
	const [savingDescription, setSavingDescription] = useState<boolean>(false);

	async function handleSave() {
		setSavingDescription(true);
		try {
			await saveDescription(newDescription);
			setIsEditingDescription(false);
		} catch (error) {
			alert("An error occured while saving the description. Please try again.");
		} finally {
			setSavingDescription(false);
		}
	}

	function handleCancel() {
		if (newDescription === task?.description || window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
			setIsEditingDescription(false);
		}
	}


	return (
		<>
			<div className="mt-4 mb-1 flex items-center">
				<h3 className="">Description</h3>
				<div className="ml-2.5 flex gap-2 items-center select-none">
					{isEditingDescription
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
								onClick={handleCancel}
							/>
							{savingDescription && <LoadingIcon size="small" />}
						</>
						: <Button
							content={<>Edit <i className="ml-1.5 text-sm fa-solid fa-pen-to-square"></i></>}
							variant={"secondary"}
							onClick={() => setIsEditingDescription(true)}
						/>
					}
				</div>
			</div>
			{isEditingDescription
				? <div className={clsx({'opacity-50 pointer-events-none': savingDescription})}>
					<MyCKEditor placeholder="Click to edit" initialData={task.description} onChange={setNewDescription} />
				</div>
				: <p className="text-text-muted" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(task.description) }}></p>
			}

		</>
	)
}

export default Description
