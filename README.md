# OS Contrib Tracker

OS Contrib Tracker is a small MERN dashboard for following open-source activity from GitHub. Sign in with GitHub, review repositories, pull requests, commits, and keep a manual list of contributions you want to track.

## Tech Stack

- MongoDB with Mongoose
- Express and Node.js API
- React frontend built with Vite
- GitHub OAuth through Passport
- JWT-backed API requests
- React Router DOM for the auth and dashboard pages

## Features

- GitHub sign-in
- Repository overview with stars and direct GitHub links
- Pull request history authored by the connected user
- Repository-specific commit explorer
- GitHub-style contribution graph built from recent commits
- Current contribution streak metric
- Full CRUD for manually tracked contributions
- Dashboard actions for analyzing activity and tracking contributions

## Setup

Install dependencies for both apps:

```bash
npm run install:all
```

Create the backend environment file:

```bash
cp backend/.env.example backend/.env
```

Create a GitHub OAuth app and set the callback URL to:

```text
http://localhost:5050/api/auth/github/callback
```

Required environment variables are listed in [backend/.env.example](backend/.env.example).

## Useful Commands

```bash
npm run dev
npm run backend
npm run frontend
npm test
```

The React frontend runs on `http://localhost:3000` and proxies API requests to the Express API on `http://localhost:5050`.

You can also run the backend only:

```bash
cd backend
npm test
npm start
```

## API Routes

- `GET /health` checks that the API is running.
- `GET /api/auth/github` starts GitHub OAuth login.
- `GET /api/auth/me` returns the logged-in user.
- `GET /api/auth/logout` logs out the current user.
- `GET /api/contributions` reads tracked contributions.
- `POST /api/contributions` creates a tracked contribution.
- `PUT /api/contributions/:id` updates a tracked contribution.
- `DELETE /api/contributions/:id` deletes a tracked contribution.
- `GET /api/github/repos` returns the user's repositories.
- `GET /api/github/commits/:owner/:repo` returns user commits for a repository.
- `GET /api/github/contributions` returns daily commit counts for the contribution graph.
- `GET /api/github/prs` returns pull requests authored by the user.
- `GET /api/github/stats` returns summary contribution stats.
