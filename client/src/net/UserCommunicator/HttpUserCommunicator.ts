import type UserDTO from "../../model/dto/UserDTO";
import HttpCommunicator from "../HttpCommunicator";
import type UserCommunicator from "./UserCommunicator";

export default class HttpUserCommunicator extends HttpCommunicator implements UserCommunicator {
	private static instance: HttpUserCommunicator | null = null;

	private constructor() {
		super("/api/users");
	}

	static getInstance(): HttpUserCommunicator {
		if (this.instance === null) {
			this.instance = new HttpUserCommunicator();
		}
		return this.instance;
	}

	async checkUsername(username: string): Promise<UserDTO> {
		return this.makeRequest<UserDTO>(`/${username}`);
	}
}