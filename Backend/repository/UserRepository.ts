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

async update(user: Partial<users> & { customer_id: number }): Promise<users> {
let postal_code: number | null = null;
if (user.postal_code !== undefined && user.postal_code !== null && user.postal_code !== "") {
  const num = Number(user.postal_code);
  postal_code = !isNaN(num) && num > 0 ? num : null;
}
  const { rows } = await pool.query(
    `UPDATE "users"
     SET last_name = $1,
         first_name = $2,
         blood_type = $3,
         birth_date = $4,
         email = $5,
         password = $6,
         country = $7,
         city = $8,
         adresse = $9,
         postal_code = $10,
         phone_number = $11
     WHERE customer_id = $12
     RETURNING *`,
    [
      user.last_name || null,
      user.first_name || null,
      user.blood_type || null,
      user.birth_date || null,
      user.email || null,
      user.password || null,
      user.country || null,
      user.city || null,
      user.adresse || null,
      postal_code,
      user.phone_number || null,
      user.customer_id,
    ]
  );

  return rows[0];
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
        user.postal_code !== undefined ? user.postal_code : null,
        user.phone_number,
      ]
    );

    return rows[0];
  }
}
