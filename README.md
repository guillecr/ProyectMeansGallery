ProyectMeansGallery
Proyecto de Guillermo Casas donde se reliza una demostracion de 
una aplicación completa (Back and Front) en la cual podemos enviar imagenes a una API el cual
almacenará la imagen en el servidor y añadira la URL con la URL el titulo y una descripción de
la imagen en una base de datos MongoDB.

Para ejecutar el proyecto hay que instalar los modulos:

	- En la raiz del proyecto Express (/):
		npm install
	Levantar el proyecto:
		npm start
		
	- En la raiz del proyecto Angular (/client)
		npm install
	Levantar el proyecto Angular
		ng serve

Ademas, hay que crear el archivo (/database/mongo.js) donde hay que incluir:

	module.exports = {
		db: "<URL-MongoDB>"
	}

El proyecto se accede por el puerto 4200 y a la API por el puerto 3000
	
