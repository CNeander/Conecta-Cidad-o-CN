# Conecta Cidadão — backend real

Aplicativo do gabinete para registrar e acompanhar demandas da população, com:

- **Banco de dados real** (PostgreSQL)
- **Login do administrador** (JWT)
- **Servidor** (Node.js + Express)
- **IA real** (OpenAI, via `OPENAI_API_KEY`)
- **Mapa real** (Leaflet + OpenStreetMap, sem precisar de chave)

## Estrutura

```
package.json
server.js
.env.example
db/
  schema.sql      -> tabelas criadas automaticamente ao iniciar
  pool.js
middleware/
  auth.js         -> valida o token JWT do admin
routes/
  auth.js         -> login do admin
  demandas.js
  agenda.js
  noticias.js
  voluntarios.js
  ia.js
  config.js       -> nome do app e cores
public/
  index.html
  style.css
  app.js          -> frontend, consome a API acima
```

## Rodando localmente

1. Instale as dependências:
   ```
   npm install
   ```
2. Copie `.env.example` para `.env` e preencha `DATABASE_URL` (um Postgres local
   ou um banco gratuito de teste), `ADMIN_PASSWORD` e `JWT_SECRET`.
3. Rode:
   ```
   npm start
   ```
4. Abra `http://localhost:3000`.

## Publicando no Render (passo a passo)

### 1. Suba o projeto para o GitHub
Crie um repositório (ex.: `conecta-cidadao`) e envie todos os arquivos.
Na raiz do repositório devem aparecer: `package.json`, `server.js`, `.env.example`,
`db/`, `middleware/`, `routes/`, `public/`.
**Não envie o arquivo `.env`** (só o `.env.example`).

### 2. Crie o banco PostgreSQL no Render
No painel do Render: **New → PostgreSQL**. Dê um nome (ex.: `conecta-cidadao-db`) e
crie. O Render gera a `DATABASE_URL` automaticamente.

### 3. Crie o Web Service
**New → Web Service** → conecte o repositório `conecta-cidadao`.

| Campo | Valor |
|---|---|
| Name | conecta-cidadao |
| Language | Node |
| Branch | main |
| Build Command | `npm install` |
| Start Command | `npm start` |

### 4. Configure as variáveis de ambiente
Em **Environment → Add Environment Variable**, adicione:

- `DATABASE_URL` → copie da tela do banco PostgreSQL que você criou (ou linke o
  banco ao serviço, se o Render oferecer essa opção — ele preenche sozinho)
- `ADMIN_EMAIL` → ex. `admin@conecta.local`
- `ADMIN_PASSWORD` → uma senha forte, só sua
- `JWT_SECRET` → uma string aleatória grande
- `OPENAI_API_KEY` → sua chave da OpenAI (para a IA responder de verdade)

### 5. Deploy
Salve e o Render faz o build e o deploy. Quando terminar, seu app estará em
algo como `https://conecta-cidadao.onrender.com`.

O servidor cria as tabelas do banco sozinho na primeira vez que sobe
(usa `CREATE TABLE IF NOT EXISTS`, então é seguro reiniciar quantas vezes precisar).

### 6. Testando
- Acesse o site publicado.
- Registre uma demanda de teste na aba "Demandas".
- Vá em "Painel", entre com o `ADMIN_EMAIL` e `ADMIN_PASSWORD` que você configurou.
- Avance o status da demanda de teste e veja atualizar em tempo real.
- Na aba "Mapa", registre uma nova demanda usando "Usar minha localização" para
  ver o ponto real aparecer.
- Na aba "IA", faça uma pergunta (só funciona com `OPENAI_API_KEY` configurada).

## Observações importantes

- Sem `OPENAI_API_KEY`, a aba IA mostra um erro explicando que falta configurar —
  o resto do app funciona normalmente.
- O login é de um único administrador (o gabinete). Não há cadastro de múltiplos
  usuários nesta versão.
- Os campos de identidade visual (`nome_app`, `cor_primaria`, `cor_dourada`) já
  existem no banco e na API (`GET/PUT /api/config`), prontos para uma futura tela
  de personalização no painel.
