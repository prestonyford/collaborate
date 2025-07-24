import type LoginRequest from "../request/LoginRequest";
import type RegisterRequest from "../request/RegisterRequest";
import type StatusResponse from "../response/StatusResponse";
import type AuthCommunicator from "./AuthCommunicator";

export default class HttpProjectCommunicator implements AuthCommunicator {
	async login(data: LoginRequest): Promise<void> {
		return;
	}
	async register(data: RegisterRequest): Promise<void> {
		return;
	}
	async checkStatus(): Promise<StatusResponse> {
		return {
			status: false
		};
	}
}
