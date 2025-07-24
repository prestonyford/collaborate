import { HttpError, NotFoundError, ServerError, UnauthorizedError } from "./Errors";

export default abstract class HttpCommunicator {
	private url: string
	protected constructor(url: string) {
		this.url = url;
	}

	protected async makeRequest<T>(path: string, options?: RequestInit) {
		const response = await fetch(this.url + path, {
			headers: {
				'Content-Type': 'application/json'
			},
			...options
		});
		if (response.ok) {
			return response.json() as Promise<T>;
		} else {
			if (response.status === 404) {
				throw new NotFoundError();
			} else if (response.status === 401) {
				throw new UnauthorizedError();
			} else if (response.status >= 500) {
				throw new ServerError();
			}
			throw new HttpError(await response.text(), response.status);
		}
	}
}