export class HttpError extends Error {
  status = 500;

  constructor(message: string, status?: number) {
    super(message);
    this.message = message;
    this.status = status || 500;
  }
}
