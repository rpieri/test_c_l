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
