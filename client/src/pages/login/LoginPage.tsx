import { useState } from "react";
import TextInput from "../../components/base/TextInput";
import Button from "../../components/base/Button";
import Login from "./Login";
import Register from "./Register";


export default function LoginPage() {
	const [isRegister, setIsRegister] = useState<boolean>(false);

	return (
		<div className="grow flex">
			<div className="m-auto">
				{ isRegister
				? <Register />
				: <Login /> }
				<button className="mt-2 inline-block w-full text-center clicky" onClick={() => setIsRegister(!isRegister)}>
					{isRegister ? 'Login instead' : 'Register instead'}
				</button>
			</div>
		</div>
	)
}
