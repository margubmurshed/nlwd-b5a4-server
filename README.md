# Library Management API

Advanced REST API for managing Library system.

## Tech Stack
- **Express**
- **TypeScript**
- **Mongoose**

## Features

- **Book Management**
    - Create, retrieve, update and delete books
    - Filter by genre and sort by any field
    - ISBN uniqueness and enforcing a group of genres

- **Borrow System**
    - Borrow specific books providing bookId, copies and return date
    - Automatic availability and num of copies update
    - Availability and stock check before borrowing

- **Borrow Summary**
    - Using aggregation pipeline to return total quantity borrowed per book
    - Showing specific fields (title and isbn)

- **Robust Backend**
    - Custom error handling and validation responses
    - Type-safe models and controllers created using TypeScript

## Folder Structure
src/
- app/
    - controllers/
    - interfaces/
    - models/
    - middlewares/
- app.ts
- server.ts

## Setting up project locally

### 1. Clone the Repository
```bash
    git clone https://github.com/margubmurshed/NLWD-B5A3.git
    cd NLWD-B5A3
```

### 2. Install Dependencies
```bash
    npm install
```

### Configure Environment Variables
Create a .env file in the root directory
```ini
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/<database_name>
```
Replace the MONGO_URI with your connection string.

### Run the Server

install typescript and nodemon globally:
```bash
    npm install typescript nodemon --save-dev
```

Then run these two commands in 2 separate cmd:
```bash
    tsc -w
    nodemon dist/server.js
```

You can also use ts-node-dev for simpler process.

## API Endpoints

| Method | Endpoint        | Description        |
|--------|-----------------|--------------------|
| GET    | `/api/books`    | Get all books      |
| GET    | `/api/books/:bookId`    | Get a specific book by book id      |
| POST    | `/api/books`    | Create a new book      |
| PUT    | `/api/books/:bookId`    | Update a book by book id      |
| DELETE    | `/api/books/:bookId`    | Delete a book by book id      |
| POST    | `/api/borrow/`    | Borrow a book      |
| GET    | `/api/borrow/`    | Get borrowed books summary      |

GET `/api/books/` has query parameters:
- filter -> genre name
- sortBy -> field name (default: createdAt)
- sort -> asc or desc
- limit -> valid non negative integer (default: 10)
- page -> valid positive integer (default: 1)
Without defining sort asc or descending, sortBy won't work.

**Example Query: /api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5**

## Developed by
**Margub Murshed** - **Full Stack Developer**

