import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ton_nom_de_bdd",
  password: "ton_mot_de_passe",
  port: 5432,
});

pool.connect()
  .then(() => console.log("✅ Connecté à PostgreSQL"))
  .catch((err) => console.error("❌ Erreur de connexion PostgreSQL", err));
