-- Schema do Conecta Cidadão
-- Executado automaticamente pelo server.js na inicialização (CREATE TABLE IF NOT EXISTS)

CREATE TABLE IF NOT EXISTS demandas (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  categoria TEXT NOT NULL,
  descricao TEXT NOT NULL,
  local TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  status TEXT NOT NULL DEFAULT 'Aberta',
  progresso INTEGER NOT NULL DEFAULT 10,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS agenda (
  id SERIAL PRIMARY KEY,
  data DATE NOT NULL,
  hora TIME NOT NULL,
  titulo TEXT NOT NULL,
  local TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS noticias (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  texto TEXT NOT NULL,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS voluntarios (
  id SERIAL PRIMARY KEY,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS config (
  id INTEGER PRIMARY KEY DEFAULT 1,
  nome_app TEXT NOT NULL DEFAULT 'Conecta Cidadão',
  cor_primaria TEXT NOT NULL DEFAULT '#123b63',
  cor_dourada TEXT NOT NULL DEFAULT '#e5b83f',
  CONSTRAINT config_singleton CHECK (id = 1)
);

INSERT INTO config (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
