// api.test.ts
import request from 'supertest';
import app from '..';
import { UserModel as User } from '../Models/user.model';


describe('API Tests', () => {
    // clear test database after each test
    afterEach(async () => {
        await User.deleteMany({});
    });
  it('should return a success message for POST /api', async () => {
    const response = await request(app).post('/api/auth/register').send({ name: 'testuser', password: 'testpassword', email: 'testemail@test.com' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User created');
  });

  it('should return an error for POST /api/auth/login with invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', password: 'incorrectpassword' });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Invalid credentials' });
  });

  // Add more test cases as needed
});