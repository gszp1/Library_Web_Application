FROM postgres:latest

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=postgres

COPY library_db.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
