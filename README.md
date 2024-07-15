# Questionario FullStack Project

Welcome to the repository for my Questionario FullStack Project, integrating a React front-end with a Node.js and Express back-end. This README provides a detailed explanation of the application, its components, and how to get started.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Conclusion](#conclusion)

## Introduction

This application is focused for you create yours quiz and know what people will answer

## Technologies Used

### Frontend

- **Vite**: A build tool that boasts a faster and leaner development experience for modern web projects.
- **React**: A JavaScript library for building user interfaces. It allows us to create reusable UI components.
- **TypeScript**: A superset of JavaScript, offering static type-checking and the latest ECMAScript features.
- **TailwindCSS**: A utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center` and more to style your websites without leaving your HTML.
- **React-Router-Dom**: A routing library for React, enabling navigation among views.
- **Clerk**: User Management Platform

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **TypeScript**: Brings static typing to JavaScript, ensuring a more predictable runtime behavior.
- **Jest**: Used for writing unit and integration tests for the backend.
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **Prisma**: An ORM to help developing backends

## Installation

Before you start, ensure you have `node` and `npm` installed on your machine. 

1. **Clone the repository**:
   
   ```bash
   git clone https://github.com/gabrielkrapp/full-stack-template.git
   ```

2. **Navigate to the repository**:

   ```bash
   cd questionario
   ```

3. Set enviroment variables
  1. GoCreate a .env file inside questionarioBack and create a .env file inside of questionarioFront 
      ```
        cd questionarioBack && create .env
      ```
       ```
        cd questionarioFront && create .env
      ```

      
  2. At the questinarioFront make 2 variables
     ```
     API_LINK= Put the link of the backend for exammple hhtp://localhost:8080
     VITE_CLERK_PUBLISHABLE_KEY= Here you need to create an account on Clerk and put your publishablekey
     ```
  3. At the questionarioBack make 1 variable
     ```
     DATABASE_URL= Here you need to put you link for your PostgresSQL data
     ```

5. **Install the dependencies**:

   - For Frontend:
   
     ```bash
     cd questionarioFront && npm install
     ```

   - For Backend:

     ```bash
     cd questionarioBack && npm install
     ```

## Running the Application

- **To run the frontend**:

  ```bash
  npm run dev
  ```

  This starts the React application on `http://localhost:5173` (or another available port).

- **To run the backend**:

  ```bash
  npm run dev
  ```

  This initializes the Express server, typically on `http://localhost:8080`.


Ensure that the frontend and backend are configured to run on separate ports to avoid conflicts.

## Conclusion

Hope you like my project please tell me anything i can improve on it. See ya

---

**Made with ❤️ by [Mario Mota](https://github.com/yuribodo)**.
