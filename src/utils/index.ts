import {
  PostDoesNotExist,
  PostIdValidationError,
  PostInsufficientPermissionsError,
  PostSlugValidationError,
  PostCircularRelationship,
  PostRelationConflict,
  PostDoesNotHaveComments,
} from "@/post/post.errors";
import { HttpException, HttpStatus } from "@nestjs/common";

/**
 * Handles domain-specific errors and maps them to appropriate HTTP exceptions.
 *
 * This function checks if the error belongs to specific domain error classes (e.g., Post errors) and
 * throws an `HttpException` with the correct HTTP status code and error message. If the error doesn't match any
 * known domain error, a generic internal server error is thrown.
 *
 * @param {unknown} error - The error object to handle.
 * @throws {HttpException} - Throws an appropriate `HttpException` based on the error type.
 */
export function handleDomainErrors(error: unknown): never {
  // Post Errors
  if (error instanceof PostDoesNotExist || error instanceof PostDoesNotHaveComments) {
    throw new HttpException(error.message, HttpStatus.NOT_FOUND);
  } else if (error instanceof PostInsufficientPermissionsError) {
    throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
  } else if (error instanceof PostIdValidationError) {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  } else if (error instanceof PostRelationConflict) {
    throw new HttpException(error.message, HttpStatus.CONFLICT);
  } else if (error instanceof PostCircularRelationship || error instanceof PostSlugValidationError) {
    throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  // Default Error
  if (error instanceof Error) {
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  console.error(error);
  throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
}
