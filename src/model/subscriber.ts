import { QueryConfig } from "pg";
import { getPool } from "../db/db";

export class Subscriber {
  static async findAllSubscribers() {
    const query: QueryConfig = {
      text: `SELECT * FROM  subscriber`,
    };
    const result = await getPool().query(query);
    return result.rows;
  }

  static async findSubscriberById(id: string) {
    const query: QueryConfig = {
      text: `SELECT * FROM subscriber WHERE id = $1 `,
      values: [id],
    };
    const result = await getPool().query(query);
    return result.rows;
  }

  static async addSubscriber(
    name: string,
    lastName: string,
    email: string,
    phone: string
  ) {
    const query: QueryConfig = {
      text: `INSERT INTO subscriber (name, last_name, email, phone) 
       VALUES ($1, $2, $3, $4)`,
      values: [name, lastName, email, phone],
    };
    const result = await getPool().query(query);
    return result.rows[0];
  }
  static async deleteSubscriber(id : string){
    const deleteSubscriberNewsletterQuery = {
      text: `DELETE FROM subscriber_newsletter WHERE subscriber = $1`,
      values: [id],
    };
    await getPool().query(deleteSubscriberNewsletterQuery);
    
    const deleteSubscriberQuery = {
      text: `DELETE FROM subscriber WHERE id = $1`,
      values: [id],
    };
    const result = await getPool().query(deleteSubscriberQuery);
    return true;
}
};
