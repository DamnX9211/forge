 # Forge 🔥

A Production-Grade Backend Built from First Principles

Forge is not a tutorial project.
It is a backend system built step-by-step with real architectural discipline.

The goal of this project is to deeply understand backend engineering — not just build endpoints.

---

## 🚀 What Forge Is

Forge is a modular backend system built with:

* Node.js
* TypeScript (strict mode)
* Express
* SQLite (better-sqlite3)
* Zod (runtime validation)
* bcrypt (password hashing)
* JWT (authentication)
* Clean Architecture principles

The system is structured around proper backend boundaries:

* API Layer (HTTP translation only)
* Application Layer (use cases)
* Domain Layer (business rules)
* Infrastructure Layer (database, crypto, tokens)

Everything is separated intentionally.

---

## 🏗️ Architecture Principles Used

* Clean Architecture
* Domain-Driven Design (basic modeling)
* Repository Pattern
* Dependency Injection (manual container)
* Composition Root pattern
* Runtime validation + compile-time safety
* Structured error handling
* Token-based authentication with rotation

This is not framework-driven design.
It is system-driven design.

---

## ✅ Features Implemented So Far

### 1️⃣ Core Setup

* Strict TypeScript configuration
* Express app factory pattern
* Config layer with environment support
* Centralized error handling middleware

---

### 2️⃣ User Module

* Email value object (format enforcement)
* Password value object (length validation)
* User entity with controlled construction
* Repository abstraction
* SQLite repository implementation

---

### 3️⃣ Secure Registration

* Zod runtime validation
* Clean DTO separation
* Password hashing using bcrypt
* Dependency injection via container

---

### 4️⃣ Authentication System

* Login endpoint
* Secure password comparison
* JWT access tokens (15 minutes expiry)
* Auth middleware for protected routes
* `/users/me` protected endpoint

---

### 5️⃣ Refresh Token System

* Refresh token entity
* Refresh token repository
* DB storage for refresh tokens
* Token rotation (old token invalidated)
* Refresh endpoint
* Server-controlled session lifecycle

This allows:

* Revocation capability
* Controlled session management
* Protection against token replay

---

## 🔐 Current Auth Flow

1. Register user
2. Login → receive:

   * Access token
   * Refresh token
3. Use access token for protected routes
4. Use refresh token to rotate and obtain new tokens
5. Old refresh tokens are deleted automatically

This mirrors production-level auth systems.

---

## 📂 Folder Structure

```
src/
├─ api/
├─ application/
├─ domain/
├─ infrastructure/
├─ config/
├─ container.ts
├─ app.ts
└─ server.ts
```

Each layer has a single responsibility.

---

## 🧠 What This Project Teaches

* Why controllers must be thin
* Why domain should not know infrastructure
* Why runtime validation is mandatory
* Why `any` is dangerous
* How to design proper authentication
* How token rotation works
* How to structure a scalable backend
* How to think in boundaries, not files

This project focuses on engineering depth.

---

## 🔮 Future Improvements

Planned upgrades:

* Hashing refresh tokens before storing
* Device/session tracking
* Logout endpoint with full invalidation
* Role-Based Access Control (RBAC)
* Structured logging system
* Request ID tracing
* Rate limiting middleware
* Audit logging
* Production-ready environment configuration
* Improved error classification
* Access token blacklisting strategy
* Test suite (unit + integration)

---

## 🎯 Long-Term Vision

Forge will evolve into a backend template that includes:

* Secure authentication
* Clean architecture baseline
* Production-ready patterns
* Scalability mindset
* Security-first design

The goal is to build backend engineering intuition, not just APIs.

---

## ⚠️ Important Note

This project is intentionally built step-by-step.
Every feature was added only after understanding the underlying concept.

No scaffolding.
No hidden magic.
No copy-paste frameworks.

Everything is earned.

---

Forge is a system being forged — layer by layer.
