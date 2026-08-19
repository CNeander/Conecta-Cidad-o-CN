const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

// O Render injeta DATABASE_URL automaticamente quando você linka um banco
// PostgreSQL ao Web Service. Em desenvolvimento local, coloque a mesma
// variável no seu .env (veja .env.example).
if (!process.env.DATABASE_URL) {
  console.warn(
    "[aviso] DATABASE_URL não definida. Configure no .env (local) ou nas variáveis de ambiente do Render."
  );
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Render exige SSL para o Postgres gerenciado; localmente geralmente não precisa.
  ssl:
    process.env.DATABASE_URL && process.env.DATABASE_URL.includes("render.com")
      ? { rejectUnauthorized: false }
      : process.env.PGSSL === "true"
      ? { rejectUnauthorized: false }
      : false
});

async function initSchema() {
  const schemaPath = path.join(__dirname, "schema.sql");
  const sql = fs.readFileSync(schemaPath, "utf8");
  await pool.query(sql);
  console.log("[db] schema verificado/criado com sucesso");
}

module.exports = { pool, initSchema };
