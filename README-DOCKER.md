# Running the Project with Docker

This project has been fully containerized so you can easily share it or run it on any machine without installing Node.js or dealing with dependencies.

## Prerequisites
- Docker
- Docker Compose

## Quick Start
To start both the frontend and backend servers together, simply open a terminal in this root folder and run:
`docker-compose up -d --build`

This will:
1. Build the Node.js backend.
2. Build the Vite React frontend using a multi-stage Nginx container.
3. Start both services.

Your backend API will be available at: `http://localhost:5000`
Your frontend website will be available at: `http://localhost:5173`

*(Note: The React App is served via Nginx on port 80 internally, but mapped back to 5173 on your local machine so you can visit the exact same URL you normally do).*

## Important Notes on Environment Variables
- Ensure your `backend/.env` contains your `MONGO_URI`. Docker will inject this into the backend container.
- Ensure your `frontend/.env` has `VITE_API_URL` set appropriately before building the image. If you are sharing this to be run locally by someone else, make sure it is set to `http://localhost:5000/api` so their browser hits the local Docker backend.
- Ensure your Firebase variables in `frontend/.env` are set.
