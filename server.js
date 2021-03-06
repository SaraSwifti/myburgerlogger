// Import routes and give the server access.
const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();

const routes = require('./controllers/burgers_controller');

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
const exphbs = require('express-handlebars');

//boiler plate for using handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.use(routes);

// Start of server to begin listening to client requests.
app.listen(PORT, function() {
  console.log(`Server listening on: http://localhost:${PORT}`)
});