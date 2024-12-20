# API Documentation: Vet Management

This document describes the endpoints for the Vet Management API built with Node.js, Express, and MySQL.

1. [Base URL](#base-url)
2. [Endpoints](#endpoints)
   - [Get All Clients](#1-get-all-clients)
   - [Get Client by ID](#2-get-client-by-id)
   - [Create a New Client](#3-create-a-new-client)
   - [Update an Existing Client](#4-update-an-existing-client)
   - [Delete a Client](#5-delete-a-client)
3. [Database Connection](#database-connection)
4. [Error Handling](#error-handling)
5. [Development](#development)
   - [Install DB](#install-db)
   - [Install Dependencies](#install-dependencies)
   - [Run the Server](#run-the-server)

---

## Base URL

```
http://localhost:5001
```

## Endpoints

### 1. **Get All Clients**

Retrieve a list of all clients.

**Endpoint**:  

```
GET /clients
```

**Response**:  

- **200 OK**  

  ```json
  {
    "info": { "count": 2 },
    "result": [
      {
        "id": 1,
        "name": "John",
        "lastname": "Doe",
        "email": "john.doe@example.com"
      },
      {
        "id": 2,
        "name": "Jane",
        "lastname": "Smith",
        "email": "jane.smith@example.com"
      }
    ]
  }
  ```

---

### 2. **Get Client by ID**

Retrieve details of a single client by their ID.

**Endpoint**:  

```
GET /clients/:id
```

**Path Parameters**:  

- `id` (integer): ID of the client.

**Responses**:  

- **200 OK**  

  ```json
  {
    "id": 1,
    "name": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com"
  }
  ```
- **404 Not Found**  

  ```json
  {}
  ```

---

### 3. **Create a New Client**

Add a new client to the database.

**Endpoint**:  

```
POST /clients
```

**Request Body** (JSON):  

```json
{
  "name": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com"
}
```

**Responses**:  

- **201 Created**  

  ```json
  {
    "id": 1,
    "name": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com"
  }
  ```
- **400 Bad Request** (when a required field is missing)  

  ```json
  { "message": "`name` is required" }
  ```

---

### 4. **Update an Existing Client**

Update the details of an existing client by their ID.

**Endpoint**:  

```
PUT /clients/:id
```

**Path Parameters**:  

- `id` (integer): ID of the client.

**Request Body** (JSON):  

```json
{
  "name": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com"
}
```

**Responses**:  

- **200 OK**  

  ```json
  {
    "id": 1,
    "name": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com"
  }
  ```
- **400 Bad Request** (when a required field is missing)  

  ```json
  { "message": "`lastname` is required" }
  ```

---

### 5. **Delete a Client**

Remove a client from the database by their ID.

**Endpoint**:  

```
DELETE /clients/:id
```

**Path Parameters**:  

- `id` (integer): ID of the client.

**Responses**:  

- **204 No Content**  

---

## Database Connection

This API connects to a MySQL database with the following configuration (defined in `.env` file):

- `USER_DB`: Database username.
- `PASSWORD`: Database password.
- `Database`: `vet`.

---

## Error Handling

- **400 Bad Request**: Returned when required fields are missing.
- **404 Not Found**: Returned when the specified client does not exist.
- **500 Internal Server Error**: For unexpected server errors.

---

## Development

### Install DB

Initialize DB using files inside `bd` folder.

### Install Dependencies

```bash
npm install
```

### Run the Server

```bash
npm run dev
```
