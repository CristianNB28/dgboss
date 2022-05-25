require('dotenv').config();
const express = require('express');
const app = express();
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const connection = require('./config/database');
const router = require("./src/routes/index.routes");
const cookieParser = require('cookie-parser');
const extendTimeout = require('./src/middlewares/extendTimeoutMiddleware');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())

app.use(session({
    secret:  process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/sistema',
        secure: false,
        maxAge:  6*60*60*1000 
    }
}));

let appendLocalsToUseInViews = (req, res, next) => { 
    res.locals.request = req;
    if(req.session != null && req.session.user != null){
        res.locals.user = req.session.user;
    }
    next(null, req, res);
};

app.use(appendLocalsToUseInViews);
app.use(extendTimeout);

app.use('/sistema', router);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views')

app.use(express.static(__dirname + '/src/public'));

app.listen(process.env.PORT || 3000, (req, res) => {
    console.log('Servidor funcionando')
});