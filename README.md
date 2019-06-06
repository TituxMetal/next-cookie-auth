# Next Cookie Auth

A cookie authentication app using Next.js and Docker.

## Api

Built with Express, mongoose, Jsonwebtoken, Express-session and Redis, including validation with Joi.

## Front-end

Built with React using React Hooks and React Context, styled with Styled Components.

# Spec

| Task                                    | Status | Done                      |
| --------------------------------------- | ------ | ------------------------- |
| Register user                           | Done   | <ul><li> - [x] </li></ul> |
| Login user                              | Done   | <ul><li> - [x] </li></ul> |
| Logout user                             | Done   | <ul><li> - [x] </li></ul> |
| Show the logged in user profile         | Done   | <ul><li> - [x] </li></ul> |
| Edit the current logged in user profile | Done   | <ul><li> - [x] </li></ul> |
| Delete the current logged in user       | To do  | <ul><li> - [ ] </li></ul> |

# Api endpoints

## Register user

POST /api/users/register

- Payload: { name, email, password }
- Return: { User, success: true || false }

## Login user

POST /api/users/login

- Payload: { email, password }
- Return: { User, success: true || false }

## Check if user is authenticated

GET /api/users/me

- Headers: (optional) Authorization: Bearer token OR cookie
- Return: { user: User || false, success: true || false }

## Edit user fileds

PATCH /api/users/me

- Headers: (optional) Authorization: Bearer token OR cookie
- Payload: (optional) { name, email, password }
- Return: { user: User, success: true || false }

## Logout user

POST /api/users/me

- Headers: (optional) Authorization: Bearer token OR cookie
- Return: { success: true || false }

## Delete user

DELETE /api/users/me

- Headers: (optional) Authorization: Bearer token OR cookie
- Return: { success: true || false }

# Usage

Clone this repository with `git clone https://github.com/TituxMetal/next-cookie-auth.git` and install dependencies `yarn install`.

## Run the app

Make sure to setup all the variables in a dev.env file or in environment variables. See env.sample file for more information.

If you have Docker installed run `yarn docker:mongo` to start a mongodb container named mongoDev and `yarn docker:redis` to start a redis container named redisDev.

- in dev mode with `yarn dev` and open http://localhost:3000 in your browser.
- in production mode with `yarn build && yarn start` and open http://localhost:3000 in your browser

## Run the app with Docker

Build the Docker image with `docker build -t next-cookie-auth .` then run `docker run -d --rm --name cookie-auth -p 80:3000 --link mongoDev:mongo next-cookie-auth` and open http://localhost in your browser.

Or simply pull the image from the docker hub with `docker pull tuximetal/next-cookie-auth:latest` and run it with `docker run -d --rm --name next-cookie-auth -p 80:3000 --link mongoDev:mongo -e MONGO_URI=mongodb://mongo:27017/next-cookie-auth tuximetal/next-cookie-auth:latest` and open http://localhost in your browser.
