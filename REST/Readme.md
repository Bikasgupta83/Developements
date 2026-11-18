# RESTful APIs & CRUD Operations

## 1. What is REST?

**REST (Representational State Transfer)** is an architectural style that defines a set of constraints for creating web services.

RESTful APIs allow clients and servers to communicate using HTTP methods to perform operations on resources.

### Key Concepts
- **Resource:** Data or objects managed by the server, such as posts, users, or products.
- **Endpoint:** A URL through which clients interact with resources.
- **HTTP Methods:** Define the operation to perform on a resource.
- **Stateless:** Each request contains the information required to process it.

---

## 2. CRUD Operations

CRUD stands for Create, Read, Update, and Delete. These are the four basic operations performed on data.

| Operation | HTTP Method | Description |
|---|---|---|
| Create | POST | Creates a new resource. |
| Read | GET | Retrieves existing resources. |
| Update | PUT | Replaces an existing resource. |
| Update | PATCH | Partially updates an existing resource. |
| Delete | DELETE | Removes a resource. |

---

## 3. Creating RESTful APIs

RESTful APIs follow a consistent URL structure to perform CRUD operations.

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/posts` | Retrieve all posts. |
| POST | `/posts` | Create a new post. |
| GET | `/posts/:id` | Retrieve a specific post. |
| PATCH | `/posts/:id` | Update a specific post. |
| DELETE | `/posts/:id` | Delete a specific post. |

**Note:** The endpoint identifies the resource, while the HTTP method defines the operation.

---

## 4. Setting Up an Express Application

Express.js is a Node.js framework used to build web applications and APIs.

### Installing Dependencies

```bash
npm install express ejs uuid method-override
```

### Importing Modules

```javascript
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

const app = express();
const port = 8080;
```

### Configuring Middleware

```javascript
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));
```

**Explanation:**

- `express.urlencoded({ extended: true })`: Parses incoming form data and makes it available through `req.body`.
- `express.json()`: Parses incoming JSON request bodies.
- `app.set("view engine", "ejs")`: Configures EJS as the template engine.
- `app.set("views", ...)`: Specifies the directory containing EJS templates.
- `express.static()`: Serves static files such as CSS, JavaScript, and images.
- `methodOverride("_method")`: Allows HTML forms to simulate HTTP methods such as PUT, PATCH, and DELETE.

---

## 5. Understanding UUID

**UUID (Universally Unique Identifier)** is a unique identifier used to identify resources.

We use the `uuid` package to generate unique IDs for posts.

```javascript
const { v4: uuidv4 } = require("uuid");

