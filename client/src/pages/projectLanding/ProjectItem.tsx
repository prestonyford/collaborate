import { useEffect, useState } from "react";
import Page from "../Page"
import { useServiceStore } from "../../serviceStore";
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
	return (
		<div className={clsx(" bg-surface hover:bg-surface-active transition-colors rounded-xl shadow-md py-2 px-3", props.className)}>
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
			{props.labels &&
				<div className="mt-1 flex gap-2">
					{props.labels.map(label => <Label key={label.id} title={label.title} color={label.color} count={props.labelCount[label.id] || 0} />)}
				</div>
			}
		</div>
	)
}

export default ProjectItem
