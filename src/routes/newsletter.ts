import { Hono } from 'hono';
import { Newsletter } from '../model/newsletter';

export const newsletter = new Hono();

newsletter.get('/', async (c) => {
  const newsletter = await Newsletter.findAllNewsletters();

  return c.json(
    {
      data: newsletter,
    },
    200
  );
});
