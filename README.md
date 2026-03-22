#Event Management API

This is a CRUD API for managing events, built with Node.js, Express, and MongoDB. It provides endpoints for creating, retrieving, updating, and deleting events.

## Features
- Create, read, update, and delete events
- Public endpoints for health checks and API documentation
- CORS configuration for public and authenticated endpoints
- Helmet configuration for enhanced security
- Comprehensive API documentation with Swagger
- Joi validation for request data

## Project Overview
The Event Management API is designed to allow users to manage events through a set of RESTful endpoints. It solves the problem of event organization and management by providing a centralized API for creating and managing events.
The project was created to demonstrate the implementation of a secure and well-documented API using modern web development practices.

## Installation Instructions
### Prerequisites
- Node.js (version 14 or higher)
- NPM (Node Package Manager)
- Typescript (installed)
- FireStore database with admin SDK credentials
- .env file storing your FireStore credentials and allowed origins for CORS
    -- `FIRESTORE_PROJECT_ID`
    -- `FIRESTORE_CLIENT_EMAIL`
    -- `FIRESTORE_PRIVATE_KEY`
    -- `ALLOWED_ORIGINS` (comma-separated list of allowed origins for authenticated endpoints)

        {
        NODE_ENV=development
            PORT=3000
            FIREBASE_PROJECT_ID=bed-demo-g3a74
            FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSOME_KEY\n-----END PRIVATE KEY-----\n"
            FIREBASE_CLIENT_EMAIL=firebase-adminsdk-k9r4p@cloud-project-b7c31.iam.gserviceaccount.com
            SWAGGER_SERVER_URL=http://localhost:3000/api/v1
            ALLOWED_ORIGINS=http://localhost:3000,http://example.com
        }

## Setup Instructions
1. Clone the repository
    -- git clone https://github.com/Amerrick4-RRC/Comp3018-A5
2. Install dependencies
    -- npm install
3. place .env file in the root directory with the required environment variables
4. Start the server
    -- npm start

## API Request Examples
### Get all events
postman request 'localhost:3000/api/v1/events' \
  --header 'Content-Type: application/json' \
  --body '{
    "name": "Test",
    "date": "2027-12-29t09:00:00.000z",
    "capacity": 200
}'
### Create a new event
postman request POST 'localhost:3000/api/v1/events' \
  --header 'Content-Type: application/json' \
  --body '{
    "name": "Test",
    "date": "2027-12-29t09:00:00.000z",
    "capacity": 200
}'
### Update an event
postman request PUT 'localhost:3000/api/v1/events/<event_id>' \
  --header 'Content-Type: application/json' \
  --body '{
    "name": "TestEvent",
    "capacity": 300,
    "registrationCount": 200
    
}'
### Delete an event
postman request DELETE 'localhost:3000/api/v1/events/<event_id>' \
  --header 'Content-Type: application/json' \
  --body '{
    "name": "TestEvent",
    "capacity": 300,
    "registrationCount": 200
    
}'

### Category and Status values
    - Category values: 'conference', 'workshop', 'seminar', 'meetup', 'general' as a default.
    - Status values: 'canceled', 'completed', 'active' as a default.

### Validation
Fields are validated using Joi. Category and Stats fields must be one of the predefined values. Date must be a valid ISO date string. Capacity and registrationCount must be non-negative integers.
    -- Category values: 'conference', 'workshop', 'seminar', 'meetup', 'general' as a default.
    -- Stats values: 'canceled', 'completed', 'active' as a default.

## Documentation
GitHub link to public API documentation: https://amerrick4-rrc.github.io/Comp3018-A5/
Swagger UI is available at: http://localhost:3000/api-docs
## Author
- Andrew Merrick
