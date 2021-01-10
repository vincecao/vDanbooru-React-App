import app from './server';
import supertest from 'supertest';

const request = supertest(app);

require('dotenv').config();

jest.mock('./services/booruService', () => ({
  getImageAdvanced: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('server test', () => {
  it('invalid type test', async (done) => {
    const response = await request.get('/api/mode/null/tag/myTag/num/10');
    const { body, status, error } = response;
    expect(status).toBe(500);
    done();
  });
});
