import { FormattedError } from "./types.ts";

export class HttpError extends Error {
  status = 500;

  constructor(message: string, status?: number) {
    super(message);
    this.message = message;
    this.status = status || 500;
  }
}

export class ValidationError extends Error {
  status = 500;
  errors: FormattedError[] = [];

  constructor(message: string, errors: FormattedError[], status?: number) {
    super(message);
    this.message = message;
    this.errors = errors;
    this.status = status || 400;
  }
}
