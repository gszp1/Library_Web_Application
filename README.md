# Library Web Application #

## Overiew ##
Main goal of this project is to implement library web application which will allow users to search through library resoruces, create reservations for them, and manage these reservations. Application provides users with information about library resources.
### Used technologies ###

1. Java - Main backend language.
2. Spring Boot - Backend framework.
3. Hibernate - ORM framework for Java.
4. Gradle - Project build automation tool.
5. Swagger - Tool for building and documenting RESTful services.
6. PostgreSQL - Relational database management system.
7. React - Frontend framework.
8. Material UI - CSS/React framework.
   
### How to run ###

- Run user application: npm start

## Technical specifications

### Database ###
1. Tables
  - users (User entity) - information about users.
  - authors (Author entity) - information about resources authors.
  - roles (Role entity) - information about existing system roles. 
2. Relationships
  - users - roles (ManyToOne) - multiple users with given role, but one role per user.
   