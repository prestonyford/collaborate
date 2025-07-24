import type AuthCommunicator from "../net/AuthCommunicator/AuthCommunicator";
import { UnauthorizedError } from "../net/Errors";
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
		return this.communicator.register(data);
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
