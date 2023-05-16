import { CreatePostDto } from "./create-post.dto";

export const CreatePostDtoStub = (): CreatePostDto => ({
  title: "My new blog post",
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  imagePath: "/images/my-new-post.jpg",
});
