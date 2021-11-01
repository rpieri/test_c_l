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


The next steps are:<br/>
1º Create a new propriety in product with the name "id_third_party".<br/>
2º Try sent the new product to third party service and save the id of return in product table</br>
3º Create a worker service to try to send the product if the first tentative had a problem</br>
4º Update product after send information to third party service