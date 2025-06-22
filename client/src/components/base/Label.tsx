import clsx from "clsx"
import { shouldUseBlackText } from "../../utils/contrast"

interface Props {
	title: string,
	color: string
}

function Label(props: Props) {
	return (
		<>
			<div
				className={clsx('text-sm bg-red-700 w-max px-1.5 rounded-lg', shouldUseBlackText(props.color) ? 'text-gray-800' : 'text-gray-50')}
				style={{
					backgroundColor: props.color,
					boxShadow: `0 0 1px 0.5px ${props.color}`
				}}
			>
				{ props.title }
			</div>
		</>
	)
}

export default Label
