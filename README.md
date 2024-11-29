# Bicycle Store Server

This server is an Express-typescript-mongodb-mongoose project. It is a backend managing server for Bicycle Store.It includes CRUD operations for bicycles and orders. I used Zod validation for data validation and also mongoose schema validation and revenue calculation through Mongodb aggregation.

---

## Features

-   **Bicycle Management**

    -   Create, read, update, and delete bicycle details.
    -   Enum-based type validation for bicycles (`Mountain`, `Road`, `Hybrid`, `BMX`, `Electric`).
    -   Inventory tracking with real-time `inStock` status updates.

-   **Order Management**

    -   Place orders with inventory validation.
    -   Calculate total revenue using MongoDB aggregation.

-   **Validation**

    -   Ensures data integrity using Mongoose schema validation and Zod for request validation.
    -   Detailed error responses for validation failures and other errors.

-   **Deployment**
    -   Hosted on **Vercel**.

---

## Technologies Used

-   **Node.js**
-   **Express.js**
-   **TypeScript**
-   **MongoDB**
-   **Mongoose**
-   **Zod**
-   **Vercel**

---

## API Endpoints

### Bicycle Endpoints

1. **Create a Bicycle**

    - **Endpoint**: `/api/products`
    - **Method**: POST
    - **Request Body**:
        ```json
        {
            "name": "Hybrid Explorer",
            "brand": "UrbanCycle",
            "price": 275,
            "type": "Hybrid",
            "description": "Versatile hybrid bike for city and trail riding.",
            "quantity": 8,
            "inStock": true
        }
        ```
        - **Response**: Returns success message and created bicycle details.
        ```json
        {
            "message": "Bicycle created successfully",
            "success": true,
            "data": {
                "name": "BMX Freestyler",
                "brand": "StuntWorks",
                "price": 200,
                "type": "BMX",
                "description": "Durable BMX bike for tricks and stunts.",
                "quantity": 15,
                "inStock": true,
                "_id": "674979384a4eab5c231c3b18",
                "createdAt": "2024-11-29T08:20:08.587Z",
                "updatedAt": "2024-11-29T08:20:08.587Z",
                "__v": 0
            }
        }
        ```

2. **Get All Bicycles**

    - **Endpoint**: `/api/products`
    - **Method**: GET
    - **Query Parameters**: `?searchTerm=type`
    - **Response**: Returns a list of bicycles.
        ```json
        {
            "message": "Bicycle retrieved successfully",
            "success": true,
            "data": [
                {
                    "_id": "674803c709e78db46230fba4",
                    "name": "EcoCruise Electric",
                    "brand": "GreenRide",
                    "price": 2500,
                    "type": "Electric",
                    "description": "A green electric bike for eco-friendly commuting.",
                    "quantity": 10,
                    "inStock": true,
                    "createdAt": "2024-11-28T05:46:47.388Z",
                    "updatedAt": "2024-11-28T14:24:57.727Z",
                    "__v": 0
                },
                {
                    "_id": "674967f15ef04e4807b4e3cf",
                    "name": "E-Rider",
                    "brand": "EcoCycles",
                    "price": 1500,
                    "type": "Electric",
                    "description": "High-performance electric bike for long commutes.",
                    "quantity": 0,
                    "inStock": false,
                    "createdAt": "2024-11-29T07:06:25.560Z",
                    "updatedAt": "2024-11-29T07:38:34.051Z",
                    "__v": 0
                },
                {
                    "_id": "67496bc06385745baad75f91",
                    "name": "E-Rider",
                    "brand": "EcoCycles",
                    "price": 1500,
                    "type": "Electric",
                    "description": "High-performance electric bike for long commutes.",
                    "quantity": 3,
                    "inStock": true,
                    "createdAt": "2024-11-29T07:22:40.696Z",
                    "updatedAt": "2024-11-29T07:22:40.696Z",
                    "__v": 0
                }
            ]
        }
        ```

3. **Get a Specific Bicycle**

    - **Endpoint**: `/api/products/:productId`
    - **Method**: GET
    - **Response**: Returns details of a specific bicycle.
        ```json
        {
            "message": "Bicycle retrieved successfully",
            "success": true,
            "data": {
                "_id": "674967cf5ef04e4807b4e3c7",
                "name": "Mountain King",
                "brand": "Trailblazer",
                "price": 250,
                "type": "Mountain",
                "description": "A robust mountain bike for rough terrains.",
                "quantity": 10,
                "inStock": true,
                "createdAt": "2024-11-29T07:05:51.287Z",
                "updatedAt": "2024-11-29T07:05:51.287Z",
                "__v": 0
            }
        }
        ```

