import { CreateCommentDto } from "./create-comment.dto";

export const CreatePostDtoStub = (): CreateCommentDto => ({
  author: "John Doe",
  content: "Great Post!",
});
