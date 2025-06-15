import { useState } from 'react'
import Button from '../components/base/Button'
import Dropdown from '../components/base/Dropdown'

interface Props {
	
}

function MainPage(props: Props) {
	const [labelFilter, setLabelFilter] = useState<string | null>(null);
	
	return (
		<>
			<div className="grow py-4 px-6">
				<div className="flex justify-between items-center">
					<h1 className="basis-0 grow">Project Name Here</h1>
					<div className='flex gap-3'>
						<Button text="Add column" variant="primary" />
						<Dropdown
							defaultText='Select a label'
							selectedId={labelFilter ?? undefined}
							options={[
								{ id: '0', text: 'All labels' },
								{ id: '1', text: 'One' },
								{ id: '2', text: 'Two' },
								{ id: '3', text: 'Three' },
							]}
							triggerClass='min-w-[140px]'
							onSelect={id => setLabelFilter(id)}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default MainPage
