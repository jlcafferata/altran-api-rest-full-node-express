'use strict'

const 	express 	= require('express'),
		router 		= express.Router(),
		 _ 			= require('underscore-node'),
		fetch 		= require('node-fetch'),
		bodyParser  = require('body-parser'),
		config		= require('../config'),
		auth 		= require('../middlewares/auth');

fetch.Promise 	= require('bluebird');
	
	

function filterUsers(req, res){
	let filterBy=req.params.filterBy;
    let filterValue=req.params.filterValue;
    let found={};
    fetch(config.clients).then((res) => {
	  	return res.json();
	 }).then((json) => {
	  	if(!json){
			return res.status(401).send({message: 'Users not found'});
	  	} 
	  	try{
		  	auth.isAuth(req, res, ['user', 'admin'], function(){
			  	if(filterBy && filterValue){
					found=_.find(_.toArray(json)[0], function(client){
			  			if(filterBy==='name'){
			  				return client.name === filterValue;	
			  			} else if(filterBy==='id'){
			  				return client.id === filterValue;	
			  			}		  			
			  		});
			  		if(!found){
			  			return res.status(401).send({message: 'User not found'});
			  		}
			  	} 
			  	return res.status(200).send({users: found});		  		
		  	});  
		} catch(err){
	  		return res.status(401).send({message: err});
	  	}	  			  	
	 });
}


function filterPolicies(req, res){
	let filterBy=req.params.filterBy;
    let filterValue=req.params.filterValue;
	let found={};
	fetch(config.policies).then((res) => {
	  	return res.json();
	 }).then((json) => {
	  	if(!json){
			return res.status(401).send({message: 'Policies not found'});
	  	} 
	  	try{
		  	auth.isAuth(req, res, ['admin'], function(request, response){
			  	if(filterBy && filterValue){
					found=_.find(_.toArray(json)[0], function(policy){
			  			if(filterBy==='name'){
			  				return policy.name === filterValue;	
			  			} else if(filterBy==='number'){
			  				return policy.id === filterValue;	
			  			}		  			
			  		});
			  		if(!found){
			  			return res.status(401).send({message: 'Policy not found'});
			  		}
			  	} 
			  	return res.status(200).send({policies: found});	
		  	});		 
	  	} catch(err){
	  		return res.status(401).send({message: err});
	  	}	  			  	
	 });
}

//routes

router.get('/users/:filterBy/:filterValue', filterUsers);

router.get('/policies/:filterBy/:filterValue', filterPolicies);


module.exports = router;