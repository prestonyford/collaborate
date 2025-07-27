import HttpCommunicator from "../HttpCommunicator";
import type LoginRequest from "../request/LoginRequest";
import type RegisterRequest from "../request/RegisterRequest";
import type StatusResponse from "../response/StatusResponse";
import type AuthCommunicator from "./AuthCommunicator";

export default class HttpProjectCommunicator extends HttpCommunicator implements AuthCommunicator {
	public constructor() {
		super("/auth");
	}
	
	async login(data: LoginRequest): Promise<StatusResponse> {
		return await this.makeRequest<StatusResponse>(`/login`, {
			method: "POST",
			body: JSON.stringify(data)
		}, true);
	}
	async register(data: RegisterRequest): Promise<StatusResponse> {
		return await this.makeRequest<StatusResponse>(`/register`, {
			method: "POST",
			body: JSON.stringify(data)
		});
	}
	
	async logout(): Promise<void> {
		await this.makeRequest(`/logout`, {
			method: "POST"
		});
	}

	async checkStatus(): Promise<StatusResponse> {
		return await this.makeRequest<StatusResponse>(`/status`, undefined, true);
	}
}
