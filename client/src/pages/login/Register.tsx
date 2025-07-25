import { useState } from "react";
import Button from "../../components/base/Button";
import TextInput from "../../components/base/TextInput";
import { useServiceStore } from "../../serviceStore";
import clsx from "clsx";
import LoadingIcon from "../../components/base/LoadingIcon";
import { useNavigate } from "react-router-dom";

interface Props {
}

export default function Register() {
	const authService = useServiceStore(state => state.authService);
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [username, setUsername] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [repeatPassword, setRepeatPassword] = useState<string>("");

	const [usernameValidationMessage, setUsernameValidationMessage] = useState<string | null>(null);
	const [emailValidationMessage, setEmailValidationMessage] = useState<string | null>(null);
	const [passwordValidationMessage, setPasswordValidationMessage] = useState<string | null>(null);
	const [repeatPasswordValidationMessage, setRepeatPasswordValidationMessage] = useState<string | null>(null);

	function handleInputUsername(val: string) {
		setUsernameValidationMessage(null);
		setUsername(val);
	}
	function handleInputEmail(val: string) {
		setEmailValidationMessage(null);
		setEmail(val);
	}
	function handleInputPassword(val: string) {
		setPasswordValidationMessage(null);
		setPassword(val);
	}
	function handleInputRepeatPassword(val: string) {
		setRepeatPasswordValidationMessage(null);
		setRepeatPassword(val);
	}

	function validate() {
		let ret = true;
		if (!username.length) {
			setUsernameValidationMessage("Please enter a valid username");
			ret = false;
		}
		const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
		if (!emailRegex.test(email)) {
			setEmailValidationMessage("Please enter a valid email");
			ret = false;
		}
		if (!password.length) {
			setPasswordValidationMessage("Please enter a valid password");
			ret = false;
		}
		if (!repeatPassword.length || repeatPassword !== password) {
			setRepeatPasswordValidationMessage("Passwords do not match");
			ret = false;
		}
		return ret;
	}

	async function register() {
		if (!validate()) {
			return;
		}
		setIsLoading(true);
		try {
			await authService.register({ username, email, password });
			navigate("/projects");
		} catch (error) {
			console.error(error);
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="w-96 max-w-screen bg-base-alt dark:bg-surface border border-accent rounded-xl p-6">
			<h2>Register</h2>
			<div className="mt-2">
				<label htmlFor="username" className="text-text-muted">Username</label>
				<div className={clsx({ 'opacity-50 pointer-events-none': isLoading })}>
					<TextInput className="w-full" id="username" value={username} invalid={!!usernameValidationMessage} onChange={handleInputUsername} />
				</div>
			</div>
			<div className="mt-2">
				<label htmlFor="email" className="text-text-muted">Email</label>
				<div className={clsx({ 'opacity-50 pointer-events-none': isLoading })}>
					<TextInput className="w-full" id="email" type="email" value={email} invalid={!!emailValidationMessage} onChange={handleInputEmail} />
				</div>
			</div>
			<div className="mt-2">
				<label htmlFor="password" className="text-text-muted">Password</label>
				<div className={clsx({ 'opacity-50 pointer-events-none': isLoading })}>
					<TextInput className="w-full" id="password" type="password" value={password} invalid={!!passwordValidationMessage} onChange={handleInputPassword} />
				</div>
			</div>
			<div className="mt-2">
				<label htmlFor="repeatPassword" className="text-text-muted">Repeat password</label>
				<div className={clsx({ 'opacity-50 pointer-events-none': isLoading })}>
					<TextInput className="w-full" id="repeatPassword" type="password" value={repeatPassword} invalid={!!repeatPasswordValidationMessage} onChange={handleInputRepeatPassword} />
				</div>
			</div>
			<div className="mt-3 mb-1 text-red-400 text-sm">
				{usernameValidationMessage || emailValidationMessage || passwordValidationMessage || repeatPasswordValidationMessage || '\u00A0'}
			</div>
			<div className="flex gap-2 justify-end">
				<div className="flex gap-2">
					{isLoading && <div><LoadingIcon size="small" /></div>}
					<Button content="Create account" variant={"primary"} onClick={register} />
				</div>
			</div>
		</div>
	)
}