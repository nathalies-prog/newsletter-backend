import { getPool } from '../db/db';

export class Newsletter {
  static async findAllNewsletters() {
    const result = await getPool().query('SELECT * FROM newsletter LIMIT 100');
    return result.rows;
  }
}