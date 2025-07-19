export class HttpError extends Error {
	public status: number

	constructor(message: string, status: number) {
		super(message);
		this.status = status;
	}
}

export class NotFoundError extends HttpError {
	constructor(message = 'Resource not found') {
		super(message, 404);
	}
}

export class UnauthorizedError extends HttpError {
	constructor(message = 'Unauthorized') {
		super(message, 401);
	}
}
