Execute application:<br/>
1º Execute docker-compose to create the database<br/>
2º Inside database to schema public configure the uuid extension
````CREATE EXTENSION IF NOT EXISTS "uuid-ossp";````<br/>
3º Install dependencies
```` yarn install  ````<br/>
4ºExecute database migrations
```` yarn typeorm migration:run  ````<br/>
4ºExecute application
```` yarn start  ````<br/>
4ºExecute worker
```` yarn worker  ````<br/>
4ºExecute test
```` yarn test  ````<br/>


<p>Summary of design consideration</p>
This project was development using concepts of SOLID as Single Responsibility, Inversion of Control and <br/> 
Dependency Injection, about Design Pattern was used Factory to define which of verb http is going to call when <br/>
integrate to third-party service.<br/>
Created unit test to all services and factories of the application.

<p>Next steps</p>
The next steps will be to create integration tests
