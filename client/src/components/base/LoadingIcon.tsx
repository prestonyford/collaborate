import clsx from 'clsx'

interface Props {
	modal?: boolean
	size?: 'small' | 'medium' | 'large'
}

function LoadingIcon({ modal = false, size = 'medium' }: Props) {
	const spinner = <div className={clsx({
		'text-[1.2rem]': size === 'small',
		'': size === 'medium',
		'text-lg': size === 'large',
	})}><i className="fa-solid fa-spinner animate-spin"></i></div>;
	
	if (modal) {
		return (
			<div className='text-5xl fixed inset-0 w-screen h-screen bg-black/35 z-40 flex justify-center items-center'>
				{spinner}
			</div>
		)
	}
	return (
		<div className='w-full h-full flex justify-center items-center text-5xl'>
			{spinner}
		</div>
	)
}

export default LoadingIcon
