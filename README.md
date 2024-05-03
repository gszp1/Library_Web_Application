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

### How to run ###

- Run user application: npm start

### Possible run problems and solutions ###

- react-scripts: command not found -> enter frontend directory and run: **npm install**
  
## Technical specifications ##

### Database ###

1. Database Name

   - library_db - connection parameters specified in application.properties file:

   ```yaml
    spring.application.name=backend
    spring.jpa.open-in-view=false
    spring.jpa.show-sql=false
    server.port=8080
    spring.datasource.url=jdbc:postgresql://localhost:5432/library_db
    spring.datasource.username=postgres
    spring.datasource.password=postgres
    spring.jpa.hibernate.ddl-auto=create-drop
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
