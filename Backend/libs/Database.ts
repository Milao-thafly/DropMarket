import { Pool } from "pg";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

class Database {
  private static poolInstance: Pool;

  static getPool(): Pool {
    if (!Database.poolInstance) {
      const envPathDefault = path.resolve(process.cwd(), ".env");
      const envFile = fs.existsSync(envPathDefault) ? envPathDefault : undefined;

      dotenv.config({ path: envFile });

      console.log(
        "PGPASSWORD type:", 
        typeof process.env.PGPASSWORD, 
        "value:", 
        process.env.PGPASSWORD ? "*****" : process.env.PGPASSWORD
      );

      Database.poolInstance = new Pool({
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        host: process.env.PGHOST,
        port: process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : 5432,
        database: process.env.PGDATABASE,
      });

      console.log(`Pool PostgreSQL initialisé avec ${envFile || ".env introuvable"}`);
    }

    return Database.poolInstance;
  }
}

const pool = Database.getPool();
export { Database, pool };
