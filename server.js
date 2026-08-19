require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { initSchema } = require("./db/pool");

const authRoutes = require("./routes/auth");
const demandasRoutes = require("./routes/demandas");
const agendaRoutes = require("./routes/agenda");
const noticiasRoutes = require("./routes/noticias");
const voluntariosRoutes = require("./routes/voluntarios");
const iaRoutes = require("./routes/ia");
const configRoutes = require("./routes/config");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/demandas", demandasRoutes);
app.use("/api/agenda", agendaRoutes);
app.use("/api/noticias", noticiasRoutes);
app.use("/api/voluntarios", voluntariosRoutes);
app.use("/api/ia", iaRoutes);
app.use("/api/config", configRoutes);

app.get("/api/health", (req, res) => res.json({ ok: true }));

// Frontend estático (public/) — mesmo servidor entrega API e site
app.use(express.static(path.join(__dirname, "public")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;

initSchema()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[server] Conecta Cidadão rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("[server] Falha ao iniciar (banco de dados):", err);
    process.exit(1);
  });
