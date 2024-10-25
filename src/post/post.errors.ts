/**
 * Custom error class for post-related errors.
 * @class
 */
export class PostError extends Error {
  /**
   * Creates an instance of PostError.
   * @param {string} message - The error message.
   */
  constructor(message: string) {
    super(message);
  }
}

/**
 * Error class for post relation conflicts.
 * @class
 * @extends PostError
 */
export class PostRelationConflict extends PostError {}

/**
 * Error class for post not existing.
 * @class
 * @extends PostError
 */
export class PostDoesNotExist extends PostError {}

/**
 * Error class for circular post relationships.
 * @class
 * @extends PostError
 */
export class PostCircularRelationship extends PostError {}

/**
 * Error class for post slug validation errors.
 * @class
 * @extends PostError
 */
export class PostSlugValidationError extends PostError {}

/**
 * Error class for post ID validation errors.
 * @class
 * @extends PostError
 */
export class PostIdValidationError extends PostError {}

/**
 * Error class for posts without comments.
 * @class
 * @extends PostError
 */
export class PostDoesNotHaveComments extends PostError {}

/**
 * Error class for post insufficient permissions.
 * @class
 * @extends PostError
 */
export class PostInsufficientPermissionsError extends PostError {}

/**
 * Error class for post insufficient permissions.
 * @class
 * @extends PostError
 */
export class CommentInsufficientPermissionsError extends PostError {}

/**
 * Error class for comments not existing.
 * @class
 * @extends PostError
 */
export class CommentDoesNotExist extends PostError {}
