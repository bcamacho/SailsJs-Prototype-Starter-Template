# Sails.js Starter template with session based authentication

a [Sails](http://sailsjs.org) Starter template application.
This starter application is configured with local and Google authentication providers utilizing passport.js middleware.

## Architecture

Sails.js application with passport.js, a node application with express middleware.

### Node.js

Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

[Learn more about Node.js here] (https://nodejs.org/en/)

#### New to Node? No problem.

In order to install Sails starter template, you’ll first need to install Node.js. Node is supported on most major operating systems, including MacOSX, Windows, and many flavors of Linux. Their website has pre-built installers for plenty of platforms, so you can just hop on over to the [downloads section of nodejs.org](https://nodejs.org/en/download/) and choose the one that’ll work for you.


### Sails.js

Build practical, production-ready Node.js apps in a matter of weeks, not months.
Sails is the most popular MVC framework for Node.js, designed to emulate the familiar MVC pattern of frameworks like Ruby on Rails, but with support for the requirements of modern apps: data-driven APIs with a scalable, service-oriented architecture.

[Learn more about Sails.js] (http://sailsjs.com/)

Sails.js is fairly simple to configure using npm.

To install Sails:

''' $ npm install sails -g '''

To get started, clone this repo locally.

### Passport.js

Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more.

[Learn more about passport.js] (http://passportjs.org/)

For our project we will use Google OAuthe authentication for passport.js:

Google OAuth2 authentication for passport, [Learn more](https://github.com/jaredhanson/passport-google-oauth2)

## About this branch

We are taking advantage of services, basically libraries which can be called from anywhere in the application. For this application we will depend on passport.js to handle our authentication needs. We will use passport.use() to find the user by the given email and then compares the provided password to its hash using bcrypt (User.findOne() comes in-build with the Waterline ORM used by Sails.js).

There are two authentication methods configured, local and Google. Local authentication will authenticate users by their email address combined with their password. Google authentication will verify user, search through local database to see if user already exists. If account does not exist we will create a new one :)

api/services/passport.js

Sails.js is great for rapid prototyping. However, for this application we configured sails.js with manual routes. Routes are configured with a controller to handle the requests.

config/routes.js

For Authentication we created AuthController.js. We will handle several methods to assist authentication with external providers, in our case it's Google. First we need to make a request to authenticate followed by a callbackURL to process user.

api/controllers/AuthController.js

## Register new user
You will need the following payload information:
- user email address
- user password
- user role (admin, user, manager, ect...)

``` 
curl -X "POST" "http://[IP_ADDRESS]:1337/user"   \
-H "Content-Type: application/json"      \
-d $'{ 
  "email": "[EMAIL_ADDRESS]",
  "role": "[ROLE]",
  "password": "[PASSWORD]"
}'
 ```
## Login
You will need the following payload information:
- user email address
- user password
```
curl -X "POST" "http://[IP_ADDRESS]:1337/login" \
     -H "Content-Type: application/json" \
     -d $'{
  "email": "[EMAIL_ADDRESS]",
  "password": "[PASSWORD]"
}'
```

## Get user details
You will need the following payload information:
- User ID
- Cookie
```
curl -X "GET" "http://[IP_ADDRESS]:1337/user/1" \
     -H "Cookie: sails.sid=s%3AR2oQ...."
```

## Authenticate with Google
get http://[IP_ADDRESS]/google
