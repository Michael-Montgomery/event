# EasyVent Backend

This repository is the backend for *EasyVent*, a super-charged event management application built using NodeJS, Express and MongoDB among other technologies.

## Starting the Application

To start the server, ensure that MongoDB is installed and running on your machine. Enter the following command to start the server:

`npm i`

`npm start`

Once you recieve confirmation that the server is running, you may use a tool such as Postman or Insomnia to interact with the database using the following endpoints:

# User Routes:

| Request Type | Endpoint | Description |
| ----------- | ----------- | ----------- |
| GET | /users | returns all users |
| GET | /Users/:id | returns single user record matching ID |
| POST | /users | Create new user record |
| PUT | /users/:id | updates user record matching the ID |
| DELETE | /users/:id | returns single user record matching ID |




# Event Routes:

| Request Type | Endpoint | Description |
| ----------- | ----------- | ----------- |
| GET | /events | returns all users |
| GET | /events/:id | returns single user record matching ID |
| POST | /events | Create new user record |
| PUT | /events/:id | updates user record matching the ID |
| DELETE | /events/:id | returns single user record matching ID |
| POST | /events/:id/attendees/add | adds attendees to event matching ID |
| POST | /events/:id/eventadmins/add | adds admins to event matching ID |
