# Hotel Inventory Management REST API

## Project Overview

The Hotel Inventory Management REST API is a backend application developed using Node.js and Express.js to manage hotel room information. It provides RESTful endpoints to create, retrieve, update, delete, and filter hotel room records. The application uses in-memory storage to manage room data without requiring an external database.

## Objectives

* Develop RESTful APIs for hotel room management.
* Implement CRUD operations using HTTP methods.
* Validate incoming room data to maintain data consistency.
* Prevent duplicate room numbers within the same location.
* Retrieve room details using unique room IDs.
* Filter rooms based on location and availability.
* Handle invalid requests and missing room records using appropriate HTTP status codes.

## Technologies Used

* **Node.js:** JavaScript runtime environment for backend development.
* **Express.js:** Framework for building RESTful APIs.
* **JavaScript:** Programming language used to implement application logic.
* **JSON:** Format used for API requests and responses.
* **Postman:** Tool for testing API endpoints.
* **Git and GitHub:** Version control and project hosting.

## Features

* Create new hotel room records.
* Retrieve all available room records.
* Retrieve individual room details using room IDs.
* Update existing room information.
* Delete room records.
* Filter rooms by location.
* Filter rooms by availability status.
* Automatically generate unique room IDs.
* Validate required fields and data types.
* Prevent duplicate room numbers at the same location.
* Return appropriate error messages and HTTP status codes.

## Room Data Model

Each room contains the following fields:

| Field           | Data Type | Description                               |
| --------------- | --------- | ----------------------------------------- |
| `id`            | Number    | Automatically generated unique identifier |
| `name`          | String    | Name of the hotel                         |
| `location`      | String    | Hotel location                            |
| `type`          | String    | Room category, such as Deluxe or Suite    |
| `pricepernight` | Number    | Price charged per night                   |
| `capacity`      | Integer   | Maximum number of occupants               |
| `available`     | Boolean   | Indicates whether the room is available   |
| `roomnumber`    | String    | Room number within the location           |

## API Endpoints

| HTTP Method | Endpoint     | Description             |
| ----------- | ------------ | ----------------------- |
| POST        | `/rooms`     | Create a new room       |
| GET         | `/rooms`     | Retrieve all rooms      |
| GET         | `/rooms/:id` | Retrieve a room by ID   |
| PUT         | `/rooms/:id` | Update an existing room |
| DELETE      | `/rooms/:id` | Delete a room           |

### Filtering Support

The API supports filtering room records using query parameters.

* **Filter by location:** `/rooms?location=Chennai`
* **Filter by availability:** `/rooms?available=true`
* **Filter by both:** `/rooms?location=Chennai&available=true`

## Validation and Error Handling

The API validates incoming data before creating or updating room records.

* Hotel name, location, room type, and room number must be non-empty strings.
* Price per night must be a finite number greater than or equal to zero.
* Capacity must be a positive integer.
* The availability field must be a Boolean during room updates.
* Duplicate room numbers at the same location are rejected.
* Invalid room IDs return a `400 Bad Request` response.
* Requests for nonexistent rooms return a `404 Not Found` response.
* Successful room creation returns `201 Created`.
* Successful retrieval, update, and deletion return `200 OK`.

## Data Storage

The application stores room information in an in-memory JavaScript array. Room IDs are generated automatically using an incremental counter.

No external database or file-based storage is used. All room records are cleared when the server restarts. This design is suitable for demonstrating backend API functionality and CRUD operations in an assessment environment.

## Application Architecture

The application follows a simple REST API architecture:

* **Client:** Sends HTTP requests through Postman or another API client.
* **Express Server:** Receives requests and routes them to the appropriate endpoint.
* **Validation Layer:** Checks request fields, data types, and duplicate room numbers.
* **Business Logic:** Performs room creation, retrieval, updating, deletion, and filtering.
* **In-Memory Storage:** Maintains room records during server execution.
* **JSON Response:** Returns the requested data or an appropriate error message to the client.

## HTTP Status Codes

| Status Code       | Description                    |
| ----------------- | ------------------------------ |
| `200 OK`          | Request completed successfully |
| `201 Created`     | Room created successfully      |
| `400 Bad Request` | Invalid input or room ID       |
| `404 Not Found`   | Requested room does not exist  |

## Testing

The API can be tested using Postman by sending HTTP requests to the corresponding endpoints. Testing includes room creation, retrieval, updating, deletion, filtering, input validation, duplicate detection, and handling nonexistent room IDs.

## Limitations

* Data is not persistent and is lost when the server restarts.
* Authentication and authorization are not implemented.
* No frontend user interface is included.
* Hotel reservations, customer management, and payment processing are outside the current scope.
* The application is designed as a basic backend REST API demonstration.

## Future Enhancements

* Integrate MySQL or MongoDB for persistent storage.
* Add authentication and role-based authorization.
* Implement hotel reservations and booking management.
* Add pagination, sorting, and advanced search.
* Develop automated API tests.
* Integrate Swagger for API documentation.
* Deploy the application to a cloud platform.

## Learning Outcomes

This project demonstrates practical knowledge of RESTful API development, Node.js, Express.js, HTTP methods, CRUD operations, JSON handling, input validation, error handling, query parameters, route parameters, in-memory data management, and API testing.

## Author

**Your Name**

## License

This project is intended for educational purposes and backend development practice.
