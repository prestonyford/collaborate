import { useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useClickOutside } from "../../hooks/useClickOutside";
import "./profileIcon.css"
import { useServiceStore } from "../../serviceStore";
import { useNavigate } from "react-router-dom";


export default function ProfileIcon() {
	const authService = useServiceStore(state => state.authService);
	const navigate = useNavigate();
	const iconRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const [pos, setPos] = useState({ top: 0, right: 0 });
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useLayoutEffect(() => {
		if (iconRef.current) {
			const rect = iconRef.current.getBoundingClientRect();
			setPos({
				top: rect.bottom + window.scrollY,
				right: window.innerWidth - rect.right - window.scrollX
			});
		}
	}, []);

	useClickOutside([iconRef, menuRef], () => setIsOpen(false), isOpen);

	async function handleLogout() {
		try {
			await authService.logout();
		} finally {
			window.location.href = "/login";
		}
	}

	return <>
		<div ref={iconRef} onClick={() => setIsOpen(!isOpen)} className='m-auto self-stretch flex text-xl h-[36px] w-[36px] bg-attention hover:bg-attention-hover transition-colors rounded-3xl'>
			<i className="fa-solid fa-user m-auto"></i>
		</div>

		{isOpen &&
			createPortal(
				<div
					ref={menuRef}
					className="profile-menu fixed border border-accent bg-surface rounded-md w-[14rem] select-none"
					style={{
						top: `${pos.top + 4}px`,
						right: `${pos.right}px`
					}}
				>
					<h4 className="p-3 pb-1">Username</h4>
					<div className="text-text-muted cursor-pointer">
						<div className="border-t border-accent hover:bg-surface-active transition-colors py-1.5 px-3">
							View profile
						</div>
						<div onClick={handleLogout} className="border-t border-accent hover:bg-surface-active transition-colors py-1.5 px-3">
							<i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
						</div>
					</div>
				</div>,
				document.body
			)
		}
	</>
}
