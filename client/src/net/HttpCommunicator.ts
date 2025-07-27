import { HttpError, NotFoundError, ServerError, UnauthorizedError } from "./Errors";

export default abstract class HttpCommunicator {
	private url: string
	protected constructor(url: string) {
		this.url = url;
	}

	protected async makeRequest<T>(path: string, options?: RequestInit, ignoreUnauthorized: boolean = false) {
		const response = await fetch(this.url + path, {
			headers: {
				'Content-Type': 'application/json'
			},
			...options
		});
		if (response.ok) {
			if (response.headers.get('content-type')?.includes('application/json')) {
				return await response.json() as T;
			}
			return undefined as T;
		} else {
			if (response.status === 404) {
				throw new NotFoundError();
			} else if (response.status === 401) {
				if (ignoreUnauthorized) {
					throw new UnauthorizedError();
				} else {
					window.location.href = "/login";
				}
			} else if (response.status >= 500) {
				throw new ServerError();
			}
			throw new HttpError(await response.text(), response.status);
		}
	}
}