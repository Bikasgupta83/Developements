# JavaScript – Object-Oriented Programming (OOPs)

# Frontend

---

## 1. GET & POST Requests

HTTP methods define the type of operation a client wants to perform on a server.

### GET Request

A GET request is used to retrieve or fetch data from a server.

**Features:**
- Data is commonly passed through URL query parameters.
- Data is visible in the URL.
- Has practical URL length limitations.
- Should not be used to modify server data.
- Can be cached by browsers and other intermediaries.

**Example:**

```js
fetch("/users?name=Bikas&age=22", {
    method: "GET"
});
```

**URL:**

```text
/users?name=Bikas&age=22
```

### POST Request

A POST request is used to submit data to a server, commonly to create a new resource or perform an operation.

**Features:**
- Data is commonly sent through the request body.
- Supports different data formats such as JSON, text, and form data.
- Data is not appended to the URL by default.
- Commonly used for registration, login, and form submissions.

**Example:**

```js
fetch("/users", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: "Bikas",
        age: 22
    })
});
```

**Difference between GET and POST:**

| GET | POST |
|---|---|
| Retrieves data | Submits data |
| Usually uses query parameters | Usually uses request body |
| Should not modify server state | Can modify server state |
| Can be cached | Not cached by default |
| Data visible in URL when passed as query parameters | Body data is not normally visible in URL |

**Note:** POST is not specifically for every Create/Write/Update operation. PUT and PATCH are also used for updating resources.

---

## 2. OOPs (Object-Oriented Programming)

OOPs is a programming approach that organizes code using objects.

Objects contain properties (data) and methods (functions).

**Why do we use OOPs?**
- To organize code.
- To improve code reusability.
- To make code easier to maintain.
- To represent real-world entities.
- To reduce code duplication.

**Important OOP concepts in JavaScript:**

1. Prototypes
2. Factory Functions
3. Constructor Functions
4. `new` Operator
5. Classes
6. Inheritance
7. `extends` and `super`

---

## 3. Object Prototypes

### Definition

Prototypes are the mechanism through which JavaScript objects inherit properties and methods from other objects.

Every JavaScript object has an internal `[[Prototype]]` link that points to another object or `null`.

Instead of creating separate copies of common methods for every object, JavaScript allows objects to access shared methods through the prototype chain.

### Important Prototype Properties

**1. `__proto__`**

It is a legacy accessor that allows us to access or modify an object's prototype.

```js
let arr = [1, 2, 3, 4];

console.log(arr.__proto__);
```

**2. `Array.prototype`**

It is the prototype object from which array instances inherit methods.

```js
console.log(Array.prototype);
```

**3. `String.prototype`**

It contains methods inherited by string objects.

```js
console.log(String.prototype);
```

### Example

```js
let arr = [1, 2, 3, 4];

arr.sayHello = () => {
    console.log("Arr hello");
};

arr.sayHello();
```

**Output:**

```text
Arr hello
```

Here, `sayHello()` is directly added to the `arr` object.

### Prototype Chain

When we access a property or method on an object, JavaScript first searches for it on that object.

If it doesn't find it, JavaScript searches its prototype, then the prototype's prototype, and continues until it finds the property or reaches `null`.

**Example:**

```js
let arr = [1, 2, 3];

console.log(arr.toString());
```

JavaScript searches:
1. `arr` object.
2. `Array.prototype`.
3. `Object.prototype`.
4. `null`.

**Important:**

- `__proto__` refers to an object's prototype.
- `Array.prototype` is the actual prototype object used by array instances.
- The prototype chain ends at `null`.

---

## 4. Factory Functions

### Definition

A Factory Function is a regular function that creates and returns objects.

It helps us create multiple objects with the same structure without manually creating each object.

### Syntax

```js
function FunctionName(parameters) {
    const object = {
        // properties
        // methods
    };

    return object;
}
```

### Example

```js
function PersonMaker(name, age) {
    const person = {
        name: name,
        age: age,

        talk() {
            console.log(`Hi, my name is ${this.name}`);
        }
    };

    return person;
}

const p1 = PersonMaker("Bikas", 22);
const p2 = PersonMaker("Akash", 25);

p1.talk();
p2.talk();
```

**Output:**

```text
Hi, my name is Bikas
Hi, my name is Akash
```

### Explanation

- `PersonMaker()` is a factory function.
- It accepts `name` and `age` as parameters.
- It creates a new person object.
- It returns the created object.
- We can create multiple objects by calling the same function.

### Advantages

- Easy object creation.
- Reusable code.
- No need to use the `new` operator.
- Can encapsulate private variables using closures.

**Important:** In this example, every created object gets its own `talk()` method. For shared methods, prototypes or classes are more memory-efficient.

