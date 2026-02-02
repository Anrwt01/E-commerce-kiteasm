# Kiteasm Project Documentation

## 1. Project Overview
**Kiteasm** is a full-stack e-commerce application dedicated to high-performance kite flying gear ("Manjha", "Saddi", "Kites"). The platform provides a premium shopping experience with features like "Master Edition" exclusive drops, product bundling, and a dedicated pilot dashboard.

### Technology Stack
- **Frontend**: React.js (Vite), CSS (Modules/Vanilla), Lucide React / Heroicons.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (via Mongoose).
- **Payment/Tools**: Razorpay, ExcelJS (for reports).

---

## 2. Directory Structure

```text
MyProject-2/
├── Backend/
│   ├── Http/               # Controllers & Logic
│   ├── Public/             # Static Assets & Error Pages
│   ├── Routes/             # API Route Definitions
│   ├── Schema/             # Mongoose Models (Product, User, etc.)
│   ├── app.js              # Application Entry Point
│   └── package.json        # Backend Dependencies
│
└── FrontEnd/
    ├── src/
    │   ├── Comp/
    │   │   ├── Admin_comp/ # Admin Dashboard & Management
    │   │   ├── Auth_comp/  # Login, Register, Recovery
    │   │   ├── Open_comp/  # Public Pages (Home, Products)
    │   │   └── User_Comp/  # User Dashboard, Cart, Checkout
    │   ├── utils/          # Config & Helpers
    │   └── main.jsx        # Frontend Entry Point
    └── package.json        # Frontend Dependencies
```

---

## 3. Setup & Installation

### Backend Setup
1.  Navigate to the `Backend` directory.
2.  Install dependencies:
    ```bash
    npm install
    # Critical: Ensure mongoose is installed if not present in package.json
    npm install mongoose
    ```
3.  Configure Environment Variables (`.env`):
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    CORS_ORIGIN=http://localhost:5173
    RAZORPAY_KEY=your_key
    ```
4.  Start the server:
    ```bash
    npm run dev  # (uses nodemon)
    ```

### Frontend Setup
1.  Navigate to the `FrontEnd` directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The app will typically run at `http://localhost:5173`.

---

## 4. Architecture & Configuration

### API Configuration
A centralized configuration file controls the API base URL.
-   **File**: `FrontEnd/src/utils/config.js`
-   **Current Value**: `http://localhost:5000/api`
-   **Usage**: Import `API_BASE_URL` in components to make requests.

### Database Schema (Highlighted)
**Product Schema** (`Backend/Schema/Product_Schema.js`):
The product model has been enhanced to support exclusive drops and multiple images.

```javascript
const Product_schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  
  // Visual Assets
  mainImage: { type: String, required: true }, // Cover Image
  secondaryImages: [{ url: String, public_id: String }], // Gallery
  
  // Exclusive Flag for "Master Edition" items
  isExclusive: { type: Boolean, default: false }, 
  
  isActive: { type: Boolean, default: true }
}, { timestamps: true });
```

---

## 5. Key Features & Components

### 🛒 Public Storefront
-   **Home (`Home.jsx`)**: proper "Master Edition" grid displaying top exclusive products.
-   **Product Details (`ProductDetails.jsx`)**: 
    -   Dynamic Image Gallery.
    -   "Pro Bundle" Logic: Automatically suggests a bundle (e.g., Manjha + Saddi) for savings.
    -   Stock status indicators (In Stock / Out of Stock).

### 👤 User Dashboard
-   **Dashboard (`Dashboard.jsx`)**: 
    -   Displays "Master Edition" gear.
    -   Quick access to "Collections", "Order History", and "Profile".
    -   Personalized Welcome Message.

### 🛡️ Admin Panel
-   **Add Product (`AddProduct.jsx`)**: 
    -   Supports File Upload (Multipart Form Data).
    -   Checkbox for `Mark as Master Edition` (sets `isExclusive`).
    -   Category selection (Kites, Manjha, Saddi, Accessories).
-   **Analytics (`AdminDashboard.jsx`)**: 
    -   Revenue charts, Order stats, and Excel Report downloads.
    -   Inventory Management.

---

## 6. API Reference (Summary)

### Public / User
-   `GET /api/user/products` - Fetch all products.
-   `GET /api/user/products/:id` - Fetch single product details.
-   `GET /api/search/products` - Search products with filters.
-   `POST /api/user/cart/add` - Add item (or bundle) to cart.
-   `POST /api/contact` - Submit contact form.

### Authentication
-   `POST /api/auth/login`
-   `POST /api/auth/register`
-   `POST /api/auth/forgot-password`

### Admin
-   `GET /api/admin/products` - List all inventory.
-   `POST /api/admin/New/products` - Create new product (Multi-part form).
-   `PUT /api/admin/products/:id` - Update product details.
-   `GET /api/admin/orders` - View all orders.
-   `PUT /api/admin/orderupdate/status/:id` - Update order status (Processing/Shipped/Delivered).
