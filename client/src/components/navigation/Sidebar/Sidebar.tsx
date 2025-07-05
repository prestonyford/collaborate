import clsx from 'clsx'
import { useState } from 'react'
import SidebarProjectItem from './SidebarProjectItem'

interface Props {
	className?: string
}

function Sidebar({ className = '' }: Props) {
	return (
		<>
			<div className={clsx('h-full border-r border-accent bg-surface', className)}>
				<h4 className='px-1 mt-2'>Owned</h4>
				<div className="flex flex-col">
					<SidebarProjectItem projectName={'Project 1'} numColumns={4} numTasks={8} active />
					<SidebarProjectItem projectName={'Project 2'} numColumns={0} numTasks={0} />
					<SidebarProjectItem projectName={'Project 3'} numColumns={4} numTasks={7} last />
				</div>
				<h4 className='px-1 mt-3'>Shared with me</h4>
				<div className="flex flex-col">
					<SidebarProjectItem projectName={'Project 1'} numColumns={4} numTasks={8} />
					<SidebarProjectItem projectName={'LONG NAME LONG NAME LONG NAME'} numColumns={0} numTasks={0} owner="User2" />
					<SidebarProjectItem projectName={'Project 3'} numColumns={4} numTasks={7} last />
				</div>
			</div>
		</>
	)
}

export default Sidebar