---

## 5. Constructor Functions

### Definition

A Constructor Function is a regular JavaScript function used to initialize objects when called with the `new` operator.

It assigns properties to the newly created object using the `this` keyword.

**Naming Convention:**
- Constructor function names generally start with a capital letter.
- Constructor functions usually do not explicitly return an object.

### Example

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}

const p1 = new Person("Bikas", 22);
const p2 = new Person("Akash", 25);
```

### Explanation

- `Person()` is a constructor function.
- `this.name` assigns the name to the new object.
- `this.age` assigns the age to the new object.
- `new Person()` creates a new instance.

### Adding Methods Using Prototype

```js
Person.prototype.talk = function () {
    console.log(`Hi, my name is ${this.name}`);
};

p1.talk();
p2.talk();
```

**Output:**

```text
Hi, my name is Bikas
Hi, my name is Akash
```

**Why use `Person.prototype`?**

Instead of creating a separate `talk()` method for every object, we add it once to the prototype.

All instances can access the same method through the prototype chain.

---

## 6. New Operator

### Definition

The `new` operator creates a new object instance from a constructor function or class.

It automatically establishes the prototype relationship and initializes the new object.

### Syntax

```js
const object = new ConstructorFunction(arguments);
```

### Example

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}

const p1 = new Person("Bikas", 22);
```

### How does the `new` operator work?

When we use the `new` operator, JavaScript performs the following operations:

1. Creates a new empty object.
2. Links the new object's prototype to the constructor's `prototype`.
3. Calls the constructor function with `this` pointing to the new object.
4. Returns the new object automatically, unless the constructor explicitly returns another object.

**Conceptual example:**

```js
const p1 = new Person("Bikas", 22);
```

Internally, the process is conceptually similar to:

```js
const p1 = {};

Object.setPrototypeOf(p1, Person.prototype);

Person.call(p1, "Bikas", 22);
```

This is an explanation of the mechanism, not the exact internal JavaScript implementation.

**Important:** Constructor functions can also be called without `new`, but they may behave differently. Using `new` is necessary to create instances through the constructor pattern.

---

## 7. Classes

### Definition

Classes are templates for creating objects in JavaScript.

They provide a cleaner and more structured syntax for creating objects, defining constructors, and sharing methods through prototypes.

JavaScript classes use prototype-based inheritance internally.

### Syntax

```js
class ClassName {
    constructor(parameters) {
        // Initialize properties
    }

    methodName() {
        // Method logic
    }
}
```

### Example

```js
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    talk() {
        console.log(`Hi, I am ${this.name}`);
    }
}

const p1 = new Person("Bikas", 22);
const p2 = new Person("Akash", 24);

p1.talk();
p2.talk();
```

**Output:**

```text
Hi, I am Bikas
Hi, I am Akash
```

### Explanation

**1. `class Person`**

Creates a class named Person.

**2. `constructor()`**

A special method used to initialize properties when a new object is created.

**3. `this` keyword**

Refers to the current object instance.

**4. `talk()`**

A method shared through `Person.prototype`.

**5. `new` operator**

Creates an instance of the Person class.

### What is an Instance?

An instance is an individual object created from a class or constructor function.

```js
const p1 = new Person("Bikas", 22);
```

Here, `p1` is an instance of the `Person` class.

---

## 8. Inheritance

### Definition

Inheritance is an OOP concept that allows one class to acquire properties and methods from another class.

It helps us reuse existing code and avoid duplication.

**Important Terms:**

- Parent Class: The class whose properties and methods are inherited.
- Child Class: The class that inherits from another class.
- `extends`: Used to inherit from another class.
- `super`: Used to call the parent class constructor or access parent methods.

### Example

```js
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    talk() {
        console.log(`Hi, I am ${this.name}`);
    }
}

class Student extends Person {
    constructor(name, age, marks) {
        super(name, age);
        this.marks = marks;
    }

    study() {
        console.log(`${this.name} is studying`);
    }
}

const s1 = new Student("Bikas", 22, 85);

s1.talk();
s1.study();
```

**Output:**

```text
Hi, I am Bikas
Bikas is studying
```

### Explanation

**1. `extends`**

```js
class Student extends Person
```

The Student class inherits from the Person class.

**2. `super()`**

```js
super(name, age);
```

Calls the parent class constructor and initializes the inherited properties.

**3. Additional Properties**

```js
this.marks = marks;
```

The child class can have its own properties.

**4. Additional Methods**

```js
study() {
    console.log(`${this.name} is studying`);
}
```

The child class can define its own methods.

**Important:** When a child class has a constructor, it must call `super()` before accessing `this`.

---

## 9. Extends Keyword

### Definition

