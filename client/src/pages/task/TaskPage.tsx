import { useNavigate, useParams } from "react-router-dom"
import Label from "../../components/base/Label"
import Page from "../Page"
import { useEffect, useMemo, useState } from "react";
import LoadingIcon from "../../components/base/LoadingIcon";
import { useTaskStore } from "./taskStore";
import NotFound from "../NotFound";
import Button from "../../components/base/Button";
import MyCKEditor from "../../components/ckeditor/MyCKEditor";

interface Props {

}

function TaskPage(props: Props) {
	const params = useParams();
	const navigate = useNavigate();

	const initialize = useTaskStore(state => state.initialize);
	const reset = useTaskStore(state => state.reset);
	const isLoading = useTaskStore(state => state.isLoading);
	const task = useTaskStore(state => state.task);
	const projectLabels = useTaskStore(state => state.projectLabels);

	const projectLabelsMap = useMemo(
		() => Object.fromEntries(projectLabels.map(label => [label.id, label])),
		[projectLabels]
	);

	const projectID = params.pid;
	const taskID = params.tid;
	if (projectID === undefined || taskID === undefined) {
		return <NotFound />;
	}

	const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

	useEffect(() => {
		initialize(projectID, taskID);
		return reset;
	}, [initialize]);

	return (
		<>
			{isLoading || task === null
				? <LoadingIcon />
				: <Page title={<div className="w-full -mb-2 flex justify-between items-center">
					<h1 className="">Card Name Here</h1>
					<Button content={<>Edit <i className="ml-1.5 text-sm fa-solid fa-pen-to-square"></i></>} variant={"secondary"} />
				</div>}>
					<div className="px-6">
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

						<h3 className="mt-4 mb-1">Description</h3>
						<p className="text-text-muted hidden">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean congue consectetur facilisis. Integer egestas ut risus ut ultricies. Quisque feugiat ullamcorper mi eu semper. Proin vel sapien efficitur, semper lacus ac, tempor tellus. Sed ornare velit vitae nisi tristique euismod. Nulla fringilla laoreet mi, eu semper mi posuere ac. Pellentesque eu rhoncus orci, ac rhoncus sapien. Aliquam pulvinar mauris eu leo aliquam, eu dictum leo molestie. Donec volutpat elementum pulvinar. Donec cursus, lacus at facilisis tincidunt, lorem lectus placerat augue, in pretium lectus elit et purus.
						</p>
						<div>
							<MyCKEditor />
						</div>

						<h3 className="mt-4">Labels</h3>
						<div className="flex gap-2 pt-1">
							{task.labels.map(lid => (
								<Label key={lid} title={projectLabelsMap[lid].title} color={projectLabelsMap[lid].color} removable />
							))}
						</div>

						<h3 className="mt-4">Activity</h3>
						<div className="text-text-muted flex gap-2 pt-1">
							Names of participants here
						</div>

						<h3 className="mt-4">Discussion</h3>
						<div className="text-text-muted flex flex-col pt-1">
							Discussion here
						</div>
					</div>
				</Page>
			}
		</>
	)
}

export default TaskPage
