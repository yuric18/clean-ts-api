import request from 'supertest';
import { noCache } from '@/index';
import app from '@/main/config/app';

describe('No Cache Middleware', () => {
  test('Should disable Cache', async () => {
    app.get('/test_no_cache', noCache, (req, res) => {
      res.send();
    });
    await request(app)
      .get('/test_no_cache')
      .expect(
        'cache-control',
        'no-store, no-cache, must-revalidate, proxy-revalidate'
      )
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store');
  });
});
