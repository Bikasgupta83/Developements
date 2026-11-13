# EJS (Embedded JavaScript)

**Documentation:** https://ejs.co/

## 1. What is EJS?

EJS (Embedded JavaScript) is a simple templating engine that allows us to generate dynamic HTML pages using JavaScript.

It allows us to embed JavaScript code inside HTML using special EJS tags.

**Why do we use EJS?**
- To create dynamic HTML pages.
- To pass data from the Express server to HTML pages.
- To display dynamic content using variables and loops.
- To reuse common HTML components using partials.
- To reduce code duplication.

## 2. Installing EJS

Install EJS using npm:

```bash
npm install ejs
```

Configure EJS in Express:

```js
app.set("view engine", "ejs");
```

By default, Express looks for EJS files inside the `views` directory.

To specify a custom views directory:

```js
const path = require("path");

app.set("views", path.join(__dirname, "views"));
```

## 3. EJS Syntax

EJS provides special tags to execute JavaScript and display dynamic content.

### A. Output Tag `<%= %>`

Used to display the value of a JavaScript expression in HTML.

It automatically escapes HTML characters to prevent unwanted HTML injection.

**Syntax:**

```ejs
<%= expression %>
```

**Example:**

```ejs
<%
    let name = "Bikas";
%>

<h1>Hello <%= name %></h1>
```

**Output:**

```html
Hello Bikas
```

### B. Scriptlet Tag `<% %>`

Used to execute JavaScript code without directly displaying its result in HTML.

Commonly used for:
- Loops
- Conditional statements
- Variable declarations
- JavaScript logic

**Syntax:**

```ejs
<% JavaScript code %>
```

**Example:**

```ejs
<%
    let age = 22;
%>

<% if (age >= 18) { %>
    <h2>You are eligible</h2>
<% } else { %>
    <h2>You are not eligible</h2>
<% } %>
```

### C. Unescaped Output Tag `<%- %>`

Used to display unescaped HTML content.

Unlike `<%= %>`, it does not escape HTML characters.

**Syntax:**

```ejs
<%- expression %>
```

**Example:**

```ejs
<%
    let html = "<h1>Hello Bikas</h1>";
%>

<%- html %>
```

**Output:**

A heading displaying `Hello Bikas`.

**Important:** Use this tag carefully because untrusted HTML can introduce Cross-Site Scripting (XSS) vulnerabilities.

## 4. Passing Data from Express.js to EJS

Express provides the `res.render()` method to render an EJS template and pass data to it.

**Syntax:**

```js
res.render("filename", { key: value });
```

**Example (index.js):**

```js
app.get("/", (req, res) => {
    let name = "Bikas";
    let age = 22;

    res.render("home", {
        name: name,
        age: age
    });
});
```

**Example (home.ejs):**

```ejs
<h1>Name: <%= name %></h1>
<p>Age: <%= age %></p>
```

**Explanation:**
- `res.render()` renders the specified EJS file.
- The second argument is an object containing data.
- The object properties become accessible as variables inside the EJS template.

## 5. EJS Loops

EJS allows us to execute JavaScript loops inside HTML templates.

Loops are useful when displaying multiple records, products, users, or posts.

### A. For Loop

**Syntax:**

```ejs
<% for (let i = 0; i < array.length; i++) { %>
    <%= array[i] %>
<% } %>
```

**Example:**

```ejs
<%
    let items = ["Apple", "Ball", "Cat"];
%>

<ul>
    <% for (let i = 0; i < items.length; i++) { %>
        <li><%= items[i] %></li>
    <% } %>
</ul>
```

### B. For...of Loop

Used to iterate directly over the values of an array.

**Syntax:**

```ejs
<% for (let item of array) { %>
    <%= item %>
<% } %>
```

**Example:**

```ejs
<%
    let items = ["Apple", "Ball", "Cat"];
%>

<ul>
    <% for (let item of items) { %>
        <li><%= item %></li>
    <% } %>
</ul>
```

**Difference:**
- `for` loop: Provides access to the array index.
- `for...of` loop: Directly provides each array element.

## 6. EJS Conditional Statements

Conditional statements allow us to display different HTML content depending on a condition.

**Example:**

```ejs
<%
    let age = 20;
%>

<% if (age >= 18) { %>
    <h2>Eligible</h2>
<% } else { %>
    <h2>Not Eligible</h2>
<% } %>
```

We can use:
- `if`
- `else`
- `else if`
- `switch`

## 7. Express Static Middleware

Static middleware is used to serve static files such as CSS, JavaScript, images, and other assets.

**Syntax:**

```js
app.use(express.static("public"));
```

**Example folder structure:**

```text
project/
│
├── index.js
│
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── images/
│       └── logo.png
│
└── views/
    └── home.ejs
```

**HTML usage:**

```html
<link rel="stylesheet" href="/css/style.css">

<script src="/js/script.js"></script>

<img src="/images/logo.png" alt="Logo">
```

**Explanation:**

Express makes files inside the `public` directory accessible to the browser without exposing the physical folder path.

