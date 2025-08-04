import type UserDTO from "../../model/dto/UserDTO";
import type UserCommunicator from "./UserCommunicator";

export default class FakeUserCommunicator implements UserCommunicator {
	private static instance: FakeUserCommunicator | null = null;

	private constructor() { }

	static getInstance(): FakeUserCommunicator {
		if (this.instance === null) {
			this.instance = new FakeUserCommunicator();
		}
		return this.instance;
	}

	async checkUsername(username: string): Promise<UserDTO> {
		await new Promise(resolve => setTimeout(resolve, 2000));
		return {
			username,
			email: "user@email.com"
		};
	}
}