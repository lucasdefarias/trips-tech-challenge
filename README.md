## Description

This is a tech challenge using Nest.js alongside TypeORM.

## Project Setup

### Prerequisites

- Node (>= 18.8)
- Docker

### Installation

To install dependencies, run:
```bash
npm install
```

Add `API_KEY` and `DATABASE_URL` to the `.env` file.

## Compile and Run the Project

Before running, ensure the database is up. You can use these commands:
```bash
# Start the database
npm run dev:db:start

# Stop the database
npm run dev:db:stop
```

Ensure the migrations are up to date:
```bash
npm run migration:run
```

To start the project, use:
```bash
# Development mode
npm run start

# Watch mode
npm run start:dev
```

## Run Tests

To run unit tests, use:
```bash
npm run test
```

## API Documentation

After running `npm run start:dev`, you can access the API documentation in your browser at: `http://localhost:3000/docs`

## Features Missing

- [ ] Pagination
- [ ] Better error handling