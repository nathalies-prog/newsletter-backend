import { Hono } from 'hono';
import { Subscriber } from '../model/subscriber';

export const subscriber = new Hono();

subscriber.get('/', async (c) => {
  const subscribers = await Subscriber.findAllSubscribers();

  return c.json(
    {
      data: subscribers,
    },
    200
  );
});

subscriber.get('/:id', async (c) => {
  const {id} = c.req.param();
  const subscribers = await Subscriber.findSubscriberById(id);

  return c.json(
    {
      data: subscribers,
    },
    200
  );
});
subscriber.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const { name, last_name, email, phone } = body; 


    if (!name || !last_name || !email || !phone) {
      return c.json({ error: 'Es wurden nicht alle Felder angegeben' }, 400);
    }
    const createSubscriber = await Subscriber.addSubscriber(name, last_name, email, phone);
    return c.json(
      {
        data: createSubscriber,
      },
      201
    );
  } catch (error) {
    return c.json({ error: 'Error beim Erstellen eines Subscribers' }, 500);
  }

  
});
subscriber.delete('/:id', async (c) => {
  const {id} = c.req.param();
  try{
    const subscriberToDelete = await Subscriber.deleteSubscriber(id);
    if (!subscriberToDelete) {
      return c.json({ error: 'Subscriber wurde nicht gefunden' }, 404);
  }
    return c.json({
      message : `Subscriber ${id} wurde gelöscht`
    },200)
  }
  catch(error){
    console.error(error);
    return c.json({ error: 'Etwas ist beim Löschen schief gelaufen'},400)
  }
});

