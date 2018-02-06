'use strict'

const 	_ 				= require('underscore-node'),
 		config			= require('../config'),
   		fetchRoutes		= require('node-fetch'),
		tokenService	= require('../services/token'),
		bodyParser  	= require('body-parser');

fetchRoutes.Promise 	= require('bluebird');

function signIn(req, res){
	let name=req.body.userName;
	let email=req.body.email;
	
	console.log(name + '-' + email);
	fetchRoutes(config.clients)
	 .then((res) => {
	  	return res.json();
	  })
	 .then((json) => {
	  	var user_found=_.find(_.toArray(json)[0], function(client){
	  		return (client.name===name && client.email===email);
	  	});
	  	if(!user_found){
	  		return res.status(401).send({message: 'User or email not found' });
	  	} else{
	  		req.headers.authorization = tokenService.createJWT(user_found);
	  		return res.status(200).send({token: req.headers.authorization});
	  	}
	  })
	 .catch(error => {
          console.log('login():Error Stack: ' + error.stack);
     });
}

module.exports = {
	signIn
}