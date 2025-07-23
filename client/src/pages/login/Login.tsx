import { useState } from "react";
import Button from "../../components/base/Button";
import TextInput from "../../components/base/TextInput";

interface Props {
}

export default function Login() {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	
	return (
		<div className="w-96 max-w-screen bg-base-alt border border-accent rounded-xl p-6">
			<h2>Login</h2>
			<div className="mt-2">
				<label htmlFor="username" className="text-text-muted">Username</label>
				<div>
					<TextInput className="w-full" id="username" value={username} onChange={setUsername} />
				</div>
			</div>
			<div className="mt-2">
				<label htmlFor="password" className="text-text-muted">Password</label>
				<div>
					<TextInput className="w-full" id="password" type="password" value={password} onChange={setPassword} />
				</div>
			</div>
			<div className="mt-8 flex justify-end gap-2">
				<Button content="Login" variant={"primary"} />
			</div>
		</div>
	)
}