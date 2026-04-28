# Crypto App Backend API Documentation

## Base URL

- Local development: `http://localhost:3000`
- API prefix for auth routes: `/api/auth`

---

## Authentication Endpoints

### Register User

- Method: `POST`
- URL: `/api/auth/register`
- Request body: JSON

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "securePassword"
}
```

- Success response: `201`

```json
{
  "success": true,
  "message": "User registered successfully.",
  "data": {
    "userId": "<mongo-id>"
  }
}
```

- Failure responses:
  - `400` if the email is already registered
  - `500` if a server error occurs

---

### Login User

- Method: `POST`
- URL: `/api/auth/login`
- Request body: JSON

```json
{
  "email": "alice@example.com",
  "password": "securePassword"
}
```

- Success response: `200`

```json
{
  "success": true,
  "message": "Log in successful",
  "user": {
    "id": "<mongo-id>",
    "email": "alice@example.com",
    "name": "Alice"
  },
  "token": "<jwt-token>"
}
```

- Failure responses:
  - `400` if the user is not found
  - `401` if the password is incorrect
  - `500` if a server error occurs

---

### Get Authenticated User Profile

- Method: `GET`
- URL: `/api/auth/me`
- Headers:
  - `Authorization: Bearer <jwt-token>`

- Success response: `200`

```json
{
  "success": true,
  "message": "User profile retrieved.",
  "data": {
    "userId": "<mongo-id>"
  }
}
```

- Failure responses:
  - `401` if no token is provided
  - `401` if the token is invalid or expired

---

## Frontend Integration Notes

1. Register users by posting to `/api/auth/register` with `name`, `email`, and `password`.
2. Login by posting to `/api/auth/login` with `email` and `password`.
3. Save the returned JWT token on the frontend.
4. Use the token in `Authorization: Bearer <jwt-token>` for protected requests such as `/api/auth/me`.

---

## Data Model Notes

### User Model Fields

- `name`: String, required
- `email`: String, required, unique, lowercase, trimmed
- `password`: String, required, minimum length 6
- `image`: String, optional

### JWT

- Signed with `process.env.JWT_SECRET`
- Expires in `1h`

---

## Important Current Limitations

The current backend implementation includes authentication routes only. The following crypto endpoints described in the README are not implemented yet:

- `GET /crypto`
- `GET /crypto/gainers`
- `GET /crypto/new`
- `POST /crypto`

The file `routes/cryptoRoutes.js` is currently empty and is not mounted in `server.js`, so there is no working crypto API available until those routes are implemented.