The `extends` keyword is used to create a child class that inherits from a parent class.

### Syntax

```js
class ChildClass extends ParentClass {
    // Child class properties and methods
}
```

### Example

```js
class Animal {
    eat() {
        console.log("Animal is eating");
    }
}

class Dog extends Animal {
    bark() {
        console.log("Dog is barking");
    }
}

const dog = new Dog();

dog.eat();
dog.bark();
```

**Output:**

```text
Animal is eating
Dog is barking
```

Here, the Dog class inherits the `eat()` method from Animal.

---

## 10. Super Keyword

### Definition

The `super` keyword is used inside a child class to call the parent class constructor or access methods from the parent class.

### A. Using super() to call the parent constructor

```js
class Person {
    constructor(name) {
        this.name = name;
    }
}

class Student extends Person {
    constructor(name, age) {
        super(name);
        this.age = age;
    }
}

const s1 = new Student("Bikas", 22);
```

### B. Using super to call parent methods

```js
class Person {
    talk() {
        console.log("Person is talking");
    }
}

class Student extends Person {
    talk() {
        super.talk();
        console.log("Student is talking");
    }
}

const s1 = new Student();

s1.talk();
```

**Output:**

```text
Person is talking
Student is talking
```

---

## 11. Difference Between Factory Functions, Constructor Functions and Classes

| Factory Function | Constructor Function | Class |
|---|---|---|
| Regular function | Regular function | Class declaration |
| Returns an object | Initializes an object | Creates object instances |
| Does not require `new` | Uses `new` | Uses `new` |
| Methods may be created per object | Methods can be shared through prototype | Methods are shared through prototype |
| Uses `return` | Usually no explicit return | Usually no explicit return |

---

## 12. Important JavaScript Concepts

| Concept | Definition |
|---|---|
| Object | Collection of properties and methods |
| Prototype | Object from which another object can inherit properties and methods |
| Prototype Chain | Chain of prototype links used for property lookup |
| Factory Function | Function that creates and returns objects |
| Constructor Function | Function used to initialize objects with `new` |
| `this` | Refers to the current execution context; in these examples, the current instance |
| `new` | Creates a new object instance |
| Class | Template for creating objects |
| Constructor | Special class method for initializing instances |
| Instance | Individual object created from a class or constructor |
| Inheritance | Mechanism for reusing properties and methods from another class |
| `extends` | Establishes class inheritance |
| `super` | Accesses the parent class constructor and methods |

---

## 13. Important Interview Questions

1. What is OOPs in JavaScript?
2. What are prototypes in JavaScript?
3. What is the prototype chain?
4. What is the difference between `__proto__` and `prototype`?
5. What is a factory function?
6. What is a constructor function?
7. What happens when we use the `new` operator?
8. What is the difference between factory functions and constructor functions?
9. What are classes in JavaScript?
10. What is an instance of a class?
11. What is inheritance?
12. What is the purpose of the `extends` keyword?
13. What is the purpose of the `super` keyword?
14. Why do we use `this` in JavaScript?
15. How are methods shared between class instances?

---

## 14. Practice Tasks

- Create a factory function for creating Car objects.
- Create a constructor function for creating Student objects.
- Add a method to a constructor's prototype.
- Create a Person class with name and age properties.
- Create an Employee class that inherits from Person.
- Use `super()` to initialize parent class properties.
- Override a parent class method inside a child class.
- Create multiple instances and compare their prototypes.

---

# Backend

## 1. GET Request

GET is an HTTP method used by clients to request data from a server.

**Example:**

```js
app.get("/users", (req, res) => {
    const { name } = req.query;

    res.send(`Welcome ${name}`);
});
```

**URL:**

```text
http://localhost:8080/users?name=Bikas
```

**Accessing query parameters:**

```js
req.query
```

## 2. POST Request

POST is an HTTP method used to submit data to a server through the request body.

**Example:**

```js
app.use(express.json());

app.post("/users", (req, res) => {
    const { name, age } = req.body;

    res.send(`Name: ${name}, Age: ${age}`);
});
```

**Request Body:**

```json
{
    "name": "Bikas",
    "age": 22
}
```

**Accessing request body:**

```js
req.body
```

## 3. Difference Between req.params, req.query and req.body

| Property | Purpose | Example |
|---|---|---|
| `req.params` | Gets dynamic URL parameters | `/users/:id` |
| `req.query` | Gets URL query parameters | `/users?name=Bikas` |
| `req.body` | Gets data sent in request body | JSON or form data |

**Example:**

```js
app.get("/users/:id", (req, res) => {
    console.log(req.params.id);
    console.log(req.query.name);
});
```

URL:

```text
/users/101?name=Bikas
```

Output:

```text
101
Bikas
```
