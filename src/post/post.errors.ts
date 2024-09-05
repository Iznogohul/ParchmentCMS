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
export class PostDoesntExist extends PostError {}

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
export class PostDoesntHaveComments extends PostError {}

/**
 * Error class for comments not existing.
 * @class
 * @extends PostError
 */
export class CommentDoesntExist extends PostError {}
