
Api REST Full Node 6 JS and Express.

Previous configurations:

- Install npm (if you don't have it installed yet).
- Execute the command "npm install" from the command line, being positioned in the project directory
- Once the necessary packages are installed for the api to work, you can run the same with the command: "node app" or "npm start". It will be accessible through port 3000 (by default).

Benefits of the api:

The api has the following functionalities:
- Access control, through access to remote url.
- Token creation once the user has validated.
- User queries (through id or name) or policies (through client id or policy number), accessing remote urls to feed data. Access to information is restricted to the role of the logged in user (token information).

Unit testing:
- Testing using Mocha, Chai, Should y Supertest 
- The way to implement unit test, you need to invoque: "npm test" from command line 

Usability:
- To be able to access any functionality, you must first log in. The login is validated against username and email.
The list of valid users, obtains them from the url:
http://www.mocky.io/v2/5808862710000087232b75ac
Once logged in, a token is generated, which is validated each time a route is accessed.
The routes that can be accessed are several. Some of them are public access and others are restricted, depending on the role of the logged in user:
  - << server url (for example, http://127.0.0.1) >>
    - / login: access to login (public access)
    - / private (private access, previous login)
      - / users / << filter type >> / << filter value >>: 
          Allows accessing user filters. Enabled ONLY for users with role ADMIN or USER.
          Valid filter types for this filter are: "name" or "id". 
          For example: http://127.0.0.1/private/users/name/Britney
      - / policies / << filter type >> / << filter value >>: 
          Access to policy filters. Enabled ONLY for users with ADMIN role.
          Valid filter types for this filter are: "clientId" or "number" (number of policy). 
          For example: http://127.0.0.1/private/policies/clientId/e8fd159b-57c4-4d36-9bd7-a59ca13057bb

