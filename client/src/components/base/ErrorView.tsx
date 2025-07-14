type Props = ({
	allowRetry?: false
} | {
	allowRetry: true,
	onRetry: () => void
}) & {
	message?: string
}

export default function ErrorView(props: Props) {
	return (
		<div className="flex justify-center items-center p-8">
			<div className="flex flex-col items-center h-full">
				<h4 className="self-start">Oops! An error occured{props.message ? ':' : '.'}</h4>
				{props.message && <p className="whitespace-pre-wrap text-text-muted">{props.message}</p>}
				{props.allowRetry && <a className="clicky" onClick={props.onRetry}>Retry</a>}
			</div>
		</div>
	)
}
