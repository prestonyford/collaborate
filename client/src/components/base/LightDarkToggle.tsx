import clsx from 'clsx';
import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react';

function LightDarkToggle() {
	const initial = localStorage.getItem("isDark");
	const [dark, setDark] = useState(initial === "true");
	
	function handleToggleDark(event: MouseEvent<HTMLDivElement>) {
		event.stopPropagation();
		setDark(!dark);
	}

	useEffect(() => {
		if (dark) {
			document.documentElement.classList.add('dark');
			localStorage.setItem("isDark", "true");
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem("isDark", "false");
		}
	}, [dark]);

	return (
		<>
			<div
				onClick={handleToggleDark}
				className={clsx(
					'h-[26px] w-[50px] rounded-3xl p-[2px] flex items-center justify-between',
					'cursor-pointer relative bg-[#111]')}
			>
				<div
					className={clsx(
						'absolute bg-white h-[22px] w-[22px] rounded-2xl transition-all duration-300',
						dark ? 'left-[2px]' : 'left-[calc(50%+1px)]'
					)}
				></div>

				<div className='h-[22px] w-[22px] text-[16px] flex items-center justify-center'>
					<i className="fa-solid fa-sun text-amber-500"></i>
				</div>
				<div className='h-[22px] w-[22px] text-[16px] flex items-center justify-center'>
					<i className="fa-solid fa-moon text-amber-300"></i>
				</div>
			</div>
		</>
	)
}

export default LightDarkToggle
