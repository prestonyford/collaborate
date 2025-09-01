import { useNavigate } from "react-router-dom"

function Unauthorized() {
	const navigate = useNavigate();
	
	return (
		<>
			<div className="h-full flex justify-center items-center select-none">
				<div className="m-auto flex flex-col items-center">
					<i className="text-2xl mb-2 fa-solid fa-ban"></i>
					<p>403: You do not have access to this resource.</p>
					<a className="clicky" onClick={() => navigate('/')}>Take me home</a>
				</div>
			</div>
		</>
	)
}

export default Unauthorized