const id = uuidv4();
```

Example output:

```text
550e8400-e29b-41d4-a716-446655440000
```

**Why UUID?**

- Provides unique identifiers for resources.
- Helps identify individual records.
- Avoids relying on array indexes for identifying posts.

---

## 6. Implementing CRUD Operations in Express

For practice, we created a simple Posts application where users can create, view, update, and delete posts.

### A. Initializing Posts

```javascript
let posts = [
    {
        id: uuidv4(),
        username: "bikas",
        content: "Learning REST API"
    },
    {
        id: uuidv4(),
        username: "Aakash",
        content: "Preparing Merchant Navy"
    }
];
```

Here, we are using an array to store posts temporarily.

Each post contains:
- `id`: Unique identifier.
- `username`: Name of the user.
- `content`: Post content.

**Note:** This is in-memory storage. Data will be lost when the server restarts.

### B. GET - Retrieve All Posts

```javascript
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});
```

- `app.get()` handles GET requests.
- `res.render()` renders an EJS template.
- `{ posts }` passes the posts array to the EJS file.

### C. GET - Display the New Post Form

```javascript
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});
```

Displays a form through which users can create a new post.

### D. POST - Create a New Post

```javascript
app.post("/posts", (req, res) => {
    const { username, content } = req.body;

    const id = uuidv4();

    posts.push({ id, username, content });

    res.redirect("/posts");
});
```

**Explanation:**

1. `req.body` retrieves the submitted form data.
2. `uuidv4()` generates a unique ID.
3. `posts.push()` adds the new post to the array.
4. `res.redirect()` redirects the user to the posts page.

### E. GET - Retrieve a Specific Post

```javascript
app.get("/posts/:id", (req, res) => {
    const { id } = req.params;

    const postFound = posts.find(
        (post) => post.id === id
    );

    res.render("show.ejs", { postFound });
});
```

**Important Concepts:**

- `req.params`: Retrieves dynamic values from the URL.
- `find()`: Returns the first element that matches the condition.
- `post.id === id`: Finds the post using its unique ID.

### F. GET - Display the Update Form

```javascript
app.get("/post/update/:id", (req, res) => {
    const { id } = req.params;

    const postFound = posts.find(
        (post) => post.id === id
    );

    res.render("update.ejs", { postFound });
});
```

Finds the selected post and displays its existing content in an update form.

### G. POST - Update an Existing Post

```javascript
app.post("/post/update/:id", (req, res) => {
    const { id } = req.params;
    const newContent = req.body.content;

    const postFound = posts.find(
        (post) => post.id === id
    );

    if (postFound) {
        postFound.content = newContent;
    }

    res.redirect("/posts");
});
```

**Explanation:**

1. Retrieves the post ID from `req.params`.
2. Retrieves the updated content from `req.body`.
3. Uses `find()` to locate the existing post.
4. Updates the content if the post exists.

**Note:** In this implementation, we are using POST for updating. In a RESTful API, PATCH or PUT would be more appropriate.

### H. DELETE - Remove a Post

```javascript
app.delete("/post/delete/:id", (req, res) => {
    const { id } = req.params;

    posts = posts.filter(
        (post) => post.id !== id
    );

    res.redirect("/posts");
});
```

**Explanation:**

- `filter()` creates a new array containing only the elements that satisfy the condition.
- `post.id !== id` keeps all posts except the one we want to delete.
- The updated array replaces the previous `posts` array.

---

## 7. Understanding Method Override

HTML forms natively support only GET and POST methods.

However, RESTful applications also use PUT, PATCH, and DELETE.

The `method-override` package allows us to simulate these HTTP methods through form submissions.

### Installation

```bash
npm install method-override
```

### Configuration

```javascript
app.use(methodOverride("_method"));
```

### Example: DELETE Form

```html
<form action="/posts/<%= post.id %>?_method=DELETE" method="POST">
    <button type="submit">Delete</button>
</form>
```

**How it works:**

1. The browser submits a POST request.
2. Method Override reads the `_method=DELETE` query parameter.
3. Express processes the request as a DELETE request.
4. The `app.delete()` route handles the request.

---

## 8. Important Express Request and Response Objects

| Property / Method | Description |
|---|---|
| `req.params` | Retrieves dynamic route parameters. |
| `req.body` | Retrieves submitted form or JSON data. |
| `req.query` | Retrieves query string parameters. |
| `res.send()` | Sends a response to the client. |
| `res.json()` | Sends a JSON response. |
| `res.render()` | Renders an EJS template. |
| `res.redirect()` | Redirects the client to another URL. |

### Example

```javascript
app.get("/users/:id", (req, res) => {
    console.log(req.params.id);
    res.send("User Details");
});
```

For the URL `/users/101`, `req.params.id` returns `"101"`.

---

## 9. Important JavaScript Array Methods Practiced

| Method | Description | Usage in Project |
|---|---|---|
| `push()` | Adds an element to the end of an array. | Creating posts. |
| `find()` | Returns the first matching element. | Finding a post by ID. |
| `filter()` | Creates a new array based on a condition. | Deleting posts. |

---

## 10. Project Structure

```text
REST/
│
├── public/
│   └── style.css
│
├── views/
│   ├── index.ejs
│   ├── new.ejs
│   ├── show.ejs
│   └── update.ejs
│
├── index.js
├── package.json
└── README.md
```
