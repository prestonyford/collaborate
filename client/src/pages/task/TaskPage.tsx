import { useNavigate, useParams } from "react-router-dom"
import Label from "../../components/base/Label"
import Page from "../Page"
import { useMemo } from "react";
import LoadingIcon from "../../components/base/LoadingIcon";
import { useTaskStore } from "./taskStore";
import NotFound from "../NotFound";
import Description from "./Description";
import Discussion from "./Discussion";
import { useAsyncWithError } from "../../hooks/useAsyncWithError";
import ErrorView from "../../components/base/ErrorView";
import TaskTitle from "./TaskTitle";
import './taskPage.css'
import Labels from "./Labels";

interface Props {

}

function TaskPage(props: Props) {
	const params = useParams();
	const navigate = useNavigate();

	const initialize = useTaskStore(state => state.initialize);
	const reset = useTaskStore(state => state.reset);
	const task = useTaskStore(state => state.task);

	const projectId = params.pid;
	const taskID = params.tid;
	if (projectId === undefined || taskID === undefined) {
		return <NotFound />;
	}

	const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

	const { error, loading } = useAsyncWithError(async () => initialize(+projectId, +taskID), [initialize, reset]);

	if (error) {
		return <ErrorView allowRetry onRetry={() => window.location.reload()} message={error.message} />
	}


	return (
		<>
			{loading || task === null
				? <LoadingIcon />
				: <Page title={
					<div className="page-item w-full -mb-2 flex justify-between items-center">
						<TaskTitle />
					</div>
				}>
					<div className="page-item px-6">
						<div className="text-text-muted text-sm flex gap-6">
							<div>
								<i className="fa-solid fa-user mr-1"></i>
								{task.createdBy}
							</div>
							<div>
								<i className="fa-solid fa-calendar-week mr-1"></i>
								{new Date(task.creationDate).toLocaleDateString("en-US", dateOptions)}
							</div>
						</div>

						<div className="page-item">
							<Description />
						</div>

						<div className="page-item">
							<Labels />
						</div>

						<div className="page-item">
							<h3 className="mt-4">Activity</h3>
							<div className="text-text-muted flex gap-2 pt-1">
								No activity yet
							</div>
						</div>

						{/* <div className="page-item">
							<Discussion />
						</div> */}
					</div>
				</Page>
			}
		</>
	)
}

export default TaskPage
