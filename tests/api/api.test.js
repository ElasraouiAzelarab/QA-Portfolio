'use strict';

/**
 * API Tests — JSONPlaceholder (https://jsonplaceholder.typicode.com)
 *
 * These tests demonstrate how to validate a REST API:
 *   - Status codes
 *   - Response schema / data shape
 *   - CRUD operations (GET, POST, PUT, PATCH, DELETE)
 *   - Edge cases (404 for missing resources, etc.)
 */

const axios = require('axios');

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Shared Axios instance with a timeout so tests don't hang in CI
const api = axios.create({ baseURL: BASE_URL, timeout: 10000 });

// ─────────────────────────────────────────────────────────
// Helper
// ─────────────────────────────────────────────────────────
function isISODate(str) {
  return typeof str === 'string' && !isNaN(Date.parse(str));
}

// ─────────────────────────────────────────────────────────
// /posts
// ─────────────────────────────────────────────────────────
describe('GET /posts', () => {
  let response;

  beforeAll(async () => {
    response = await api.get('/posts');
  });

  test('returns HTTP 200', () => {
    expect(response.status).toBe(200);
  });

  test('returns an array of posts', () => {
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
  });

  test('each post has required fields', () => {
    response.data.forEach(post => {
      expect(post).toHaveProperty('id');
      expect(post).toHaveProperty('userId');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('body');
    });
  });

  test('post id and userId are positive integers', () => {
    response.data.forEach(post => {
      expect(Number.isInteger(post.id)).toBe(true);
      expect(post.id).toBeGreaterThan(0);
      expect(Number.isInteger(post.userId)).toBe(true);
      expect(post.userId).toBeGreaterThan(0);
    });
  });
});

// ─────────────────────────────────────────────────────────
// GET /posts/:id — happy path
// ─────────────────────────────────────────────────────────
describe('GET /posts/:id', () => {
  test('returns a single post with correct id', async () => {
    const res = await api.get('/posts/1');
    expect(res.status).toBe(200);
    expect(res.data.id).toBe(1);
    expect(typeof res.data.title).toBe('string');
    expect(res.data.title.length).toBeGreaterThan(0);
  });

  test('returns 404 for a non-existent post', async () => {
    try {
      await api.get('/posts/99999');
      // JSONPlaceholder returns 404 for out-of-range IDs
      throw new Error('Expected 404 but request succeeded');
    } catch (err) {
      expect(err.response?.status ?? err.message).toBe(404);
    }
  });
});

// ─────────────────────────────────────────────────────────
// POST /posts — create a resource
// ─────────────────────────────────────────────────────────
describe('POST /posts', () => {
  const newPost = { userId: 1, title: 'QA Portfolio Test Post', body: 'Automated test via Jest + axios.' };
  let response;

  beforeAll(async () => {
    response = await api.post('/posts', newPost);
  });

  test('returns HTTP 201 Created', () => {
    expect(response.status).toBe(201);
  });

  test('response contains the submitted fields plus a new id', () => {
    expect(response.data.title).toBe(newPost.title);
    expect(response.data.body).toBe(newPost.body);
    expect(response.data.userId).toBe(newPost.userId);
    expect(response.data.id).toBeDefined();
  });
});

// ─────────────────────────────────────────────────────────
// PUT /posts/:id — full update
// ─────────────────────────────────────────────────────────
describe('PUT /posts/:id', () => {
  const updatedPost = { id: 1, userId: 1, title: 'Updated Title', body: 'Updated body content.' };
  let response;

  beforeAll(async () => {
    response = await api.put('/posts/1', updatedPost);
  });

  test('returns HTTP 200', () => {
    expect(response.status).toBe(200);
  });

  test('response reflects the updated data', () => {
    expect(response.data.title).toBe(updatedPost.title);
    expect(response.data.body).toBe(updatedPost.body);
  });
});

// ─────────────────────────────────────────────────────────
// PATCH /posts/:id — partial update
// ─────────────────────────────────────────────────────────
describe('PATCH /posts/:id', () => {
  test('returns HTTP 200 and the patched fields', async () => {
    const res = await api.patch('/posts/1', { title: 'Patched Title' });
    expect(res.status).toBe(200);
    expect(res.data.title).toBe('Patched Title');
  });
});

// ─────────────────────────────────────────────────────────
// DELETE /posts/:id
// ─────────────────────────────────────────────────────────
describe('DELETE /posts/:id', () => {
  test('returns HTTP 200 and an empty object', async () => {
    const res = await api.delete('/posts/1');
    expect(res.status).toBe(200);
    expect(res.data).toEqual({});
  });
});

// ─────────────────────────────────────────────────────────
// /comments — filtering
// ─────────────────────────────────────────────────────────
describe('GET /posts/:id/comments', () => {
  let response;

  beforeAll(async () => {
    response = await api.get('/posts/1/comments');
  });

  test('returns HTTP 200', () => {
    expect(response.status).toBe(200);
  });

  test('returns an array', () => {
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
  });

  test('all comments belong to postId 1', () => {
    response.data.forEach(comment => {
      expect(comment.postId).toBe(1);
    });
  });

  test('each comment has a valid email address', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    response.data.forEach(comment => {
      expect(emailRegex.test(comment.email)).toBe(true);
    });
  });
});

// ─────────────────────────────────────────────────────────
// /users — data integrity
// ─────────────────────────────────────────────────────────
describe('GET /users', () => {
  let users;

  beforeAll(async () => {
    const res = await api.get('/users');
    users = res.data;
  });

  test('returns an array with 10 users', () => {
    expect(Array.isArray(users)).toBe(true);
    expect(users).toHaveLength(10);
  });

  test('each user has a unique id', () => {
    const ids = users.map(u => u.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(users.length);
  });

  test('each user has a valid email format', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    users.forEach(user => {
      expect(emailRegex.test(user.email)).toBe(true);
    });
  });

  test('each user has a nested address with geo coordinates', () => {
    users.forEach(user => {
      expect(user.address).toBeDefined();
      expect(user.address.geo).toBeDefined();
      expect(parseFloat(user.address.geo.lat)).not.toBeNaN();
      expect(parseFloat(user.address.geo.lng)).not.toBeNaN();
    });
  });
});

// ─────────────────────────────────────────────────────────
// /todos — filtering by query param
// ─────────────────────────────────────────────────────────
describe('GET /todos (filtered)', () => {
  test('returns only completed todos when filtered', async () => {
    const res = await api.get('/todos', { params: { completed: true } });
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
    res.data.forEach(todo => {
      expect(todo.completed).toBe(true);
    });
  });

  test('returns only incomplete todos when filtered', async () => {
    const res = await api.get('/todos', { params: { completed: false } });
    expect(res.status).toBe(200);
    res.data.forEach(todo => {
      expect(todo.completed).toBe(false);
    });
  });
});
