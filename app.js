require('dotenv').config();
const express = require('express');
const app = express();
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const connection = require('./config/database');
const router = require("./src/routes/index.routes");
const cookieParser = require('cookie-parser');
const fs = require('fs');
const util = require('util');

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

const appendLocalsToUseInViews = (req, res, next) => { 
    res.locals.request = req;
    if(req.session != null && req.session.user != null){
        res.locals.user = req.session.user;
    }
    next(null, req, res);
};

app.use(appendLocalsToUseInViews);

app.use('/sistema', router);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views')

app.use(express.static(__dirname + '/src/public'));

const log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
const log_stdout = process.stdout;
const log_stderr = process.stderr;

console.log = function(d) { //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
    log_stderr.write(util.format(d) + '\n');
};

const access = fs.createWriteStream(__dirname + '/stdout.log', {flags : 'w'});
process.stdout.write = process.stderr.write = access.write.bind(access);

process.on('uncaughtException', function(err) {
    console.error((err && err.stack) ? err.stack : err);
});

app.listen(process.env.PORT || 3000, (req, res) => {
    console.log('Servidor funcionando')
});