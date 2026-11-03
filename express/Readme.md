# Library vs Framework

## Library
    A library is a collections of pre-written code that can we used to perform specific tasks.
    eg. axios

## Framework
    A framework is a set of pre-written code that provide the structure for developing software applications.
    eg. express

## Express
    A Node.js web application framework that help us to make web applicatios.
    It is used for server side programming.

## Express Uses
    1. Listen for incoming request.
    2. Parse data for Node.js
    3. to match response with routes
    4. send response


## Express setup cmd commands
    1. npm init
    2. npm install express

## Getting start with express
code
```
const express = require("express");
const app = express();
const port = 8080;

app.listen(port,()=>{
    console.log(`app listening at port ${port}`)
})
```

## ports
    Ports are a logical endpoints of a network connection that is used to exchange an information between web server and web client.

## HTTPS request formate
    Https send request in text based -> express parse it into object


## Sending response
```
app.use((req,res)=>{
    console.log("new incoming request");
    // res.send("this is your response"); //String res
    // res.send({    // json res
    //     name:"Bikas",
    //     age:22,
    // })
    // res.send('<h1>Some response</h1>') // html res
    res.send(`
        <h1> Fruits </h1>    
            <ul>
                <li>Mangi</li>
                <li>Apple</li>
            </ul>
    `)
})
```

## res.send()
    It uses to send an HTTP response back to the client.
    The body parameter can be a Buffer object, a String, an object, Boolean, or an Array. For example:
    
    res.send(Buffer.from('whoop'));
    res.send({ some: 'json' });
    res.send('<p>some html</p>');
    res.status(404).send('Sorry, we cannot find that!');
    res.status(500).send({ error: 'something blew up' });

        


# What is Routing?
**Routing** is the process of selecting a path for traffic in a network or across multiple networks. In web development (like Express.js), routing defines how an application's endpoints (URIs) respond to client requests.


## 1. Basic Routing Methods (GET)

The `GET` method is used to retrieve data from a server. Each route maps a URL path to a specific handler function.

```javascript
const express = require('express');
const app = express();

// Root / Home Route
app.get('/', (req, res) => {
    res.send("Home Page");
});

// About Us Route
app.get('/about', (req, res) => {
    res.send("About Us Page");
});

// Contact Route
app.get('/contact', (req, res) => {
    res.send("Contact Page");
});

// Wildcard Catch-All Route (404 Fallback)
// Note: Uses '/*splat' syntax compatible with Express v5 / path-to-regexp v8+
app.get('/*splat', (req, res) => {
    res.send(`
        <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #f9f9f9; font-family: sans-serif;">
            <div style="border: 1px solid #000; padding: 20px; text-align: center; background: #fff; border-radius: 8px;">
                <h1 style="margin: 0; color: #333;">Page not found</h1>
            </div>
        </div>
    `);
});
```



## 2. Express Route Parameters (Dynamic Routing)

Route parameters are **named URL segments** used to capture values at specific positions in the URL. Captured values are populated in the `req.params` object.

* **Syntax:** Prefixed with a colon (`:username`, `:id`)
* **Use Case:** Perfect for fetching specific resources dynamically (e.g., specific users, products, or posts).

```javascript
// Example URL: /user/alice
app.get('/user/:username', (req, res) => {
    const username = req.params.username;
    res.send(`Viewing profile of: ${username}`);
});

// Example URL: /book/99/chapter/3
app.get('/book/:bookId/chapter/:chapterNumber', (req, res) => {
    const { bookId, chapterNumber } = req.params;
    res.send(`Reading Book ID ${bookId}, Chapter ${chapterNumber}`);
});
```



## 3. Other Core HTTP Methods (CRUD Operations)

To build fully functional web applications or REST APIs, Express supports all standard HTTP verbs corresponding to CRUD (Create, Read, Update, Delete) behaviors:

### POST (Create)
Used to send data to the server to create a new resource. Data is typically sent in the request body (`req.body`).
```javascript
app.post('/api/users', (req, res) => {
    res.send("Successfully created a new user profile!");
});
```

### PUT (Update / Replace)
Used to send data to the server to update or completely replace an existing resource.
```javascript
app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User with ID ${userId} has been completely updated.`);
});
```

### DELETE (Delete)
Used to delete a specified resource from the server.
```javascript
app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User with ID ${userId} has been permanently deleted.`);
});
```



## 4. Handling Request Bodies (Built-in Middleware)

By default, Express cannot read incoming data strings in `req.body`. You must include built-in middleware parsing tools **before your routes** so Express can transform raw payload strings into structured JavaScript objects.

```javascript
// Paste these BEFORE your route definitions
app.use(express.json());                         // Parses incoming JSON bodies
app.use(express.urlencoded({ extended: true })); // Parses incoming URL-encoded form submissions

// Now req.body will evaluate correctly:
app.post('/login', (req, res) => {
    const { username, password } = req.body; 
    res.send(`Welcome, ${username}!`);
```



## 5. Organizing Routes via `Express.Router`

As your application grows, writing all routes inside `index.js` becomes chaotic. **`express.Router`** allows you to break your routing down into isolated files.

### Step A: Create a feature route file (e.g., `routes/userRoutes.js`)
```javascript
const express = require('express');
const router = express.Router(); // Create an isolated router instance

// Define paths relative to the base mounting path
router.get('/profile', (req, res) => {
    res.send('User Profile Dashboard');
});

router.get('/settings', (req, res) => {
    res.send('User Account Settings');
});

module.exports = router; // Export the router object
```

### Step B: Mount the router in your main application (`index.js`)
```javascript
const express = require('express');
const app = express();
const userRouter = require('./routes/userRoutes');

// Mount router under a parent base namespace path
app.use('/users', userRouter); 

// The routes are now exposed dynamically:
// GET /users/profile -> returns 'User Profile Dashboard'
// GET /users/settings -> returns 'User Account Settings'
```
