/*var supertest = require("supertest"),
    should    = require("should"); 

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("SAMPLE unit test",function(){

  it("should return successfully, with status 200",function(done){

    server
    .get('/private/users')
    .send({filterBy : 'name', filterValue : 'Britney'})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      setTimeout(function(res){
        res.status.should.equal(200);  
      }, 3000);
      done();
    });
  });

  it("should return an error with status 401",function(done){
    server
    .get('/private/users')
    .expect("Content-type",/json/)
    .expect(401)
    .end(function(err,res){
      setTimeout(function(res){
        res.status.should.equal(401);  
      }, 3000);
      done();
    });
  });

});*/


