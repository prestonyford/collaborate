import type AuthCommunicator from "../net/AuthCommunicator/AuthCommunicator";
import { HttpError, UnauthorizedError } from "../net/Errors";
import type LoginRequest from "../net/request/LoginRequest";
import type RegisterRequest from "../net/request/RegisterRequest";

export default class AuthService {
	private readonly communicator: AuthCommunicator

	public constructor(communicator: AuthCommunicator) {
		this.communicator = communicator;
	}

	public async login(data: LoginRequest): Promise<void> {
		return this.communicator.login(data);
	}

	public async register(data: RegisterRequest): Promise<void> {
		try {
			const response = await this.communicator.register(data);
			return response;
		} catch (error) {
			if (error instanceof HttpError && error.status === 409) {
				throw new HttpError("A user with this username already exists. Please choose another.", 409);
			}
			if (error instanceof HttpError && error.status === 400) {
				throw new HttpError("Please enter a username, password, and email.", 409);
			}
			throw new Error("An error occured while creating your account. Please try again later.");
		}
	}

	public async logout(): Promise<void> {
		this.communicator.logout();
	}

	public async checkStatus(): Promise<boolean> {
		try {
			const response = await this.communicator.checkStatus();
			return response.status;
		} catch (error) {
			if (error instanceof UnauthorizedError) {
				return false;
			}
		}
		return false;
	}
}
