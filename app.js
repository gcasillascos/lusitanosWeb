const express = require('express');
const ejs = require('ejs');
const favicon = require('express-favicon');
const dotenv = require('dotenv');
const path = require('path');
// const redis = require('redis');
// const connectRedis = require('connect-redis');
const mongoose = require('mongoose');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')

dotenv.config({ path: './config/config.env' });
global.loggedIn = null;
global.userData = null;
global.role = null
global.resetToken = null;

global.ruta = {
  FARM: 'farm',
  HORSES: 'horses',
  MARKINGS: 'markings',
  HIERROS: 'hierros'

};

global.tipo = {
  IMGS: 'photos',
  VIDEOS: 'video'
};

baseurl = process.env.API_URL;

const app = new express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.use(fileUpload());
app.use(cookieParser('keyboard cat'))

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, //YOUR MONGODB URL
      ttl: 14 * 24 * 60 * 60,
      autoRemove: 'native',
    }),
    /*    store: new RedisStore({ client: redisClient }),*/
    secret: 'SVee=:|5P)Zw@Nc63-lNa4$6!',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 30 * 24 * 60 * 60 * 1000, // session max age in miliseconds
    },
  })
);
app.use(flash());
app.use('*', (req, res, next) => {
  loggedIn = req.session.userId;
  role = req.session.role
  next();
});

/*app.use((req,res)=>{
    res.render('404')
})*/

//Routes files
const home = require('./routes/home');
const pedigrees = require('./routes/pedigrees');
const users = require('./routes/users');
const auth = require('./routes/auth');
const owners = require('./routes/owners');
const horses = require('./routes/horses');
const cubriciones = require('./routes/cubriciones');
const bajas = require('./routes/bajas');
const cuentas = require('./routes/cuentas');
const reportes = require('./routes/reportes');
const formatos = require('./routes/formatos');
const estados = require('./routes/estados');
const impresion = require('./routes/impresion');

app.use('/', home);
app.use('/auth', auth);
app.use('/users', users);
app.use('/owners', owners);
app.use('/pedigrees', pedigrees);
app.use('/horses', horses);
app.use('/cubriciones', cubriciones);
app.use('/bajas', bajas);
app.use('/cuentas', cuentas);
app.use('/reportes', reportes);
app.use('/formatos', formatos);
app.use('/estados', estados);
app.use('/impresion', impresion);

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
