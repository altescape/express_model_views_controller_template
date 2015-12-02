
VANILLA EXPRESS APP WITH MVC
============================

Run
---

0. First of all run ` npm update `

0. Then run ` bower install `

0. Open a console window and run ` nodemon ` 

0. Open another console window and run ` grunt `

0. Navigate to [localhost:3000](http://localhost:3000) in your browser and enable live reload if you have it installed. 

---



Working
-------

Grunt will watch for any changes to your stylus or javascript files and rebuild the css files automatically.

Nodemon will watch for any core file changes and will restart the server.

Enabling Live Reload in your browser takes care of refreshing.

-------



File Structure
--------------

```
.
├── bin           // - holds the www or local file to start the app from
├── config        // - config files
├── controllers   // - controllers, see #controllers
├── models        // - models, see #models
├── public        // - all public facing files like css, javascript, images, icons, fonts, etc
├── routes        // - routes, see #routes
└── views         // - jade (if used) files, see #views

```

--------------



Controllers
-----------

Note the naming convention.

```
controllers
├── admin.server.controller.js
├── entries.server.controller.js
├── index.server.controller.js
└── users.server.controller.js
```

-----------



Models
------

These are included Mongo Mongoose Schemas.

```
models
├── entry.server.model.js
└── users.server.model.js
```

------



Routes
------

Route files hold the routes to actions, see below for an example.

```
routes
├── admin.js
├── core.js
├── index.js
└── users.js
```

**Example route file**

```JavaScript
app.route('/register')
  .get(users.register)
  .post(users.createUser);
```
an example with middleware...

```JavaScript
app.route('/entries')
  .get(admin.isRequired, admin.entries);
```

------



Views
-----

Layout holds the overall html wrapper, error and index template is supplied.

The pages sub-directory can hold child directories also.

The partials sub-directory is for repeated blocks of code.

```
views
├── pages
├── partials 
├── error.jade
├── index.jade
└── layout.jade
```

-----
