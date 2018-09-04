const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

// Connected to the middleware folder
const checkForSession = require('./middlewares/checkForSession');

// Connected to the Controllers file
const swag_controller = require('./controllers/swag_controller');

const app = express();

app.use( bodyParser.json() );
app.use( session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use( checkForSession );

// Swag controller
app.get( '/api/swag', swag_controller.read );

// Auth controller
app.post( '/api/login', auth_controller.login );
app.post( '/api/register', auth_controller.register );
app.post( '/api/signout', auth_controller.signout );
app.get( '/api/user', auth_controller.getUser );

// Cart 
app.post( '/api/cart', cart_controller.add );
app.post( '/api/cart/checkout', cart_controller.checkout );
app.delete( '/api/cart', cart_controller.delete );

// Search
app.get( '/api/search', search_controller.search );

const port = process.env.SERVER_PORT || 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );