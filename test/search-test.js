'use strict'

let chai        = require('chai');
let chaiHttp    = require('chai-http');
let should      = require('should');
let server      = 'http://127.0.0.1:3000';
let request = require('supertest')(server);

chai.use(chaiHttp);
//Our parent block
describe('\n ALTRAN Api Rest Full Unit Test....', () => {

     describe('\n   Authentication...\n', () => {
        
        it('--> Deny access to a route without login', (done) => {
            var testPromise = new Promise(function(resolve, reject) {
                chai.request(server)
                   .get('/private/users/name/Britney')
                   .end(function(err, res){
                      resolve(res);                        
                   });
                
            });

            testPromise.then(function(res){
                try {
                    res.status.should.equal(403);        
                    done();
                } catch(err) {
                    done(err);
                }                
            });
        });

        it('--> Login deny', (done) => {
            var testPromise = new Promise(function(resolve, reject) {
                chai.request(server)
                   .post('/login')
                   .send({"userName": "InexistUser", "email":"unexist@quotezart.com"})
                   .end(function(err, res){
                      resolve(res);                        
                   });                
            });

            testPromise.then(function(res){
                try {
                    res.status.should.equal(401);        
                    done();
                } catch(err) {
                    done(err);
                }                
            });
        });

        it('--> Login succesfully', (done) => {
            var testPromise = new Promise(function(resolve, reject) {
                chai.request(server)
                   .post('/login')
                   .send({"userName": "Britney", "email":"britneyblankenship@quotezart.com"})
                   .end(function(err, res){
                      resolve(res);                        
                   });                
            });

            testPromise.then(function(res){
                try {
                    res.status.should.equal(200);        
                    done();
                } catch(err) {
                    done(err);
                }                
            });
        });


    });

    describe('\n    Trying access, evaluating token...\n', function(){
        it('--> Should deny access, because of not token generated', function(done) {
            request
                .get('/private/users/id/a3b8d425-2b60-4ad7-becc-bedf2ef860bd')
                .expect(403)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        var auth = {};
        before(loginUser(auth, 'Barnett', 'barnettblankenship@quotezart.com')); //he has user role

        it('--> Should allow access, because of token generated (and role is allowed)', function(done) {
           request
               .get('/private/users/name/Britney')
               .set('Authorization', 'bearer ' + auth.token)
               .expect(200)
               .expect('Content-Type', /json/)
               .end(function(err, res) {
                   if (err) return done(err);
                   done();
               });
        });
    });

    describe('\n    Trying access routes with USER role...\n', function() {

      var auth = {};
      before(loginUser(auth, 'Barnett', 'barnettblankenship@quotezart.com')); //he has user role

      it('--> Should allow access', function(done) {
        request
            .get('/private/users/id/a3b8d425-2b60-4ad7-becc-bedf2ef860bd')
            .set('Authorization', 'bearer ' + auth.token)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
      });

      it('--> Should deny access', function(done) {
        request
            .get('/private/policies/number/788307fa-d261-4a9f-8d30-65fc3375617e')
            .set('Authorization', 'bearer ' + auth.token)
            .expect(405)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
      });

    });

    describe('\n    Trying access routes with ADMIN role...\n', function() {
      var auth = {};
      before(loginUser(auth, 'Britney', 'britneyblankenship@quotezart.com')); //she has admin role

      it('--> Should allow access', function(done) {
        request
            .get('/private/policies/number/788307fa-d261-4a9f-8d30-65fc3375617e')
            .set('Authorization', 'bearer ' + auth.token)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
      });
      
      
    });

    describe('\n    Trying access invalid routes (despite of token generated successfully)...\n', function() {
      var auth = {};
      before(loginUser(auth, 'Britney', 'britneyblankenship@quotezart.com')); //she has admin role

      it('--> Should deny access', function(done) {
        request
            .get('/private/invalidRoute')
            .set('Authorization', 'bearer ' + auth.token)
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
      });
      
      
    });
  
});


function loginUser(auth, userName, email) {
    return function(done){
        var testPromise = new Promise(function(resolve, reject) {
            chai.request(server)
               .post('/login')
               .send({"userName": userName, "email": email})
               .end(function(err, res){
                  resolve(res);  
                });                
        });

        testPromise.then(function(res){
            try {
                res.status.should.equal(200);        
                onResponse(res);
            } catch(err) {
                done(err);
            }                
        });

        function onResponse(res) {
           auth.token = res.body.token;
           return done();
        }
    };
}