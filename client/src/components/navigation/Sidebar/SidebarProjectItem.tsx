import clsx from 'clsx'
import { useState } from 'react'

interface Props {
	projectName: string
	numColumns: number,
	numTasks: number,
	active?: boolean,
	onClick?: () => void,
	owner?: string
}

function SidebarProjectItem(props: Props) {
	return (
		<>
			<div
				className='py-[1px] border-accent cursor-pointer border-b'
				title={props.projectName}
				onClick={props.onClick}
			>
				<div className={clsx('py-0.5 px-3 flex justify-between', props.active ? 'bg-surface-active font-semibold' : 'hover:bg-base-alt')}>
					<div className='w-[0] grow'>
						<div className='truncate'>{props.projectName}</div>
						<div className='text-sm text-text-muted'>{props.numColumns} Columns, {props.numTasks} Tasks</div>
					</div>

					{ props.owner && <>
						<div className='self-stretch flex items-center text-xl ml-1'>
							<i className="fa-solid fa-user"></i>
						</div>
					</>}
				</div>
			</div>
		</>
	)
}

export default SidebarProjectItem
