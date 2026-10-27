# SoloChief

The repository is organized into two application folders:

- `client/` — Next.js frontend, assets, docs, and client tooling.
- `server/` — Express API, database scripts, and server configuration.

## Run locally

Install dependencies in each folder once:

```bash
cd client && npm install
cd ../server && npm install
```

Start the frontend and API together from `client/`:

```bash
npm run dev
```

The frontend runs at http://localhost:3000 and the API runs on port 5000. The server stores its local MongoDB data under `server/.data/mongodb`. Configure server secrets in `server/.env` and client settings in `client/.env.local`.

To start either part separately, run `npm run dev` from `client/` or `server/`.
