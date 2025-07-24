import HttpCommunicator from "../HttpCommunicator";
import type LoginRequest from "../request/LoginRequest";
import type RegisterRequest from "../request/RegisterRequest";
import type StatusResponse from "../response/StatusResponse";
import type AuthCommunicator from "./AuthCommunicator";

export default class HttpProjectCommunicator extends HttpCommunicator implements AuthCommunicator {
	async login(data: LoginRequest): Promise<void> {
		await this.makeRequest(`/login`, {
			method: "POST",
			body: JSON.stringify(data)
		});
	}
	async register(data: RegisterRequest): Promise<void> {
		await this.makeRequest(`/register`, {
			method: "POST",
			body: JSON.stringify(data)
		});
	}
	async checkStatus(): Promise<StatusResponse> {
		return await this.makeRequest<StatusResponse>(`/status`);
	}
}
