# Jwt-Auth-Project

A Spring Boot backend and React frontend for JWT-based authentication and role-based access control.

This project demonstrates a full-stack implementation of JSON Web Token (JWT) authentication. It allows users to register, receive a JWT, and access different parts of the application based on their assigned roles (Employee, Manager, HR, CEO). This is useful for understanding how to secure APIs and manage user permissions in a web application.

## Tech Stack

* **Backend:** Java, Spring Boot, Spring Security, PostgreSQL, JWT (jjwt library), Lombok, Maven
* **Frontend:** React, React Router DOM, Create React App

## Quick Start

### Backend

1. Ensure you have Java 17 and Maven installed.
2. Configure your PostgreSQL database connection in `Backend/src/main/resources/application.properties` or via environment variables (`DB_URL`, `DB_USERNAME`, `DB_PASSWORD`).
3. Run the Spring Boot application using Maven:
 ```bash
 cd Backend
 ./mvnw spring-boot:run
 ```
 The backend will typically run on port 8091.

### Frontend

1. Ensure you have Node.js and npm installed.
2. Install dependencies:
 ```bash
 cd Frontend
 npm install
 ```
3. Start the development server:
 ```bash
 npm start
 ```
 The frontend will typically run on port 3000 and proxy API requests to `http://localhost:8091`.

## Project Structure

```
.
├── Backend
│ ├── src
│ │ ├── main
│ │ │ ├── java
│ │ │ │ └── com
│ │ │ │ └── hcl
│ │ │ │ └── project
│ │ │ │ ├── configuration
│ │ │ │ ├── entity
│ │ │ │ ├── repository
│ │ │ │ ├── security
│ │ │ │ └── service
│ │ │ └── resources
│ │ │ └── application.properties
│ │ └── test
│ │ └── java
│ ├── mvnw
│ └── pom.xml
├── Frontend
│ ├── public
│ ├── src
│ │ ├── api
│ │ ├── Components
│ │ ├── App.css
│ │ ├── App.js
│ │ ├── App.test.js
│ │ ├── FloatingLines.js
│ │ ├── index.css
│ │ ├── index.js
│ │ ├── reportWebVitals.js
│ │ └── setupTests.js
│ ├── package.json
│ └── README.md
└── README.md
```

## Key Concepts

* **JWT Generation and Validation (`Backend/src/main/java/com/hcl/project/security/JwtUtil.java`):** This class handles the creation of JWTs upon successful user registration or login. It includes methods to generate tokens with user details and roles, and to validate incoming tokens.
* **JWT Filter (`Backend/src/main/java/com/hcl/project/security/JwtFilter.java`):** This filter intercepts incoming requests, extracts the JWT from the `Authorization` header, validates it using `JwtUtil`, and sets the authentication context for Spring Security if the token is valid.
* **Security Configuration (`Backend/src/main/java/com/hcl/project/security/SecurityConfig.java`):** This configuration class defines which endpoints are public and which require specific roles. It also configures Spring Security to be stateless and integrates the `JwtFilter` before the standard authentication filter.
* **Role-Based Access Control:** The backend endpoints are protected using Spring Security's role-based access control (`.hasAnyRole(...)`). The frontend components (`CeoPage.js`, `HrPage.js`, etc.) also implement client-side checks using the `useAuth` hook to ensure users only see pages they are authorized for.
* **Frontend Authentication Context (`Frontend/src/Components/AuthContext.js`):** This React Context provides a global state for user authentication. It stores user details and the JWT, manages token expiration using `setTimeout`, and persists user data in `localStorage`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
