# Ecommerce Backend API Documentation

## 1. Overview

This document describes the currently implemented backend APIs in this project.

- Base path: `/api`
- Content type: `application/json`
- Auth type: Bearer token (JWT)
- CORS allowed origin: `http://localhost:3001`

---

## 2. Authentication

Use this header for protected routes:

`Authorization: Bearer <your_jwt_token>`

### Common auth middleware errors (current behavior)

These responses are returned by auth middleware and currently use HTTP 200 in the implementation:

#### Missing Authorization header

```json
{
  "success": false,
  "message": "Authorization header missing"
}
```

#### Missing token after Bearer

```json
{
  "success": false,
  "message": "Token missing"
}
```

#### Invalid/expired token

```json
{
  "success": false,
  "message": "Invalid token"
}
```

---

## 3. Data Models (API level)

### User

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2b$10$...",
  "role": "USER",
  "createdAt": "2026-03-16T12:00:00.000Z",
  "updatedAt": "2026-03-16T12:00:00.000Z"
}
```

### Product

```json
{
  "id": 10,
  "name": "Classic Tee",
  "description": "Soft cotton t-shirt with regular fit",
  "price": 799,
  "sizes": "M,L,XL",
  "thumbnailImage1": "https://cdn.example.com/thumb-1.jpg",
  "thumbnailImage2": "https://cdn.example.com/thumb-2.jpg",
  "showcaseImages": [
    "https://cdn.example.com/showcase-1.jpg",
    "https://cdn.example.com/showcase-2.jpg"
  ],
  "createdAt": "2026-03-16T12:00:00.000Z",
  "updatedAt": "2026-03-16T12:00:00.000Z"
}
```

### Address

```json
{
  "id": 3,
  "lineOne": "221B Baker Street",
  "lineTwo": "Near Museum",
  "city": "London",
  "country": "UK",
  "pincode": "NW16XE",
  "userId": 1,
  "createdAt": "2026-03-16T12:00:00.000Z",
  "updatedAt": "2026-03-16T12:00:00.000Z"
}
```

### Cart Item

```json
{
  "id": 5,
  "quantity": 2,
  "userId": 1,
  "productId": 10,
  "createdAt": "2026-03-16T12:00:00.000Z",
  "updatedAt": "2026-03-16T12:00:00.000Z"
}
```

### Order

```json
{
  "id": 21,
  "userId": 1,
  "totalAmount": 1994.64,
  "orderStatus": "PENDING",
  "createdAt": "2026-03-17T11:00:00.000Z",
  "updatedAt": "2026-03-17T11:00:00.000Z"
}
```

### Order Item

```json
{
  "id": 44,
  "orderId": 21,
  "productId": 10,
  "quantity": 2,
  "price": 799,
  "createdAt": "2026-03-17T11:00:00.000Z",
  "updatedAt": "2026-03-17T11:00:00.000Z"
}
```

---

## 4. Auth Routes

## POST /api/auth/signup

Create a new user account.

### Request body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123"
}
```

### Validation rules

- `name`: string, min 3, max 50
- `email`: valid email
- `password`: string, min 6, max 100

### Success response (HTTP 200)

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "password": "$2b$10$...",
    "role": "USER",
    "createdAt": "2026-03-16T12:00:00.000Z",
    "updatedAt": "2026-03-16T12:00:00.000Z"
  }
}
```

### Error responses

Invalid input:

```json
{
  "success": false,
  "message": "Invalid input data"
}
```

User already exists:

```json
{
  "success": false,
  "message": "User already exists"
}
```

---

## POST /api/auth/login

Authenticate user and return JWT token.

### Request body

```json
{
  "email": "john@example.com",
  "password": "secure123"
}
```

### Validation rules

- `email`: valid email
- `password`: string, min 6, max 100

### Success response (HTTP 200)

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "password": "$2b$10$...",
    "role": "USER",
    "createdAt": "2026-03-16T12:00:00.000Z",
    "updatedAt": "2026-03-16T12:00:00.000Z"
  },
  "success": true,
  "message": "Login successful",
  "token": "<jwt_token>"
}
```

### Error responses

Invalid input:

```json
{
  "success": false,
  "message": "Invalid input data"
}
```

User does not exist:

```json
{
  "success": false,
  "message": "User does not exist"
}
```

Invalid password:

```json
{
  "success": false,
  "message": "Invalid password"
}
```

---

## GET /api/auth/me

Get current logged-in user's basic profile.

- Auth required: Yes

### Success response (HTTP 200)

