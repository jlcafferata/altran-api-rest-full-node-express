'use strict'

const express		= require('express');
const morgan 		= require('morgan');
const bodyParser  	= require('body-parser');
const jwt    		= require('jsonwebtoken'); // used to create, sign, and verify tokens
const config 		= require('./config'); 	   

const access 		= require('./routes/access');
const searches 	= require('./routes/searches');

const app=express();


//Settings

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();		
});

app.set('appName', 'apiRestFullNode');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('superSecret', config.secret); // secret variable


// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//to server-log
app.use(morgan('combined'));

//routes
app.use(access);
app.use('/private', searches);
app.get('*', (req, res) => {
	res.status(404).send('route not found');
});

app.listen(3000, function(){
	console.log('Server ' + app.get('appName')  + ' started on port 3000');
});