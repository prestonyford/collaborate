import type LoginRequest from "../request/LoginRequest"
import type RegisterRequest from "../request/RegisterRequest"
import type StatusResponse from "../response/StatusResponse"

export default interface AuthCommunicator {
	login(data: LoginRequest): Promise<void>
	register(data: RegisterRequest): Promise<void>
	checkStatus(): Promise<StatusResponse>
}
