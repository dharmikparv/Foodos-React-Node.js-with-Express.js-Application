## Foodos – Order Management

Order management feature for a food delivery app, built with a React (Vite) frontend and an Express backend. It covers the full flow from browsing the menu to placing an order and tracking its status.

### Core Features

- **Menu Display**: Browse food items with name, description, price, and (optional) image.
- **Cart Management**: Add items, adjust quantities, and remove items before checkout.
- **Checkout Form**: Delivery details form (name, address, phone) with **Formik + Yup** validation.
- **Order Creation**: Orders are submitted to the backend API and persisted in an in-memory store (for development).
- **Order Status Tracking**: Track each order status with simulated real-time progress \
  (Order Received → Preparing → Out for Delivery → Delivered).
- **Order List & Details**: View a list of existing orders and drill into the status of a single order.

### Tech Stack

| Layer     | Technologies                                                |
|----------|-------------------------------------------------------------|
| Frontend | React 18, Vite, Tailwind CSS, Formik, React Router, Yup    |
| Backend  | Node.js, Express                                            |
| Storage  | In-memory (development only)                                |
| Tests    | Jest + Supertest (API), Vitest + Testing Library (UI)      |

---

## Getting Started

### Prerequisites

- **Node.js 18+**
- npm (comes with Node)

### Install Dependencies

From the project root:

```bash
npm run install:all
```

This will:
- install root dependencies (currently `concurrently`),
- install backend dependencies in `server/`,
- install frontend dependencies in `client/`.

### Run the App

**Option A – Run client and server together (recommended during development)**

```bash
npm run dev
```

This starts:
- **Frontend** on `http://localhost:5173`
- **Backend** on `https://foodos-backend-td4r.onrender.com/`

**Option B – Run client and server separately**

```bash
# Terminal 1 – backend
npm run server:dev

# Terminal 2 – frontend
npm run client:dev
```

### Run Tests

```bash
# Backend API tests (Jest + Supertest)
npm run server:test

# Frontend UI tests (Vitest + Testing Library)
npm run client:test
```

---

## API Reference

Base URL (development): `http://localhost:3001`

### Menu

- **GET** `/api/menu` – Get all menu items.

**Sample response (trimmed):**

```json
[
  {
    "id": "1",
    "name": "Margherita Pizza",
    "description": "Classic pizza with tomato, mozzarella and basil",
    "price": 9.99
  }
]
```

### Orders

- **POST** `/api/orders` – Create a new order.
- **GET** `/api/orders/:id` – Get a single order by id.
- **PATCH** `/api/orders/:id/status` – Update an order status.
- **GET** `/api/orders/:id/next-status` – Advance to the next status (simulation helper).

**Example – create an order**

```json
POST /api/orders
{
  "customer": {
    "name": "John Doe",
    "address": "123 Main St",
    "phone": "1234567890"
  },
  "items": [
    { "menuItemId": "1", "quantity": 2 },
    { "menuItemId": "3", "quantity": 1 }
  ]
}
```

**Example – response**

```json
{
  "id": "order_123",
  "status": "RECEIVED",
  "customer": {
    "name": "John Doe",
    "address": "123 Main St",
    "phone": "1234567890"
  },
  "items": [
    { "menuItemId": "1", "quantity": 2 },
    { "menuItemId": "3", "quantity": 1 }
  ]
}
```

Status transitions are simulated by the server, and the frontend can poll or request `/api/orders/:id/next-status` to advance an order through its lifecycle.

---

## Project Structure

```text
FOOD_DEL/
├── client/                # React frontend (Vite)
│   ├── src/
│   │   ├── components/    # Reusable UI + feature components
│   │   ├── pages/         # Route-level pages (Menu, Cart, Checkout, Orders, Order Status)
│   │   ├── store/         # Contexts/state (e.g. cart)
│   │   ├── hooks/         # Custom hooks (menu, orders, polling)
│   │   ├── services/      # API client wrappers
│   │   └── utils/         # Formatting and helpers
│   └── ...
├── server/                # Express backend
│   ├── src/
│   │   ├── routes/        # API routes (menu, orders)
│   │   ├── controllers/   # Request handlers
│   │   ├── services/      # Business logic (menu, order)
│   │   ├── middleware/    # Validation, error handling
│   │   ├── data/          # In-memory data store
│   │   ├── utils/         # Shared utilities
│   │   └── constants/     # Shared constants (status, etc.)
│   └── ...
└── package.json           # Root scripts for running and testing
```

---

## Development Notes

- This project is designed for **local development and learning purposes**; data is not persisted beyond server restarts.
- You can easily swap the in-memory store for a real database by replacing the logic in the server `data` and `services` layers.
- Frontend and backend are decoupled and communicate only via the documented HTTP API.

---

## License

MIT
"# Foodos-React-Node.js-with-Express.js-Application" 
