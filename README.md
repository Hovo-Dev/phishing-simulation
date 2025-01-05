# Full Stack Application

## Description
This is a full-stack application built using **NestJS** for the backend, **React** for the frontend, and **MongoDB** for the database. The entire application is containerized using Docker and can be run with a single command.

## Tech Stack
- **Backend**: NestJS for phishing simulation and attempts management.
- **Frontend**: React for user interaction and management.
- **Database**: MongoDB for storing user info and phishing attempts.
- **Containerization**: Docker for containerization.

## Project Structure
```bash
app/
├── backend/           # Backend (NestJS)
├── frontend/          # Frontend (React)
├── docker-compose.yml # Docker Compose configuration
└── db_data/           # MongoDB data (volume)
```
## How to Run

 Clone the repository and navigate to the project folder:
   ```bash
git clone <repository_url>
cd phishing
```

Copy the .env.example files and rename them to .env for both frontend and backend:

•	For backend:
```bash
cd phishing-backend
cp .env .env
```

•	For frontend:
```bash
cd phishing-frontend
cp .env .env
```

Run the application using Docker Compose:
```bash
docker compose up -d
   ```

### The application will be accessible on the following ports:
Backend: <http://localhost:3001>

Frontend: <http://localhost:3000>

MongoDB: localhost:27017

### Stopping the Application

To stop and remove all running containers, use the following command:
```bash
docker-compose down
   ```

### Notes

•	MongoDB data is persisted in the db_data/ directory.

•	Ensure that .env files are set up in both the backend/ and frontend/ directories before running the app.

### Troubleshooting

•	Docker Issues: If you encounter any Docker issues, ensure Docker and Docker Compose are installed correctly.

•	Port Conflicts: Make sure that the ports 3000, 3001, and 27017 are not being used by other services on your system.