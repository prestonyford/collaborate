import { useNavigate } from "react-router-dom"

interface Props {

}

function MainPage(props: Props) {
	const navigate = useNavigate();
	
	return (
		<>
			<div className="flex justify-center items-center select-none">
				<div className="flex flex-col items-center">
					<i className="text-2xl mb-2 fa-solid fa-ban"></i>
					<p>404: Page not found.</p>
					<a className="clicky" onClick={() => navigate('/')}>Take me home</a>
				</div>
			</div>
		</>
	)
}

export default MainPage
