# 🌅 Sunrise Interiors – Furniture & Interior Design Website

A modern full-stack web application developed for Sunrise Interiors to showcase furniture collections, interior design services, completed projects, and company information. The platform also enables customers to request consultations and quotations, while providing administrators with a secure dashboard to efficiently manage products, projects, and customer inquiries.

---

## ✨ Features

- 🏠 Modern and responsive website design
- 🛋️ Furniture catalog with categories
- 🎨 Interior design project showcase
- 📸 Gallery of completed work
- 📝 Online consultation booking
- 💰 Quote request system
- 📞 Contact form
- 👤 Customer registration & login
- 🔐 Secure Admin authentication using JWT
- ⚙️ Admin dashboard for managing products, projects, quotes, consultations, and contact requests

---

# 🛠️ Technology Stack

| 💻 Layer | 🚀 Technology | 📌 Usage |
|----------|--------------|-----------|
| 🎨 Frontend | HTML5, CSS3, JavaScript | Builds the user interface and handles interactions |
| ⚙️ Backend | Node.js, Express.js | Runs the server and provides REST APIs |
| 🗄️ Database | MongoDB, Mongoose | Stores and manages application data |
| 🔒 Authentication | JWT, bcryptjs | Secure login and password encryption |
| ⚙️ Configuration | dotenv, CORS | Environment variables & frontend-backend communication |
| 🌱 Version Control | Git & GitHub | Team collaboration and version tracking |

---

# 📁 Project Structure

```text
Sunrise_Interiors/
├── 📄 index.html
├── 📄 about.html
├── 📄 services.html
├── 📄 products.html
├── 📄 gallery.html
├── 📄 projects.html
├── 📄 contact.html
├── 📄 quote.html
├── 📄 consultation.html
├── 📄 login.html
├── 📄 signup.html
├── 📄 admin-login.html
├── 📄 user-login.html
├── 📄 service-details.html
│
├── 📂 admin/                 # Admin dashboard pages
│
├── 📂 backend/
│   ├── 📂 models/            # MongoDB models
│   ├── 📂 routes/            # Express API routes
│   ├── 📂 middleware/        # Authentication middleware
│   ├── 📄 db.js              # Database connection
│   └── 📄 server.js          # Express server
│
├── 📂 css/                   # Stylesheets
├── 📂 js/                    # Frontend JavaScript
├── 📂 images/                # Website assets
└── 📄 README.md
```

---

# 🚀 API Endpoints

## 🟢 General APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` |  Checks if the backend is running |
| GET | `/api/test-db` |  Tests the MongoDB connection |

---

## 🔐 Authentication APIs

### 👨‍💼 Admin

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new admin |
| POST | `/api/auth/login` | Admin login & receive JWT token |

### 👤 Customer

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/users/register` | Register a customer |
| POST | `/api/auth/users/login` | Customer login & receive JWT token |

---

## 🛋️ Products APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/products` |  Get all products |
| GET | `/api/products/:id` |  Get a single product |
| POST | `/api/products` |  Add a product |
| PUT | `/api/products/:id` |  Update a product |
| DELETE | `/api/products/:id` |  Delete a product |

---

## 🏷️ Categories APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/categories` |  Get all categories |
| POST | `/api/categories` |  Add a category |
| PUT | `/api/categories/:id` |  Update a category |
| DELETE | `/api/categories/:id` |  Delete a category |

---

## 🏡 Projects APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/projects` |  Get all projects |
| GET | `/api/projects/:id` |  Get a project |
| POST | `/api/projects` |  Add a project |
| PUT | `/api/projects/:id` |  Update a project |
| DELETE | `/api/projects/:id` | Delete a project |

---

## 📞 Customer Requests APIs

### 📅 Consultation

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/consultations` | Submit a consultation request |
| GET | `/api/consultations` | Admin views consultation requests |
| PUT | `/api/consultations/:id` | Admin updates consultation status |

### 💰 Quote

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/quotes` | Submit a quote request |
| GET | `/api/quotes` | Admin views quote requests |
| PUT | `/api/quotes/:id` | Admin updates quote status |

### 📩 Contact

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/contacts` | Send a contact message |
| GET | `/api/contacts` | Admin views messages |
| PUT | `/api/contacts/:id` | Update message status |

---

## 📊 Dashboard API

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/dashboard/stats` | Returns total products, projects, consultations, quotes, and contact requests |

---

# 🔒 Authentication

Most **Admin APIs** are protected using **JWT (JSON Web Token)** authentication.

✅ Include the token in the request header:

```http
Authorization: Bearer <your-jwt-token>
```

---

# 👥 Team Collaboration

This project was developed collaboratively by **5 team members** using **Git** and **GitHub**.

✨ Team workflow included:

- 🌿 Feature branching
- 🔀 Pull Requests
- ✅ Code Reviews
- 📌 Issue Tracking
- 🤝 Merge Collaboration

---


# ⭐ Support

If you like this project, don't forget to give it a ⭐ on GitHub!

Happy Coding! 🚀