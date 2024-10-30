# Attendance Check-In Server

This is the server-side API for the Attendance Check-In system. The server is built with Go and follows Clean Architecture principles, enabling students to check in to classes by scanning QR codes in classrooms. The API provides endpoints for retrieving ongoing class information and confirming attendance.

## Features

- REST API for retrieving ongoing class details and confirming student attendance
- Clean Architecture to ensure separation of concerns and ease of maintenance
- SQLite in-memory database for fast local testing and development

## Project structure

```
├── cmd/
│   └── main.go                    # Entrypoint for the application
├── domain/                        # Core business logic and entities
│   ├── classroom.go               # Classroom entity
│   ├── class.go                   # Class entity
│   ├── student.go                 # Student entity
│   └── attendance.go              # Attendance entity and repository interfaces
├── usecase/                       # Application use cases
│   ├── attendance_usecase.go      # Attendance business logic
│   └── class_usecase.go           # Class retrieval logic
├── interface/                     # Interface adapters layer
│   └── http/
│       ├── class_handler.go       # HTTP handler for class operations
│       └── attendance_handler.go  # HTTP handler for attendance operations
└── infrastructure/                # External services and frameworks
    ├── db/
    │   └── db.go                  # SQLite database connection
    ├── router/
    │   └── router.go              # HTTP router setup
    └── repository/
        ├── attendance_repo.go     # Attendance repository implementation
        └── class_repo.go          # Class repository implementation

```

### Folders

- cmd/

  Contains main.go, the entry point for the server application.
- domain/

  Defines core entities and interfaces for business logic.
- usecase/

  Implements use cases like retrieving ongoing classes and confirming attendance.
- interface/

  Provides HTTP handlers for API endpoints.
- infrastructure/

  Configures the database, router, and repository implementations.


## Setup

1. Clone the repository

   ```
   git clone <repository-url>
   cd <repository-folder>

   ```
2. Install dependencies
   
   ```
   go mod tidy
   ```
3. Run the server

   ```
   go run cmd/main.go
   ```

## Usage

Once the server is running, you can test the API endpoints using tools like curl or Postman. The server listens on http://localhost:8080 by default.

## API Endpoints

### Get ongoing class in a classroom

`GET /classrooms/{classroom_id}/ongoing`

```
curl -X GET http://localhost:8080/classrooms/1/ongoing
```

### Confirm attendance

`POST /attendance`

```
curl -X POST http://localhost:8080/attendance \
     -d "student_id=1&classroom_id=1&class_id=1"
```
