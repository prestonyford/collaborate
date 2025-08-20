import clsx from "clsx"
import { darken, shouldUseBlackText } from "../../utils/colors"

interface Props {
	title: string,
	color: string
	removable?: boolean
	onRemove?: () => void
	count?: number
}

function Label({ title, color, removable = false, onRemove, count }: Props) {
	const borderColor = darken(0.1, color);
	const hasSide = removable || count !== undefined

	return (
		<>
			<div
				className={clsx(
					'text-sm bg-red-700 w-max pl-1.5 rounded-lg border overflow-hidden',
					shouldUseBlackText(color) ? 'text-gray-800' : 'text-gray-50')}
				style={{
					backgroundColor: color,
					borderColor
				}}
			>
				<div className={clsx("flex", { "pr-1.5": !hasSide })}>
					<div className={clsx("py-[1px]", {"mr-1": hasSide})}>{title}</div>
					{count !== undefined && (
						<div className="py-[1px] px-1.5 font-bold" style={{ backgroundColor: borderColor }}>
							{count}
						</div>
					)}
					{removable && (
						<div className="px-1.5 cursor-pointer flex select-none" style={{ backgroundColor: borderColor }} onClick={() => onRemove?.()}>
							<i className="m-auto fa-solid fa-xmark"></i>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default Label
