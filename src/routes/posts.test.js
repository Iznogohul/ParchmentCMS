require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const { app, server } = require('../app');

jest.setTimeout(10000);
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test';
const Post = require('../post.model');

beforeEach(async () => {
  await mongoose.connect(MONGODB_URI);
});

afterEach(async () => {
  await mongoose.connection.close();
  server.close();
});

describe('GET /', () => {
  it('should display welcoming message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});

describe('GET /:id', () => {
  it('should throw an error', async () => {
    const res = await request(app).get('/api/v1/posts/123');
    expect(res.statusCode).toBe(204);
  });
});

describe('GET /:id/relations', () => {
  it('should throw an error', async () => {
    const res = await request(app).get('/api/v1/posts/123/relations/');
    expect(res.statusCode).toBe(204);
  });
});

describe('GET /api/products', () => {
  it('should return all products', async () => {
    const res = await request(app).get('/api/v1/posts');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('GET /api/v1/posts/?page&limit', () => {
  it('should return posts based on pagination', async () => {
    const res = await request(app).get('/api/v1/posts/?page=0&limit=0');
    expect(res.statusCode).toBe(200);
  });
});

describe('POST /api/v1/posts/', () => {
  it('should create a new product', async () => {
    const post = {
      name: 'How to configure Swagger 101',
      content: 'How to configure Swagger 101',
      imagePath:
        'https://static1.smartbear.co/swagger/media/assets/images/swagger_logo.svg',
    };
    const res = await request(app)
      .post('/api/v1/posts')
      .send(post)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(200);
  });
  it('should throw an error', async () => {
    const res = await request(app)
      .post('/api/v1/posts')
      .send({})
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(409);
  });
});

describe('POST "/api/v1/posts/?slug" ', () => {
  it('should return post with that slug', async () => {
    const res = await request(app).get(
      '/api/v1/posts/?slug=how-to-configure-swagger-101',
    );
    expect(res.statusCode).toBe(200);
  });
  it('should return that no post exists with that slug', async () => {
    const res = await request(app).get(
      '/api/v1/posts/?slug=howtoconfigureswagger111',
    );
    expect(res.statusCode).toBe(204);
  });
});

describe('DELETE "/api/v1/posts/:id" ', () => {
  it('should return that no post exists with that id', async () => {
    const res = await request(app).delete('/api/v1/posts/idThatDoesntExist');
    expect(res.statusCode).toBe(204);
  });
  it('should return that no id was provided', async () => {
    const res = await request(app).delete('/api/v1/posts/');
    expect(res.statusCode).toBe(404);
  });
  it('should delete post with that id', async () => {
    const post = new Post({
      name: 'test',
      content: 'test',
      imagePath: 'test',
    });
    const blogPost = await post.save();
    blogPost.id = blogPost._id.toString().substring(0, 10).toUpperCase();
    const res = await request(app).delete(`/api/v1/posts/${blogPost.id}`);
    expect(res.statusCode).toBe(200);
  });
});

describe('POST "/api/v1/posts/relation?sourcePostId&relationPostId" ', () => {
  it('should throw error if relationPostId is empty', async () => {
    const res = await request(app).post(
      '/api/v1/posts/relation/?sourcePostId=1&relationPostId=',
    );
    expect(res.statusCode).toBe(400);
  });
  it('should throw error if sourcePostId is empty', async () => {
    const res = await request(app).post(
      '/api/v1/posts/relation/?sourcePostId=&relationPostId=1',
    );
    expect(res.statusCode).toBe(400);
  });
  it('should throw error if both query parmas not specified', async () => {
    const res = await request(app).post(
      '/api/v1/posts/relation/?sourcePostId=&relationPostId=',
    );
    expect(res.statusCode).toBe(400);
  });
  it('should return false if both ids are the same', async () => {
    const res = await request(app).post(
      '/api/v1/posts/relation/?sourcePostId=1&relationPostId=1',
    );
    expect(res.statusCode).toBe(400);
  });
});