## 8. EJS Partials (Reusable Components)

EJS partials allow us to create reusable sections of HTML and include them in multiple EJS files.

They help reduce code duplication and make applications easier to maintain.

Common examples:
- Navbar
- Footer
- Header
- Sidebar

**Example folder structure:**

```text
views/
│
├── home.ejs
├── about.ejs
│
└── includes/
    ├── navbar.ejs
    └── footer.ejs
```

**Example (footer.ejs):**

```html
<footer>
    <p>Copyright © 2026</p>
</footer>
```

**Including the partial in home.ejs:**

```ejs
<%- include("includes/footer.ejs") %>
```

**Explanation:**

- `include()` loads another EJS file.
- `<%- %>` renders the included HTML without escaping it.
- The same footer can be reused across multiple pages.

**Important:** A partial should generally contain only the reusable HTML component, not a complete HTML document with `DOCTYPE`, `html`, `head`, and `body` tags.

## 9. Dynamic Routing in Express.js

Dynamic routing allows us to create routes that accept variable values through URL parameters.

Instead of creating separate routes for every user, we can create one dynamic route.

**Syntax:**

```js
app.get("/users/:username", (req, res) => {
    const username = req.params.username;

    res.send(`Welcome ${username}`);
});
```

**Example URL:**

```text
http://localhost:8080/users/bikas
```

**Output:**

```text
Welcome bikas
```

### What is req.params?

`req.params` is an Express request object property used to access dynamic parameters defined in the URL.

**Example:**

```js
app.get("/ig/:username", (req, res) => {
    const { username } = req.params;

    res.send(username);
});
```

If the URL is `/ig/bikas`, then:

```js
username = "bikas";
```

**Use cases:**
- User profiles
- Product details
- Blog posts
- Category pages

## 10. Working with JSON Data

JSON (JavaScript Object Notation) is a lightweight data format used to store and exchange structured data.

We can use JSON files to store sample data and access it in Express applications.

**Example (data.json):**

```json
{
    "bikas": {
        "name": "bikas",
        "followers": 12000,
        "following": 500,
        "posts": []
    }
}
```

**Accessing JSON data in Express:**

```js
const instaData = require("./views/data.json");

app.get("/ig/:username", (req, res) => {
    const { username } = req.params;

    const data = instaData[username];

    if (data) {
        res.render("instagram", { data });
    } else {
        res.status(404).render("error");
    }
});
```

**Explanation:**
- `require()` imports the JSON file.
- `instaData[username]` accesses the matching user.
- `if (data)` checks whether the user exists.
- `res.render()` sends the data to the EJS template.
- `res.status(404)` sets the HTTP response status to Not Found.

## 11. EJS Template Engine with Express.js

Express integrates with EJS to generate dynamic HTML pages.

Important Express methods used with EJS:

| Method | Description |
|---|---|
| `app.set()` | Configures application settings |
| `app.get()` | Handles GET requests |
| `app.use()` | Registers middleware |
| `res.render()` | Renders an EJS template |
| `res.send()` | Sends a response to the client |
| `express.static()` | Serves static files |
| `app.listen()` | Starts the server |

**Example:**

```js
const express = require("express");
const path = require("path");

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("home");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
```

## 12. JavaScript Concepts Used in EJS

| Concept | Description |
|---|---|
| `charAt(0)` | Returns the character at a specified index |
| `toUpperCase()` | Converts a string into uppercase |
| `.length` | Returns the number of elements in an array or characters in a string |
| `toLocaleString()` | Formats a value according to locale conventions |
| `for...of` | Iterates over iterable values |
| `if...else` | Executes code based on conditions |
| `require()` | Imports modules or JSON files in CommonJS |
| `path.join()` | Joins path segments into a normalized path |

## 13. Important Interview Questions

1. What is EJS and why is it used?
2. What is the difference between `<%= %>`, `<%- %>`, and `<% %>`?
3. What is the purpose of `res.render()`?
4. How do you pass data from Express.js to EJS?
5. What are EJS partials?
6. Why do we use `include()` in EJS?
7. What is the difference between static and dynamic routing?
8. What is `req.params` in Express.js?
9. How can we iterate over an array inside an EJS file?
10. What is the purpose of `express.static()`?
11. What is the difference between `res.send()` and `res.render()`?
12. What is JSON and how can we access JSON data in Express?

## 14. Mini Project: Instagram Profile Page

**Project Description:**

Created a dynamic Instagram-style profile page using Express.js, EJS, Bootstrap, and JSON data.

**Features:**
- Dynamic username through URL parameters.
- Display profile information.
- Display followers, following, and post counts.
- Dynamically render posts using EJS loops.
- Display likes and comments for each post.
- Handle invalid usernames using an error page.
- Reusable footer using EJS partials.

**Technologies Used:**
- Node.js
- Express.js
- EJS
- HTML
- CSS
- Bootstrap
- JavaScript
- JSON

---

**Learning Resources:**

- EJS Documentation: https://ejs.co/
- Express.js Documentation: https://expressjs.com/