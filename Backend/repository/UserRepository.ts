import { pool } from "../libs/Database.js";
import { User } from "../models/User.js";

export class UserRepository {
  async getAll(): Promise<User[]> {
    const { rows } = await pool.query("SELECT * FROM \"user_\"");
    return rows;
  }

  async getByEmail(email: string): Promise<User | null> {
    const { rows } = await pool.query("SELECT * FROM \"user_\" WHERE email = $1", [email]);
    return rows[0] || null;
  }

  async create(user: Omit<User, "id">): Promise<User> {
    const { rows } = await pool.query(
      `INSERT INTO "user_" (
        identifiant, email, mot_de_passe, date_de_naissance, 
        type_sanguin, pays, ville, adresse, code_postal, numero_de_telephone
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *`,
      [
        user.identifiant,
        user.email,
        user.mot_de_passe,
        user.date_de_naissance,
        user.type_sanguin,
        user.pays,
        user.ville,
        user.adresse,
        user.code_postal,
        user.numero_de_telephone,
      ]
    );

    return rows[0];
  }
}
