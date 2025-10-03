# MERN Stack Project (Dockerized)

This is a **MERN stack (MongoDB, Express, React, Node.js) project** configured to run with **Docker** for both development and production environments. The setup allows hot-reloading for frontend (React) and backend (Node/Express) while using a MongoDB database in a container.

---

## Table of Contents

- [Project Structure]
- [Prerequisites]
- [Getting Started (Development)]
- [Available Services](#available-services)
- [Environment Variables](#environment-variables)
- [Docker Volumes](#docker-volumes)
- [Production Build](#production-build)
- [Git Ignore](#git-ignore)

---

## Project Structure

```bash

project-root/
├── client/              # React frontend
├── server/              # Node.js backend (Express)
├── docker-compose.yml   # Docker services
├── .env                 # Environment variables (not committed)
└── README.md

```

---

## Prerequisites

- [Docker](https://www.docker.com/get-started) (v20+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v1.29+)
- Node.js & npm (optional for local development outside Docker)

---

## Getting Started (Development)

1. Clone the repository:

```bash
git clone <your-repo-url>

```
```bash
cd <project-root>

```
---

Ensure your .env file exists in the root and contains:

```bash

MONGB_UR=mongodb://mongo:27017/users

```

Start the development environment (hot reload enabled):
```bash
docker-compose up
```
---
## Visit the apps:

React frontend: http://localhost:3000

Express backend: http://localhost:5000

MongoDB: port 27017 (can connect via Compass or any Mongo client)

---

Code changes reflect automatically:

React frontend reloads automatically in the browser.

Backend restarts automatically via nodemon.


| Service | Port  | Description                                     |
| ------- | ----- | ----------------------------------------------- |
| client  | 3000  | React development server (hot reload)           |
| server  | 5000  | Node.js backend API with hot reload via nodemon |
| mongo   | 27017 | MongoDB database                                |

---

## Environment Variables

MONGB_UR – MongoDB connection URI.

NODE_ENV – Node environment (default: development).

CHOKIDAR_USEPOLLING – required for React file watcher in Docker.

---

**Note: Never commit your .env file to Git.**

Docker Volumes

mongo-data – persists MongoDB data between container restarts.

---

## Production Setup

Build optimized images:

```bash

docker-compose -f docker-compose.yml up --build -d

```

## Git Ignore

Recommended .gitignore:

```bash

# Node
node_modules
npm-debug.log*
yarn-error.log*

# Logs
*.log
logs/

# Build
dist
build
.cache

# Env
.env

# Docker
mongo-data/
docker-data/

# IDE/OS
.DS_Store
.idea/
.vscode/

```

--- 

This structure is clean, professional, and works for **open-source or private repos.**
