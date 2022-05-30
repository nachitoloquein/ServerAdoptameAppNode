<p align="center"><a href="https://nodejs.org/es/about/" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" width="400"></a></p>


# Node JS
Este proyecto se llevó a cabo en Node JS en la versión 16 utilizando el stack MEAN. Basicamente se levantan webservices por medio de la arquitectura REST para ser consumidos posteriormente desde un Front-End tanto de escritorio como web y mobile, la meta es crear una aplicación extremadamente modular solo teniendo este back-end

## Instalación
```sh
   git clone https://github.com/nachitoloquein/ClientAveMundoAngular.git
   cd ClientAveMundoAngular
   npm i
   npm run dev
```

## Estructura
Basicamente dividí mi proyecto en diversas secciones: models, controllers, routes, config, helpers, middlewares y api. En los modelos defino la estructura del objeto en el cual se trabajará, dentro del controller realizo los métodos asociados a dicho objeto por medio del protocolo HTTP, en la carpeta routes defino las rutas, la estructura de la misma y el método que se utilizará para poder acceder a ellas, dentro de la carpeta config está la configuración a la BDD que en este caso es MongoDB, dentro de helpers podemos encontrar diversas funciones maestras que podemos utilizar dentro de los controladores para obtener una mayor modularidad y reutilizar código, dentro de los middlewares encontramos servicios para mantener activa una sesión y otorgarle el acceso a ciertas vistas o denegarlas en caso de que una sesión se encuentre inactiva y finalmente la carpeta api que es para testear de forma rápida el resultado de los webservices al momento de ejecutar el servidor, para poder testearlas debe instalar la extensión de VScode `Rest Client`. 