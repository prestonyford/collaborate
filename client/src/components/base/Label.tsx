import clsx from "clsx"
import { darken, shouldUseBlackText } from "../../utils/colors"

interface Props {
	className?: string
	title: string,
	color: string
	removable?: boolean
	onRemove?: () => void
	count?: number
	truncate?: boolean
}

function Label({ className, title, color, removable = false, onRemove, count, truncate = true }: Props) {
	const borderColor = darken(0.1, color);
	const hasSide = removable || count !== undefined

	return (
		<>
			<div
				className={clsx(
					'text-sm bg-red-700 w-max pl-1.5 rounded-lg border overflow-hidden',
					shouldUseBlackText(color) ? 'text-gray-800' : 'text-gray-50', className)}
				style={{
					backgroundColor: color,
					borderColor
				}}
				title={title}
			>
				<div className={clsx("flex", { "pr-1.5": !hasSide })}>
					<div className={clsx("py-[1px]", {"mr-1": hasSide}, {'truncate': truncate})}>{title}</div>
					{count !== undefined && (
						<div className="py-[1px] px-1.5 font-bold" style={{ backgroundColor: borderColor }}>
							{count}
						</div>
					)}
					{removable && (
						<div className={clsx("px-1.5 cursor-pointer flex select-none", {'border-l': count !== undefined})} style={{ backgroundColor: borderColor }} onClick={() => onRemove?.()}>
							<i className="m-auto fa-solid fa-xmark"></i>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default Label
