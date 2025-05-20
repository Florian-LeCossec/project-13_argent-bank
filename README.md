# Argent Bank

Argent Bank is a modern banking application that allows users to manage their accounts and transactions.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v12 for the backend and node >= 20 for the frontend) - [Node.js v12](https://nodejs.org/en/)
- npm
- pnpm - for frontend only
- MongoDb - [MongoDB Community Server](https://www.mongodb.com/try/download/community)
## Project Structure

The project is divided into two main parts:
- `Front-argent-bank`: React frontend application
- `Back-argent-bank`: Node.js backend API

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
```bash
cd Back-argent-bank
```

2. Install dependencies:
```bash
npm install
```

3. Launch MongoDB locally with a specified data path.
For example:
```bash
mongod --dbpath /Users/{user}/data/db
```

4. Start the backend server:
```bash
npm run dev:server
```

5. Populate your Database:
```bash
npm run populate-db
```

Once you run the `populate-db` script, you should have two users in your database:

### Tony Stark

- First Name: `Tony`
- Last Name: `Stark`
- Email: `tony@stark.com`
- Password: `password123`

### Steve Rogers

- First Name: `Steve`,
- Last Name: `Rogers`,
- Email: `steve@rogers.com`,
- Password: `password456`


The backend server will start on http://localhost:3001

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd Front-argent-bank
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the frontend development server:
```bash
pnpm run dev
```

The frontend application will start on http://localhost:5173


## API Documentation

The API documentation is available at http://localhost:3001/api-docs when the backend server is running.
