# 📝 Headless CMS

This is a toy project for a headless CMS that allows you to create, delete, and partially manage posts for your blog, as well as create relations between posts. The headless CMS is built using NestJS and MongoDB.

## 🚀 Getting Started

To get started with this project, you can choose to either run the project natively on your machine, or with Docker.

### 🏠 Running natively

To run the project natively, you will need to have Node.js v20.9.0 or higher and npm v10.1.0 or higher installed on your machine.

1. 🍴 Clone this repository to your local machine.
2. 💻 Run `npm install` to install the necessary dependencies.
3. 🚀 Start a MongoDB instance on your machine by following the instructions provided by MongoDB for your specific operating system. You can download the MongoDB Community Server from [here](https://www.mongodb.com/try/download/community).
4. 📝 Rename .env.example to .env and replace the values with your own MongoDB connection details and desired api port.
5. 🚀 Run `npm start` to start the server.

### 🐳 Running with Docker

To run the project with Docker, you will need to have Docker installed on your machine.

1. 🍴 Clone this repository to your local machine.
2. 📝 Copy the .env.example file and rename it to .env. Open the .env file and specify the desired values for MONGODB_URI and PORT variables.
   For example:
   ```
   # The MongoDB connection string for the BlogPost database
   MONGODB_URI="mongodb://mongodb/test"
   # The port on which the Blog CMS API will run
   PORT="3000"
   ```
3. 🐳 Run `docker compose build` to build the containers.
4. 🐳 Run `docker compose up` to start the containers.
5. 🌍 The API will be available at `http://localhost:3000/`.

## 📖 Usage

Once the server is running, you can use the following endpoints to manage your blog posts:

- `GET /api/v1/posts`: Returns a list of all posts.
- `POST /api/v1/posts`: Creates a new post.
- `GET /api/v1/posts?page&limit`: Get Posts with pagination based on created date.
- `GET /api/v1/posts?slug=:slug`: Returns a specific post by slug.
- `GET /api/v1/posts/:id`: Returns a specific post by post ID.
- `DELETE /api/v1/posts/:id`: Deletes a post by post ID.
- `GET /api/v1/posts/:id/relations`: Returns relationship posts by post ID
- `POST /api/v1/posts/relation/?sourcePostId&relationPostId`: Sets a relationship between two posts.
- `GET /heath`: Returns useful system information, such as server uptime and memory usage. This endpoint can be used to monitor the health of the application.

**Note:** The current pagination implementation is based on the `page` and `limit` query parameters and orders the results based on created date in ascending order.

## 🚀 Future Improvements

Here are some potential improvements that could be made to this project:

- [ ] Implement authentication to secure the API.
- [ ] Add support for media uploads (images, videos, etc.).
- [ ] Add support for comments in each post: Users and non-users can add comments to posts and engage in discussions.
- [ ] Add support for user: Users can create accounts, log in, and manage their profile.
- [ ] Have multiple users create their own posts: Each user can create their own posts and manage them.
- [ ] Create a frontend interface for post management.
- [ ] Implement a more robust pagination solution that allows for custom sorting and filtering.
- [ ] Add support for different languages and locales.
- [ ] Write jest tests

## ✅ Completed Tasks

Here are the tasks that have already been completed in this project:

- [✅] Further optimize the Docker images to reduce size, making the deployment process faster and more efficient.
- [✅] Rewrite the project in TypeScript for better type safety.
- [✅] Refactor the project using the NestJs framework for better code organization and modularity.

## 🤝 Contributing

Contributions to this project are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## 📝 License

This project is licensed under the Apache License, Version 2.0. See the [LICENSE][LICENSE] file for details.

[LICENSE]: LICENSE
