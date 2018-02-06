'use strict'

const 	tokenService	= require('../services/token');

function isAuth(req, res, allowedRoles, next){
	
	if(!req.headers.authorization){
		return res.status(403).send({ message: 'You need to login'});
	}

	const token = req.headers.authorization.split(" ")[1];
	tokenService.decodeJWT(token, allowedRoles)
		.then(response => {
			req.user = response.user;	
			next();	
		})
		.catch(response => {
			res.status(response.status).send({message: response.message});			
		});

}

module.exports = {isAuth};