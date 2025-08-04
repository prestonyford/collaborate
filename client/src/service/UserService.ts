import type UserDTO from "../model/dto/UserDTO";
import { HttpError } from "../net/Errors";
import type UserCommunicator from "../net/UserCommunicator/UserCommunicator";

export default class UserService {
	private readonly communicator: UserCommunicator

	public constructor(communicator: UserCommunicator) {
		this.communicator = communicator;
	}

	public async checkUsername(username: string): Promise<UserDTO | undefined> {
		try {
			const response = await this.communicator.checkUsername(username);
			return response;
		} catch (error) {
			if (error instanceof HttpError && error.status === 404) {
				return undefined;
			}
			throw error;
		}
	}
}
