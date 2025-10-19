import { pool } from "../libs/Database";

export interface News {
  news_id: number;
  title: string;
  content: string;
  publication_date: string;
  image_url?: string;
}

export class NewsRepository {
  async getAll(): Promise<News[]> {
    const { rows } = await pool.query(
      "SELECT * FROM news ORDER BY publication_date DESC LIMIT 10"
    );
    return rows;
  }
}