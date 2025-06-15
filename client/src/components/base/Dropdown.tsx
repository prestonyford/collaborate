import clsx from 'clsx'
import { useState, useEffect } from 'react'

interface Option {
	text: string,
	id: string
}

interface Props {
	defaultText?: string,
	options: Array<Option>,
	selectedId?: string,
	triggerClass?: string,
	onSelect: (id: string) => void
}

function Dropdown({ defaultText = 'Select', options, selectedId, triggerClass = '', onSelect }: Props) {
	const [open, setOpen] = useState(false)

	const selected = options.find(opt => opt.id === selectedId) || null;
	const handleSelect = (option: Option) => {
		onSelect(option.id)
		setOpen(false)
	}

	return (
		<div className={clsx("relative inline-block text-left", triggerClass)}>
			<button
				onClick={() => setOpen(!open)}
				className={clsx("inline-flex justify-between items-center w-full px-4 py-1",
					"bg-base border border-gray-300 dark:border-gray-400 rounded-md", 
					"shadow-sm hover:bg-gray-50 dark:hover:bg-[rgb(40,40,40)] focus:outline-none",
					"focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-700")}
			>
				{selected?.text || defaultText}
				<svg
					className={clsx('ml-2 h-4 w-4 transform transition-transform duration-200', {
						'rotate-180': open,
					})}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
						clipRule="evenodd"
					/>
				</svg>
			</button>

			{open && (
				<ul
					className="absolute z-10 mt-1 w-full bg-base border border-gray-300 dark:border-gray-400 rounded-md shadow-lg max-h-60 overflow-auto"
				>
					{options.map((option) => (
						<li
							key={option.id}
							onClick={() => handleSelect(option)}
							className="cursor-pointer px-4 py-1 hover:bg-indigo-100 dark:hover:bg-indigo-700"
						>
							{option.text}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default Dropdown
