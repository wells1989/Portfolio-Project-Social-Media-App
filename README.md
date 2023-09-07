# Socialmedia

This project was a more complex full stack social media application, using the MERN stack along with several front-end and back-end technologies / methods

## Installation

### API (server folder)

```bash
cd api
npm install
npm start
```
#### Package.json

```javascript
  "dependencies": {
    "bcrypt": "^5.1.1",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "gridfs-stream": "^1.1.1",
    "helmet": "^7.0.0",
    "jsonwebtoken": "^9.0.1",
    "mongoose": "^7.4.5",
    "morgan": "^1.10.0",
    "multer": "^1.4.4",
    "multer-gridfs-storage": "^5.0.2"
  },
  "name": "server",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js"
  },

```

### React UI (client folder)

```bash
cd client
npm install
npm start
```
#### Package.json

``` javascript

  "dependencies": {
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^5.14.6",
    "@mui/material": "^5.14.6",
    "@reduxjs/toolkit": "^1.9.5",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "dotenv": "^16.3.1",
    "formik": "^2.4.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-dropzone": "^14.2.3",
    "react-redux": "^8.1.2",
    "react-router-dom": "^6.15.0",
    "react-scripts": "5.0.1",
    "redux-persist": "^6.0.0",
    "web-vitals": "^2.1.4",
    "yup": "^1.2.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },

```

### API Routes:

#### Auth routes: http://localhost:3000/auth
```javascript
POST: "/login"
POST: "/register"
```

#### Post routes: http://localhost:3001/posts/
```javascript
GET: "/"
GET: "/:userId/posts" (returns posts filtered by user)
GET: "/search/:key" (returns posts based on a search parameter)
PATCH: "/:id/like" (adds / removes likes)
DELETE: "/delete/:id" (deletes the post)
POST: "/comments/:id" (adds a comment)
DELETE: "/comments/:id" (deletes a comment)
```
#### User routes: http://localhost:3001/users/
```javascript
GET: "/:id" (returns specific user)
GET: "/:id/friends" (gets user friend list)
PATCH: "/:id/:friendId" (adds or removes friend from the friend list)
```
## Features / pages

### Register / log in pages

![Screenshot (346)](https://github.com/wells1989/Full-stack-blog/assets/122035759/c13b75ee-d7eb-4605-9f3a-bd383785aa35)

![Screenshot (347)](https://github.com/wells1989/Full-stack-blog/assets/122035759/9fa7cf81-1e59-4f6b-856b-50d3218c5893)

### HomePage

![Screenshot (356)](https://github.com/wells1989/Full-stack-blog/assets/122035759/6b52fd0a-6d25-4776-854b-412b1aa6597e)

![Screenshot (349)](https://github.com/wells1989/Full-stack-blog/assets/122035759/bc85e544-e975-4472-8df7-f50abb494588)

![Screenshot (352)](https://github.com/wells1989/Full-stack-blog/assets/122035759/b1687937-dbd8-42ab-84b2-c27e2028d3ea)

### ProfilePage

![Screenshot (350)](https://github.com/wells1989/Full-stack-blog/assets/122035759/4fae4ea1-6b21-45a1-823a-8b774b396771)

![Screenshot (353)](https://github.com/wells1989/Full-stack-blog/assets/122035759/fdeac80c-9999-474a-97d9-bd10a0defe13)

### SearchPage

![Screenshot (351)](https://github.com/wells1989/Full-stack-blog/assets/122035759/f229793c-6e0f-47aa-bb43-843739b16d11)

![Screenshot (354)](https://github.com/wells1989/Full-stack-blog/assets/122035759/29467ca6-29de-49c6-a422-a223fae022bb)

## Personal Notes

This was a much more complex front-end than my previous projects, so for some of the feature I used some online tutorials to format the correct syntax

### Project Goals

- Get more comfortable with react components and both front and back end authentication
- Introduce more features than my last project, making the website more interactive with multiple pages etc
- Create more API calls from the front-end (likes / comments / searches etc)

### Successes

- The use of Redux store made the authentication process on the front end much more straight-forward and simple, and authentication took place both in the back and front end.

- The use of multiple reusable components / widgets made the multi-page structure much quicker and consistent.

- Other styling aspects (useTheme / light and dark modes / the user and post widgets with ternary statements based on mediaQueries) made the site much more visually appealing

### Areas to work on for next time

- Some aspects of the site were hardcoded (e.g. the advert Widget / the search term to determine the SearchPage.) Instead of this, I could have anticipated this and built the site in a more condusive way to conduct searches using the state.searchTerm
- The comments delete button didn't filter for user, due to the initial Schema of the post.comments array. Next time I will take more time in thinking about the final functionality when designing the API to ensure tweaks like this do not re-occur.






