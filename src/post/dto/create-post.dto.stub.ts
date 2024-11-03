import { CreatePostDto } from "./create-post.dto";

/**
 * Creates a stub for the CreatePostDto object.
 * This is used for testing purposes to provide a mock post data structure.
 *
 * @returns {CreatePostDto} A mock object representing a new blog post.
 */
export const CreatePostDtoStub = (): CreatePostDto => ({
  title: "My new blog post",
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  imagePath: "/images/my-new-post.jpg",
});
