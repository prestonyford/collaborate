import clsx from "clsx"
import { darken, shouldUseBlackText } from "../../utils/colors"

interface Props {
	title: string,
	color: string
	removable?: boolean
	onRemove?: () => void
}

function Label({title, color, removable = false, onRemove}: Props) {
	const borderColor = darken(0.1, color);
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
				<div className={clsx("flex", {"pr-1.5": !removable})}>
					<div className="py-[1px] cursor-default">{ title }</div>
					{removable && (
						<div className="ml-1 px-1.5 cursor-pointer flex select-none" style={{ backgroundColor: borderColor }} onClick={() => onRemove?.()}>
							<i className="m-auto fa-solid fa-xmark"></i>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default Label
