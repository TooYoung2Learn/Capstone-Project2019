const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/user');

//const jwt = require('jsonwebtoken');
//app.use('/api/stuff', stuffRoutes);


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(bodyParser.json());


app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use('/', userRoutes);

app.use('/users/auth', userRoutes);



//pool.query("')", (err, res) => {
//console.log(err, res);
//pool.end();
//}); 



module.exports = app;