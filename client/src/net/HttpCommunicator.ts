export default class HttpCommunicator {
	protected async makeRequest<T>(path: string, options?: RequestInit) {
		const response = await fetch('/api' + path, options);
		if (response.ok) {
			return response.json() as Promise<T>;
		} else {
			throw new Error(await response.text());
		}
	}
}