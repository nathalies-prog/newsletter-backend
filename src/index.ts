import { Hono } from 'hono';
import { subscriber } from './routes/subscriber';
// load env and deps for node environment
import { serve } from '@hono/node-server';
import * as dotenv from 'dotenv';
import { newsletter } from './routes/newsletter';
dotenv.config();
const PORT = 8080;
const app = new Hono();

// connect routes
app.route('/subscriber', subscriber);
app.route('/newsletter',newsletter);
app.get('/', (c) => {
  return c.text(`Hello Hono! SERVER IS RUNNING ON  ${PORT}`);
});

// to run with node
if(!process.versions.bun){
  console.log(`SERVER IS RUNNING ON  ${PORT}`);
  serve({
    fetch: app.fetch,
    port: 8080,
  });
}


export default {
  fetch: app.fetch,
  port: 8080,
};
