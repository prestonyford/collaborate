export default class HttpCommunicator {
	protected async makeRequest(path: string, options?: RequestInit) {
		const response = await fetch('/api' + path, options);
		if (response.ok) {
			return response.json();
		} else {
			throw new Error(await response.text());
		}
	}
}