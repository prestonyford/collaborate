import { useLayoutEffect, useRef, useState } from "react";
import type ProjectDTO from "../../model/dto/ProjectDTO";
import clsx from "clsx";
import type LabelDTO from "../../model/dto/LabelDTO";
import Label from "../../components/base/Label";

interface Props {
	className?: string
	project: ProjectDTO
	labels: LabelDTO[]
	labelCount: Record<number, number>
}

function ProjectItem(props: Props) {
	const labelsRef = useRef<HTMLDivElement>(null);
	const [hasOverflow, setHasOverflow] = useState(false);

	useLayoutEffect(() => {
		const element = labelsRef.current;
		if (element) {
			setHasOverflow(element.scrollHeight > element.clientHeight);
		}
	}, [props.labels]);

	return (
		<div className={clsx("group bg-surface hover:bg-surface-active transition-colors rounded-xl shadow-md py-2 px-3", props.className)}>
			<div className="flex items-center gap-4">
				<h4>{props.project.name}</h4>
				<div className="text-text-muted text-sm gap-1 inline-flex">
					<i className="fa-solid fa-user m-auto"></i>
					<span className="">{props.project.owner}</span>
				</div>
			</div>
			<div>
				<span className="text-text-muted text-sm gap-1 inline-flex">
					{props.project.numColumns} Columns, {props.project.numTasks} Tasks
				</span>
			</div>
			{props.labels && (
				<div className="relative mt-1">
					<div
						ref={labelsRef}
						className="flex gap-2 flex-wrap max-h-[170px] overflow-hidden"
					>
						{props.labels.map(label => (
							<Label key={label.id} title={label.title} color={label.color} count={props.labelCount[label.id] || 0} />
						))}
					</div>
					{hasOverflow && (
						<div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t transition-colors from-surface group-hover:from-surface-active to-transparent pointer-events-none"></div>
					)}
				</div>
			)}
		</div>
	)
}

export default ProjectItem
