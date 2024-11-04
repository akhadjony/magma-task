# Microservices with Node.js, TypeScript, Kafka, and MongoDB

This project contains two microservices built with Node.js and TypeScript:

1. **User Service**: Manages user CRUD operations and publishes user-related events via Kafka.
2. **Notification Service**: Listens to Kafka events and logs notifications when users are created or deleted.

The project uses Docker Compose for container orchestration, with Kafka as the message broker and MongoDB as the database for the User Service.

## Table of Contents

- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [API Endpoints](#api-endpoints)
    - [User Service](#user-service)
    - [Health Check](#health-check)

## Architecture

The application uses a microservices architecture where each service is independent and communicates via Kafka:

- **User Service**: Handles CRUD operations for users, stores user data in MongoDB, and publishes events (user created, user deleted) to Kafka.
- **Notification Service**: Consumes events from Kafka and logs notifications to the console based on user events.

## Technologies Used

- **Node.js**: Server environment.
- **TypeScript**: Static typing for JavaScript.
- **Express**: Web framework for handling HTTP requests.
- **Kafka (KafkaJS)**: Message broker for inter-service communication.
- **MongoDB**: Database for storing user data.
- **Docker & Docker Compose**: Containerization and orchestration.
- **ESLint & Prettier**: Code quality and formatting tools.

## Getting Started

### Prerequisites

- **Docker** and **Docker Compose** installed on your machine.
- **Node.js** and **npm** if running the services outside of Docker.

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/microservices-app.git
   cd microservices-app

2. Set up the environment variables as described below.
3. Start the services using Docker Compose:
    
    ```bash
    docker-compose up --build

## Environment Variables

Each service requires specific environment variables to function. Here’s a breakdown:

### User Service (user-service/.env)

    MONGO_URI=mongodb://mongo:27017/userdb
    KAFKA_BROKER=kafka:9092
    PORT=4000

### User Service (notification-service/.env)

    KAFKA_BROKER=kafka:9092
    PORT=4001

## API Endpoints

### User Service

The User Service provides several API endpoints for managing users.

#### Create User

- **URL**: `/users`
- **Method**: `POST`
- **Description**: Creates a new user.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```
- **Response**: Returns the created user object.

#### Get Users (with Pagination)

- **URL**: `/users`
- **Method**: `GET`
- **Description**: Retrieves a paginated list of users.
- **Query Parameters**:
    - `skip`: Number of users to skip.
    - `limit`: Maximum number of users to return.
- **Response**: Returns a list of users.

#### Delete User

- **URL**: `/users/:id`
- **Method**: `DELETE`
- **Description**: Deletes a user by ID.
- **Response**: Returns a 204 status on success.

#### Health Check

- **URL**: `/health`
- **Method**: `GET`
- **Description**: Health check endpoint to verify if the service is running.
- **Response**: `{ "status": "UP" }`

