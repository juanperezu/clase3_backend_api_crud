 /* const express = require('express');
 const path = require('path');
 const morgan= require('morgan');
 const app = express();
*/
 const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();



 //midlewares
 app.use(morgan('dev'));// monitorias las peticiones
 app.use(express.json()); // peticiones en formato json
 


 
 // Routes
 //app.use('/api/',require('./routes/movies'));
app.use('/api/',require('./routes/movies'));
 
 app.set("port",4001);
 app.listen(app.get("port"),()=>{
console.log('servidor corriendo en puerto 40001');

 });
/*
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();

//Middlewares
app.use(morgan('dev')); //Monitorear las peticiones
app.use(express.json()); //Peticiones en formato json

//Routes
app.use('/api/',require('./routes/movies'));

app.set("port", 4001);
app.listen(app.get("port"), ()=>{
    console.log(`Servidor corriendo en el puerto 4001`);
  });


*/