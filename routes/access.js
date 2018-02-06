'use strict'

const 	express 		= require('express'),
		router 			= express.Router(),
		userController	= require('../controllers/user');

function login(req, res) {
	 userController.signIn(req, res);
}

router.get('/', (req, res) => { 
	res.render('index.ejs');
});

router.get('/authenticate', (req, res) => { 
	res.render('index.ejs');
});

router.get('/login', (req, res) => { 
	res.render('login.ejs');
});
router.get('/register', (req, res) => { 
	res.render('register.ejs');
});

router.post('/login', login);


module.exports = router;