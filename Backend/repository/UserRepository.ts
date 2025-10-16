import { pool } from "../libs/Database.js";
import { users } from "../models/User.js";

export class UserRepository {
  async getAll(): Promise<users[]> {
    const { rows } = await pool.query(`SELECT * FROM "users"`);
    return rows;
  }

  async getByEmail(email: string): Promise<users | null> {
    const { rows } = await pool.query(`SELECT * FROM "users" WHERE email = $1`, [email]);
    return rows[0] || null;
  }

  async create(user: Omit<users, "customer_id">): Promise<users> {
    const { rows } = await pool.query(
      `INSERT INTO "users" (
        last_name, first_name, blood_type, birth_date, email, password,
        country, city, adresse, postal_code, phone_number
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *`,
      [
        user.last_name,
        user.first_name,
        user.blood_type,
        user.birth_date,
        user.email,
        user.password,
        user.country,
        user.city,
        user.adresse,
        user.postal_code,
        user.phone_number,
      ]
    );
    return rows[0];
  }
}
