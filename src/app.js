const path = require('path');
const http = require('http');
const express = require('express');
const session = require('express-session');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const methodOverride = require('method-override');

require('dotenv').config();

// Initialization
const app = express();

// Server
const port = (process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`\\*-------------------------*\\`);
    console.log(`Server running in ${port} port`);
    console.log(`\\*-------------------------*\\`);
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'contactsapp',
    resave: true,
    saveUninitialized: true
}));
app.use(methodOverride('_method'));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

// Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const contactsRouter = require('./routes/contacts');

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts', contactsRouter);

// Locals
app.locals.contactsApp = 'Contacts App';

// Global
app.use( (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    res.status(err.status || 500);
    res.end();
});