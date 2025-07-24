import { useState } from "react";
import Button from "../../components/base/Button";
import TextInput from "../../components/base/TextInput";
import { useServiceStore } from "../../serviceStore";
import clsx from "clsx";
import LoadingIcon from "../../components/base/LoadingIcon";

interface Props {
}

export default function Login() {
	const authService = useServiceStore(state => state.authService);
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function handleLogin() {
		setIsLoading(true);
		try {
			await authService.login({ username, password });
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="w-96 max-w-screen bg-base-alt border border-accent rounded-xl p-6">
			<h2>Login</h2>
			<div className="mt-2">
				<label htmlFor="username" className="text-text-muted">Username</label>
				<div className={clsx({ 'opacity-50 pointer-events-none': isLoading })}>
					<TextInput className="w-full" id="username" value={username} onChange={setUsername} />
				</div>
			</div>
			<div className="mt-2">
				<label htmlFor="password" className="text-text-muted">Password</label>
				<div className={clsx({ 'opacity-50 pointer-events-none': isLoading })}>
					<TextInput className="w-full" id="password" type="password" value={password} onChange={setPassword} />
				</div>
			</div>
			<div className="mt-8 flex justify-end gap-2">
				<div className="flex gap-2">
					{isLoading && <LoadingIcon size="small" />}
					<Button content="Login" variant="primary" disabled={isLoading} onClick={handleLogin} />
				</div>
			</div>
		</div>
	)
}