export class PostError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class PostRelationConflict extends PostError {}
export class PostDoesntExist extends PostError {}
export class PostCircularRelationship extends PostError {}
export class PostSlugValidationError extends PostError {}
export class PostIdValidationError extends PostError {}
