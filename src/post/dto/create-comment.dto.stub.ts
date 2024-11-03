import { CreateCommentDto } from "./create-comment.dto";

/**
 * Creates a stub for the CreateCommentDto object.
 * This is used for testing purposes to provide a mock comment data structure.
 *
 * @returns {CreateCommentDto} A mock object representing a new comment.
 */
export const CreateCommentDtoStub = (): CreateCommentDto => ({
  author: "John Doe",
  content: "Great Post!",
});
