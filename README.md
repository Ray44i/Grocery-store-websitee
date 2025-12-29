GreenKet – Online Grocery Store Web Application

GreenKet is a full-stack web-based online grocery store application developed as part of the Web Design and Programming course. The project demonstrates frontend development using React and Material UI, backend development using Spring Boot, and database integration using PostgreSQL.

The application allows users to browse grocery products, view featured and discounted items on the home page, and explore products by category. All product data is retrieved dynamically from the backend using RESTful APIs, ensuring that no data is hardcoded on the frontend.

Project Description

GreenKet is designed to simulate a real-world online grocery store experience. The system follows a layered architecture with a clear separation between frontend, backend, and database components. Product information is stored in a PostgreSQL database, processed by a Spring Boot backend, and presented to users through a React-based frontend.

The project focuses on applying modern web application design principles while strictly using the technologies required by the course.

Technologies Used
Frontend

React (JavaScript)

Material UI (MUI)

Axios for API communication

Backend

Spring Boot (Java)

RESTful API architecture

Maven for dependency management

Database

PostgreSQL

Managed using pgAdmin

SQL scripts for schema creation and sample data

Project Structure
SourceCode/
├── frontend/
│   ├── src/
│   ├── package.json
│   └── node_modules/
│
├── backend/
│   ├── src/
│   └── pom.xml
│
└── database/
    └── database.sql

How to Run the Project
Backend (Spring Boot)

Open the backend folder in IntelliJ IDEA

Ensure Maven dependencies are installed

Configure PostgreSQL connection settings if required

Run the Spring Boot application

The backend will start on:

http://localhost:8080

Frontend (React)

Open a terminal in the frontend folder

Install dependencies:

npm install


Start the application:

npm start


The frontend will run on:

http://localhost:3000

Database Setup

PostgreSQL is used as the relational database

Database schema and sample data are provided in the database.sql file

pgAdmin is used to manage the database

Tables store product information such as name, price, category, featured status, and discount details

Key Features

Dynamic grocery product listing fetched from the backend

Featured and discounted products displayed on the home page

Category-based product filtering

Reusable React components for product display

Modern and responsive user interface using Material UI

Loading skeletons for improved user experience

RESTful backend services implemented with Spring Boot

PostgreSQL database integration for persistent data storage

Course Information

Course: Web Design and Programming

Project Type: Individual Final Project

Student Name: Rabea Madrk

Student ID: 22040102132

License

This project is developed for educational purposes as part of a university course.