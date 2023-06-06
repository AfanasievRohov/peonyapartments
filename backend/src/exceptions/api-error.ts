export default class ApiError extends Error {
  constructor(public statusCode: number, message: string, public errors = []) {
    super(message);
    this.name = this.constructor.name;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }

  static Unauthorized() {
    return new ApiError(401, 'User is not authorized');
  }

  static BadRequest(message: string, errors = []) {
    return new ApiError(400, message, errors)
  }

  static NotFound(resourceName: string = 'Resource') {
    return new ApiError(404, `${resourceName} not found`);
  }
}
