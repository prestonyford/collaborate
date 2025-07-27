import type LoginRequest from "../request/LoginRequest"
import type RegisterRequest from "../request/RegisterRequest"
import type StatusResponse from "../response/StatusResponse"

export default interface AuthCommunicator {
	login(data: LoginRequest): Promise<StatusResponse>
	register(data: RegisterRequest): Promise<StatusResponse>
	logout(): Promise<void>
	checkStatus(): Promise<StatusResponse>
}
