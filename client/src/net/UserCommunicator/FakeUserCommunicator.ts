import type UserDTO from "../../model/dto/UserDTO";
import type UserCommunicator from "./UserCommunicator";

export default class FakeUserCommunicator implements UserCommunicator {
	async checkUsername(username: string): Promise<UserDTO> {
		return {
			username,
			email: "user@email.com"
		}
	}
	
}
