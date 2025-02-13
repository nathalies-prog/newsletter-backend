import { Hono } from 'hono';
import { subscriber } from './routes/subscriber';
// load env and deps for node environment
import { serve } from '@hono/node-server';
import * as dotenv from 'dotenv';
import { newsletter } from './routes/newsletter';
dotenv.config();

const app = new Hono();

// connect routes
app.route('/subscriber', subscriber);
app.route('/newsletter',newsletter);
app.get('/', (c) => {
  return c.text('Hello Hono!');
});

// to run with node
/*serve({
  fetch: app.fetch,
  port: 8080,
});
*/
export default {
  fetch: app.fetch,
  port: 8080,
};
