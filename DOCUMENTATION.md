# 🪁 Kiteasm - Technical Architecture & Systems Deep-Dive

## 1. Architectural Strategy
Kiteasm is built on a **Decoupled Client-Server Architecture**, separating the presentation layer from the business logic and data persistence.

### Frontend (React Single Page Application)
- **Engine**: Vite + React 19.
- **Routing**: `react-router-dom` v7 with a centralized `App.jsx` configuration.
- **Styling Strategy**: High-performance Vanilla CSS with a focus on CSS Variables for consistency and premium animations (Glassmorphism, Fade-ins, Micro-interactions).
- **Communication Layer**: Axios with a centralized `API_BASE_URL` in `utils/config.js` to simplify environment switching.

### Backend (Express RESTful API)
- **Engine**: Node.js + Express 5 (latest).
- **ODM**: Mongoose 8+ for MongoDB Atlas integration.
- **Process Management**: Integrated with `nodemon` for development and native clustering readiness for multi-core scaling.
- **Security**: Stateless JWT-based authentication for horizontal scalability.

---

## 2. Security & Authentication Flow

### JWT Implementation
Kiteasm uses a **Stateless Token** strategy to avoid server-side session overhead.

1.  **Issue**: Upon successful `POST /auth/login`, the backend signed a JWT containing the `userId`.
2.  **Storage**: The Frontend stores this in `localStorage` as `token`.
3.  **Transmission**: Every protected request includes the token in the `Authorization: Bearer <token>` header.
4.  **Verification**: 
    -   **`Verifyme.js` Middleware**: Extracts the token from headers, verifies the signature against `JWT_SECRET`, and injects `req.userId` into the request object for subsequent controllers.
    -   **`VerifyRole.js` Middleware**: Intercepts admin-only routes. It fetches the user from DB based on `req.userId` and validates `user.role === 'admin'`.

### Route Protection (Frontend)
-   **`Protected_Route.jsx`**: A high-order wrapper that guards routes. It checks for token presence and validates `adminOnly` requirements, redirecting unauthorized users to `/login` or the home page.

---

## 3. Core System Logic Flows

### � The Cart & Bundle Engine
The Cart system is optimized for "Gear Bundles", a key differentiator for Kiteasm.

-   **Logic**: `Cart_Controller.js` manages state. If a product already exists in the cart, it increments quantity; otherwise, it pushes a new item object with a "Price Lock" (recording the price at the time of addition).
-   **Bundles**: Defined in `ProductDetails.jsx`. When a "Manjha" product is viewed, the system cross-references the catalog to suggest a companion "Saddi" or "Kite" (e.g., Oswal No3). 
-   **Implementation**: The "Get Bundle" button triggers a sequential `axios.post` chain ensuring both the main and suggested products are committed to the database before the user is navigated to the cart view.

### � Transaction & Fulfillment flow (The "Life of an Order")
The checkout process follows a strict 6-step transactional flow:

1.  **Frontend Preparation**: `Checkout.jsx` aggregates cart items, subtotal, and user shipping details.
2.  **Stock Lock**: The backend `Checkout.js` loops through items and performs a **Stock Pre-Check** (`product.stock >= item.quantity`).
3.  **Inventory Deduction**: Once validated, `product.stock` is updated atomically to prevent race conditions (multiple users buying the last item).
4.  **Order Persistence**: A record is created in `OrderModel` with `paymentStatus: "pending"` (for COD) or `paid` (for Online).
5.  **Cart Liquidation**: The user's `CartModel` document is deleted upon successful order creation.
6.  **Communication**: `Nodemailer` sends transactional emails to the customer and the admin team with full order breakdowns.

---

## 4. Database Schema Deep-Dive

### `Product_Schema.js`
-   **`isExclusive`**: Boolean. Activates "Master Edition" UI styling.
-   **`mainImage`**: String. Path to the primary product photo.
-   **`secondaryImages`**: Array of URLs for the detail gallery.
-   **`category`**: String. Used for filtering and the bundle suggestion engine.

### `OrderSchema.js`
-   **`userId`**: ObjectId ref to `User`.
-   **`items`**: Array containing snapshots of product details at the time of purchase (ensures historical integrity if prices change).
-   **`customerDetails`**: Object containing name, email, and a flattened string of the shipping address.
-   **`orderStatus`**: `processing` -> `shipped` -> `delivered`.

### `User_Schema.js`
-   **`role`**: `user` or `admin`.
-   **`address`**: Array of structured addresses for quick checkout selection.

---

## 5. API Matrix

### 👥 User & Guest Endpoints
-   `GET /user/products`: Full catalog retrieval with optional pagination capability.
-   `GET /user/products/:id`: Specific item details + companion suggestion triggers.
-   `POST /user/cart/add`: Body: `{ productId, quantity }`. Uses `verifyme` middleware.
-   `POST /user/checkout`: Atomic order creation and inventory adjustment.
-   `POST /payment/create-order`: Gateway initialization (Razorpay).

### 🛡️ Admin Endpoints
-   `GET /admin/orders`: Overview of all business transactions.
-   `GET /admin/download-orders`: Generates an XLSX report using `ExcelJS`.
-   `POST /admin/New/products`: Handles multipart file uploads (using standard form data).
-   `PUT /admin/orderupdate/status/:id`: Logistic status updates.

---

## 6. External Integrations
1. **Razorpay**: Used for secured online payments with signature verification.
2. **Nodemailer**: SMTP integration for sending transactional emails (Order confirmations, Password resets).
3. **ExcelJS**: Generates professional CSV/XLSX reports for business analysis.
