'use strict'

const 	jwt 	= require('jwt-simple'),
 		moment 	= require('moment'),
 		config	= require('../config'),
 		 _ 		= require('underscore-node');

function createJWT(user) {
  var payload = {
    sub: 	user.id,
    user: 	user,
    iat: 	moment().unix(),
    exp: 	moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeJWT(token, allowedRoles){
	const decoded = new Promise((resolve, reject) => {
		try{
			const payload = jwt.decode(token, config.SECRET_TOKEN);
			if(payload.exp <= moment().unix()){
				reject({
					status: 401,
					message: 'The time of validation was expired. You need login to validate your access.'
				});
			}
			
			var allow=false;
			
			_.some(allowedRoles, function (value) {
		    	if (_.isEqual(value, payload.user.role) && !allow) {
		       		allow=true;
		      	}
		    });
			
			if(!allow){
		    	reject({
		    		status: 405,
		    		message: 'Access not allowed'
		    	});
		    } else{
		    	resolve(payload.user);
		    }
			

		} catch(err){
			reject({
				status: 500,
				message: 'Invlaid token'
			})
		}
	});

	return decoded;
}

module.exports = {
	createJWT, 
	decodeJWT
};