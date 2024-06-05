# Library Web Application #

## Overiew ##

Main goal of this project is to implement library web application which will allow users to search through library resoruces, create reservations for them, and manage these reservations. Application provides users with information about library resources.

### Used technologies ###

1. Java - Main backend language.
2. Spring Boot - Backend framework.
3. Hibernate - ORM framework for Java.
4. Gradle - Project build automation tool.
5. Lombok - Java library.
6. Swagger - Tool for building and documenting RESTful services.
7. PostgreSQL - Relational database management system.
8. React - Frontend framework.
9. Material UI - CSS/React framework.
10. JSON Web Token.

### How to run ###

- Run user application: npm start

### Possible run problems and solutions ###

- react-scripts: command not found -> enter frontend directory and run: **npm install**
  
## Technical specifications ##

### Database ###

1. Database Name

   - library_db - connection parameters specified in application.yml file:

   ```yaml
   spring:
   application:
      name: backend
   jpa:
      database: postgresql
      open-in-view: false
      show-sql: false
      hibernate:
         ddl-auto: create-drop
      properties:
         hibernate:
         format_sql: true
      database-platform: org.hibernate.dialect.PostgreSQLDialect
   datasource:
      url: jdbc:postgresql://localhost:5432/library_db
      username: postgres
      password: postgres
      driver-class-name: org.postgresql.Driver
   server:
   port: 9090
   ```

2. Tables (Entity)

   - users (User) - information about users.
   - authors (Author) - information about resources authors.
   - roles (Role) - information about existing system roles.
   - publishers (Publisher) - publishers information.
   - resources (Resource) - information about given library resource, e.g. given book.
   - resources_instances (ResourceInstance) - information about resources instances.
   - authors_resources (AuthorResource) - join table for authors - resources relationship.

3. Relationships

   - users - roles (ManyToOne) - multiple users with given role, but one role per user.
   - authors - resources (ManyToMany) - multiple authors could partake in creation of given reosurce, and given author could create many resources.
   - resources - publishers (ManyToOne) - resource can have only one publisher, but given publisher can publish many resources.

### Frontend ###

1. Pages

   - Home page - first page that is loaded for user. Contains basic data.
   - Contact page - Page contains data about library like phone number, time when library is open.
   - Resources page - contains list of resources that user can search through.
   - Account page - contains data about currently logged in user.
   - Admin page - exclusive with account page, accessible only by administrator account, gives access to admin tools in admin panel.
