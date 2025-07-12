import { useTaskStore } from "./taskStore";

interface Props {

}

function Discussion(props: Props) {
	const task = useTaskStore(state => state.task);
	if (!task) return null;

	return (
		<>
			<h3 className="mt-4">Discussion</h3>
			<div className="text-text-muted flex flex-col pt-1">
				Discussion here
			</div>
		</>
	)
}

export default Discussion
