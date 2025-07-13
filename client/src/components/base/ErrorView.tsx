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
		<div className="flex justify-center items-center select-none">
			<div className="flex flex-col items-center">
				<p>Oops! An error occured{props.message ? ':' : '.'}</p>
				{props.message && <p>{props.message}</p>}
				{props.allowRetry && <a className="clicky" onClick={props.onRetry}>Retry</a>}
			</div>
		</div>
	)
}