```json
{
  "success": true,
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

### Error response

```json
{
  "success": false,
  "message": "User not found"
}
```

---

## POST /api/auth/me

Update current logged-in user's profile fields.

- Auth required: Yes

### Request body

```json
{
  "name": "John Updated",
  "email": "john.updated@example.com"
}
```

### Validation rules

- `name`: optional string, min 3, max 50
- `email`: optional valid email
- At least one of `name` or `email` should be provided

### Success response (HTTP 200)

```json
{
  "success": true,
  "message": "User updated successfully"
}
```

### Error responses

Invalid input:

```json
{
  "success": false,
  "message": "Invalid input data"
}
```

Nothing to update:

```json
{
  "success": false,
  "message": "Nothing to update"
}
```

---

## 5. Product Routes

## POST /api/products/create

Create a product (admin only).

- Auth required: Yes
- Admin required: Yes

### Request body

```json
{
  "name": "Classic Tee",
  "description": "Soft cotton t-shirt with regular fit",
  "price": 799,
  "sizes": "M,L,XL",
  "thumbnailImage1": "https://cdn.example.com/thumb-1.jpg",
  "thumbnailImage2": "https://cdn.example.com/thumb-2.jpg",
  "showcaseImages": [
    "https://cdn.example.com/showcase-1.jpg",
    "https://cdn.example.com/showcase-2.jpg"
  ]
}
```

### Validation rules

- `name`: string, min 3, max 100
- `description`: string, min 10, max 1000
- `price`: number, positive, max 100000
- `sizes`: optional string, min 1, max 7
- `thumbnailImage1`: URL string
- `thumbnailImage2`: optional URL string
- `showcaseImages`: array of URL strings, max 8

### Success response (HTTP 201)

```json
{
  "message": "Product created successfully",
  "success": true,
  "data": {
    "id": 10,
    "name": "Classic Tee",
    "description": "Soft cotton t-shirt with regular fit",
    "price": 799,
    "sizes": "M,L,XL",
    "thumbnailImage1": "https://cdn.example.com/thumb-1.jpg",
    "thumbnailImage2": "https://cdn.example.com/thumb-2.jpg",
    "showcaseImages": [
      "https://cdn.example.com/showcase-1.jpg",
      "https://cdn.example.com/showcase-2.jpg"
    ],
    "createdAt": "2026-03-16T12:00:00.000Z",
    "updatedAt": "2026-03-16T12:00:00.000Z"
  }
}
```

### Error responses

Invalid payload:

```json
{
  "message": "Invalid data",
  "success": false
}
```

Not admin:

```json
{
  "success": false,
  "message": "User does not have admin privileges"
}
```

---

## PUT /api/products/update/:id

Update product fields by product ID (admin only).

- Auth required: Yes
- Admin required: Yes

### Path params

- `id`: number (product ID)

### Request body (all fields optional)

```json
{
  "name": "Classic Tee 2.0",
  "price": 899,
  "thumbnailImage1": "https://cdn.example.com/new-thumb.jpg"
}
```

### Success response (HTTP 200)

```json
{
  "message": "Product updated successfully",
  "success": true,
  "data": {
    "id": 10,
    "name": "Classic Tee 2.0",
    "description": "Soft cotton t-shirt with regular fit",
    "price": 899,
    "sizes": "M,L,XL",
    "thumbnailImage1": "https://cdn.example.com/new-thumb.jpg",
    "thumbnailImage2": "https://cdn.example.com/thumb-2.jpg",
    "showcaseImages": [
      "https://cdn.example.com/showcase-1.jpg",
      "https://cdn.example.com/showcase-2.jpg"
    ],
    "createdAt": "2026-03-16T12:00:00.000Z",
    "updatedAt": "2026-03-16T13:00:00.000Z"
  }
}
```

### Error response

```json
{
  "message": "Invalid product id",
  "success": false
}
```

or

```json
{
  "message": "Invalid data",
  "success": false
}
```

---

## DELETE /api/products/delete/:id

Delete product by ID (admin only).

- Auth required: Yes
- Admin required: Yes

### Path params

- `id`: number (product ID)

### Success response (HTTP 200)

```json
{
  "message": "Product deleted successfully",
  "success": true,
  "data": {
    "name": "Classic Tee"
  }
}
```

### Error response

```json
{
  "message": "Invalid product id",
  "success": false
}
```

---

## GET /api/products

List products with pagination.

### Query params

- `page` (optional): page number; default is 1
- Page size is fixed to 10

### Success response (HTTP 200)

```json
{
  "message": "Products fetched successfully",
  "success": true,
  "data": {
    "products": [
      {
        "id": 10,
        "name": "Classic Tee",
        "description": "Soft cotton t-shirt with regular fit",
        "price": 799,
        "sizes": "M,L,XL",
        "thumbnailImage1": "https://cdn.example.com/thumb-1.jpg",
        "thumbnailImage2": "https://cdn.example.com/thumb-2.jpg",
        "showcaseImages": ["https://cdn.example.com/showcase-1.jpg"],
        "createdAt": "2026-03-16T12:00:00.000Z",
        "updatedAt": "2026-03-16T12:00:00.000Z"
      }
    ],
    "totalPages": 5,
    "currentPage": 1
  }
}
```

---

## GET /api/products/:id

Get product by ID.

### Path params

- `id`: number (product ID)

### Success response (HTTP 200)

```json
{
  "message": "Product fetched successfully",
  "success": true,
  "data": {
    "id": 10,
    "name": "Classic Tee",
    "description": "Soft cotton t-shirt with regular fit",
    "price": 799,
    "sizes": "M,L,XL",
    "thumbnailImage1": "https://cdn.example.com/thumb-1.jpg",
    "thumbnailImage2": "https://cdn.example.com/thumb-2.jpg",
    "showcaseImages": ["https://cdn.example.com/showcase-1.jpg"],
    "createdAt": "2026-03-16T12:00:00.000Z",
    "updatedAt": "2026-03-16T12:00:00.000Z"
  }
}
```

### Error responses

Invalid ID:

```json
{
  "message": "Invalid product id",
  "success": false
}
```

Not found:

```json
{
  "message": "Product not found",
  "success": false
}
```

---

## 6. User Address Routes

## POST /api/users/address

Add a new address for current user.

- Auth required: Yes

### Request body

```json
{
  "lineOne": "221B Baker Street",
  "lineTwo": "Near Museum",
  "city": "London",
  "pincode": "NW16XE",
  "country": "UK"
}
```

### Validation rules

- `lineOne`: string, min 5, max 100
- `lineTwo`: optional string, min 5, max 100
- `city`: string, min 2, max 50
- `pincode`: string, min 4, max 10
- `country`: string, min 2, max 50

### Success response (HTTP 200)

```json
{
  "success": true,
  "data": {
    "id": 3,
    "lineOne": "221B Baker Street",
    "lineTwo": "Near Museum",
    "city": "London",
    "country": "UK",
    "pincode": "NW16XE",
    "userId": 1,
    "createdAt": "2026-03-16T12:00:00.000Z",
    "updatedAt": "2026-03-16T12:00:00.000Z"
  }
}
```

### Error responses

Invalid data:

```json
{
  "success": false,
  "message": "Invalid address data"
}
```

User not found:

```json
{
  "success": false,
  "message": "User not found"
}
```

---

## GET /api/users/address

Get all addresses for current user.

- Auth required: Yes

### Success response when addresses exist (HTTP 200)

```json
{
  "success": true,
  "data": [
    {
      "id": 3,
      "lineOne": "221B Baker Street",
      "lineTwo": "Near Museum",
      "city": "London",
      "country": "UK",
      "pincode": "NW16XE",
      "userId": 1,
      "createdAt": "2026-03-16T12:00:00.000Z",
      "updatedAt": "2026-03-16T12:00:00.000Z"
    }
  ]
}
```

### Success response when no address found (HTTP 200)

```json
{
  "success": true,
  "data": [],
  "message": "No addresses found"
}
```

---

## DELETE /api/users/address/:id

Delete a user address by address ID.

- Auth required: Yes

### Current implementation status

This route exists, but the controller function is currently empty in code.

Expected behavior is not implemented yet.

---

## 7. Cart Routes

## POST /api/cart

Add item to cart.

- Auth required: Yes

### Request body

```json
{
  "productId": 10,
  "quantity": 2
}
```

### Validation rules

- `productId`: number
- `quantity`: number, min 1

### Success response (HTTP 200)

```json
{
  "success": true,
  "data": {
    "id": 5,
    "productId": 10,
    "quantity": 2,
    "userId": 1,
    "createdAt": "2026-03-16T12:00:00.000Z",
    "updatedAt": "2026-03-16T12:00:00.000Z"
  }
}
```

### Error responses

Invalid body:

```json
{
  "success": false,
  "message": "Invalid quantity provided"
}
```

Product not found:

```json
{
  "success": false,
  "message": "Product not found"
}
```

---

## PUT /api/cart/:id

Change quantity of a cart item.

- Auth required: Yes

### Path params

- `id`: number (cart item ID)

### Request body

```json
{
  "quantity": 3
}
```

### Success response (HTTP 200)

```json
{
  "success": true,
  "message": "Cart item quantity updated",
  "data": {
    "id": 5,
    "productId": 10,
    "quantity": 3,
    "userId": 1,
    "createdAt": "2026-03-16T12:00:00.000Z",
    "updatedAt": "2026-03-16T13:00:00.000Z"
  }
}
```

### Error responses

Invalid body:

```json
{
  "success": false,
  "message": "Invalid quantity provided"
}
```

Cart item not found:

```json
{
  "success": false,
  "message": "Cart item not found"
}
```

---

## DELETE /api/cart/:id

Remove item from cart.

- Auth required: Yes

### Path params

- `id`: number (cart item ID)

### Success response (HTTP 200)

```json
{
  "success": true,
  "message": "Item removed from cart",
  "data": {
    "id": 5,
    "productId": 10,
    "quantity": 3,
    "userId": 1,
    "createdAt": "2026-03-16T12:00:00.000Z",
    "updatedAt": "2026-03-16T13:00:00.000Z"
  }
}
```

### Error response

```json
{
  "success": false,
  "message": "Cart item not found"
}
```

---

## GET /api/cart

Get logged-in user's cart with product info.

- Auth required: Yes

### Success response (HTTP 200)

```json
{
  "success": true,
  "data": [
    {
      "id": 5,
      "quantity": 2,
      "product": {
        "name": "Classic Tee",
        "price": 799
      }
    }
  ]
}
```

---

## 8. Order Routes

## GET /api/orders

Get all orders for current user.

- Auth required: Yes

### Success response (HTTP 200)

```json
{
  "success": true,
  "message": "Orders retrieved successfully",
  "data": [
    {
      "orderId": 21,
      "status": "PENDING",
      "totalAmount": 1994.64,
      "orderSummary": [
        {
          "name": "Classic Tee",
          "quantity": 2
        },
        {
          "name": "Linen Shirt",
          "quantity": 1
        }
      ]
    }
  ]
}
```

### No orders response (HTTP 200)

```json
{
  "success": false,
  "message": "No orders found"
}
```

---

## POST /api/orders/checkout

Create a new order from the current user's cart.

- Auth required: Yes

### Request body

```json
{
  "addressId": 3,
  "paymentMethod": "COD",
  "deliveryNotes": "Please call before delivery"
}
```

### Notes on request fields (current behavior)

- `paymentMethod` impacts pricing: `COD` adds a 50 charge.
- `addressId` and `deliveryNotes` are accepted in request but currently not persisted or validated in controller logic.

### Success response (HTTP 200)

```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "orderId": 21,
    "status": "PENDING",
    "paymentStatus": "unpaid",
    "pricing": {
      "originalAmount": 1598,
      "deliveryCharges": 300,
      "tax": "287.64",
      "paymentMethodCharges": 50,
      "finalAmount": "2235.64"
    },
    "orderSummary": [
      {
        "name": "Classic Tee",
        "quantity": 2
      }
    ]
  }
}
```

### Error response

```json
{
  "success": false,
  "message": "Cart is empty"
}
```

---

## 9. Search Routes

## GET /api/search

Search products by full-text match on product name.

### Query params

- `q` (optional): search query text

### Success response when query is provided (HTTP 200)

```json
{
  "success": true,
  "data": [
    {
      "id": 10,
      "name": "Classic Tee",
      "description": "Soft cotton t-shirt with regular fit",
      "price": 799,
      "sizes": "M,L,XL",
      "thumbnailImage1": "https://cdn.example.com/thumb-1.jpg",
      "thumbnailImage2": "https://cdn.example.com/thumb-2.jpg",
      "showcaseImages": ["https://cdn.example.com/showcase-1.jpg"],
      "createdAt": "2026-03-16T12:00:00.000Z",
      "updatedAt": "2026-03-16T12:00:00.000Z"
    }
  ],
  "message": "Search results"
}
```

### Success response when query is empty (HTTP 200)

```json
{
  "success": true,
  "data": [],
  "message": "No search query provided"
}
```

---

## 10. Notes And Implementation Caveats

- Many auth/admin failures currently return HTTP 200 with `success: false`.
- `DELETE /api/users/address/:id` is routed but not implemented in controller yet.
- Some auth handlers do not `return` immediately after certain error responses in code. Depending on runtime flow, this may cause unexpected behavior.

If you want, this document can be followed by a second version that standardizes all endpoints to proper HTTP status conventions and a unified response format.