4. **Update a Bicycle**

    - **Endpoint**: `/api/products/:productId`
    - **Method**: PUT
    - **Request Body**:
        ```json
        {
            "price": 350,
            "quantity": 15
        }
        ```
    - **Response**: Returns success message and updated bicycle details.
        ```json
        {
            "message": "Bicycle updated successfully",
            "success": true,
            "data": {
                "_id": "674967cf5ef04e4807b4e3c7",
                "name": "Mountain King",
                "brand": "Trailblazer",
                "price": 400,
                "type": "Mountain",
                "description": "A robust mountain bike for rough terrains.",
                "quantity": 20,
                "inStock": true,
                "createdAt": "2024-11-29T07:05:51.287Z",
                "updatedAt": "2024-11-29T08:25:40.029Z",
                "__v": 0
            }
        }
        ```

5. **Delete a Bicycle**
    - **Endpoint**: `/api/products/:productId`
    - **Method**: DELETE
    - **Response**: Confirms deletion of the bicycle.
        ```json
        {
            "message": "Bicycle deleted successfully",
            "success": true,
            "data": {
                "_id": "674967e95ef04e4807b4e3cd",
                "name": "BMX Freestyler",
                "brand": "FastRider",
                "price": 200,
                "type": "BMX",
                "description": "Durable BMX bike for tricks and stunts.",
                "quantity": 15,
                "inStock": true,
                "createdAt": "2024-11-29T07:06:17.520Z",
                "updatedAt": "2024-11-29T07:06:17.520Z",
                "__v": 0
            }
        }
        ```

---

### Order Endpoints

1. **Place an Order**

    - **Endpoint**: `/api/orders`
    - **Method**: POST
    - **Request Body**:
        ```json
        {
            "email": "customer@example.com",
            "product": "648a45e5f0123c45678d9012",
            "quantity": 2,
            "totalPrice": 600
        }
        ```
    - **Response**: Confirms order placement and adjusts inventory.
        ```json
        {
            "message": "Order created successfully",
            "success": true,
            "data": {
                "email": "customer@example.com",
                "product": "674812ee6d79c02962b5476b",
                "quantity": 1,
                "totalPrice": 1321,
                "_id": "67497b334a4eab5c231c3b27",
                "createdAt": "2024-11-29T08:28:35.532Z",
                "updatedAt": "2024-11-29T08:28:35.532Z",
                "__v": 0
            }
        }
        ```

2. **Calculate Total Revenue**
    - **Endpoint**: `/api/orders/revenue`
    - **Method**: GET
    - **Response**: Returns total revenue from all orders.
        ```json
        {
            "message": "Revenue calculated successfully",
            "success": true,
            "data": {
                "totalRevenue": 107600
            }
        }
        ```

---

## Error Handling

All error responses include the following fields:

-   **message**: A brief explanation of the error.
-   **success**: Set to `false`.
-   **error**: The error object (e.g., validation errors).
-   **stack**: Stack trace for debugging.

Example Error Response:

```json
{
    "message": "Given Data Is Invalid",
    "success": false,
    "error": {
        "issues": [
            {
                "code": "too_small",
                "minimum": 0,
                "type": "number",
                "inclusive": true,
                "exact": false,
                "message": "Price must be a non-negative number",
                "path": ["price"]
            }
        ],
        "name": "ZodError"
    },
    "stack": "ZodError: [\n  {\n    \"code\": \"too_small\",\n    \"minimum\": 0,\n    \"type\": \"number\",\n    \"inclusive\": true,\n    \"exact\": false,\n    \"message\": \"Price must be a non-negative number\",\n    \"path\": [\n      \"price\"\n    ]\n  }\n]\n    at Object.get error [as error] (F:\\NEXT_LEVEL\\bi-cycle-store\\node_modules\\zod\\lib\\types.js:55:31)\n    at ZodObject.parseAsync (F:\\NEXT_LEVEL\\bi-cycle-store\\node_modules\\zod\\lib\\types.js:183:22)\n    at processTicksAndRejections (node:internal/process/task_queues:105:5)"
}
```

## Setup and Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/emonmorol/bi-cyle-store-server.git

    ```

1. Navigate to the project directory:

    ```bash
    cd bicycle-store-api

    ```

1. Install dependencies:

    ```bash
    npm install

    ```

1. Configure environment variables: Create a .env file in the root directory with the following variables:

    ```env
     MONGO_URI=<Your MongoDB connection string>
     PORT=5000

    ```

1. Start the development server:

    ```bash
    npm run start:dev

    ```

1. Before Building the project (check for errors using eslint and prettier)

    ```bash
    npm run lint
    npm run format

    ```

1. Build the project

    ```bash
    npm run build

    ```

1. Deploy to vercel
    ```bash
    vercel --prod
    ```
