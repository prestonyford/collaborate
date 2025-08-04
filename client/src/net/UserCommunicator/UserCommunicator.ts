import type UserDTO from "../../model/dto/UserDTO"

export default interface UserCommunicator {
	checkUsername(username: string): Promise<UserDTO>
}
