import clsx from 'clsx'
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { useClickOutside } from '../../hooks/useClickOutside'

export interface Option {
	id: string
}

export interface TextOption extends Option {
	text: string
}
export interface SlotOption extends Option {
	renderOption: (id: string) => React.ReactNode
}

interface Props {
	defaultText?: string,
	options: Array<TextOption | SlotOption>,
	selectedId?: string,
	triggerClass?: string,
	onSelect: (id: string) => void
	onClose?: () => void
}

function Dropdown({ defaultText = 'Select', options, selectedId, triggerClass = '', onSelect, onClose }: Props) {
	const [open, setOpen] = useState(false);
	const [pos, setPos] = useState({ top: 0, left: 0 });
	const triggerRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	const selected = options.find(opt => opt.id === selectedId) || null;
	const handleSelect = (option: Option) => {
		onSelect(option.id)
		setOpen(false)
	}

	function isTextOption(opt: Option): opt is TextOption {
		return 'text' in opt;
	}

	useLayoutEffect(() => {
		if (open && triggerRef.current) {
			const rect = triggerRef.current.getBoundingClientRect();
			setPos({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
		}
	}, [open, triggerRef]);
	
	useClickOutside([triggerRef, menuRef], () => { setOpen(false); onClose?.() } , open);

	return (
		<div ref={triggerRef} className={clsx("relative inline-block text-left text-sm", triggerClass)}>
			<button
				onClick={() => setOpen(!open)}
				className={clsx("inline-flex justify-between items-center w-full overflow-hidden",
					"border border-accent rounded-md transition-colors",
					"shadow-sm hover:bg-base-alt dark:hover:bg-[rgb(40,40,40)] focus:outline-none",
					"focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-700 pr-2",
					{ "pl-4 py-1": !selected || isTextOption(selected) }
				)}
			>
				{selected ?
					isTextOption(selected)
						? selected.text
						: selected.renderOption(selected.id)
					: defaultText
				}
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

			{open && createPortal(
				<div
					ref={menuRef}
					className="absolute z-40 mt-1 text-sm bg-base border border-gray-300 dark:border-gray-400 rounded-md shadow-lg overflow-auto"
					style={{
						top: `${pos.top}px`,
						left: `${pos.left}px`,
						maxHeight: `calc(100vh - ${pos.top}px - 4px)`,
						maxWidth: `calc(100vw - ${pos.left}px)`
					}}
				>
					{options.map(option => (
						<div
							key={option.id}
							onClick={() => handleSelect(option)}
							className={clsx("cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-700", { "px-4 py-1": isTextOption(option) })}
							tabIndex={0}
						>
							{isTextOption(option) ? option.text : option.renderOption(option.id)}
						</div>
					))}
				</div>,
				document.body
			)}
		</div>
	)
}

export default Dropdown
