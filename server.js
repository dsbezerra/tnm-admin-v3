import path from 'path';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import favicon from 'serve-favicon';
import logger from 'morgan';
import webpack from 'webpack';
import webpackConfig from './webpack.config.dev';

const app = express();
const compiler = webpack(webpackConfig);

import secrets from './config/secrets';

import { generateError } from './utils/ApiUtils';

import * as adminController from './controllers/admin';
import * as summaryController from './controllers/summary';
import * as plivoController from './controllers/plivo';

import {
  agencies,
  biddings,
  segments,
  locations
} from './routes';

app.use(require('webpack-dev-middleware')(compiler, {
  quiet: false,
  noInfo: false,
  publicPath: webpackConfig.output.publicPath,
  stats: webpackConfig.stats,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'cobol',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));
app.use(express.static(path.join(__dirname, 'public')));
app.disable('x-powered-by');


app.post('/login', adminController.login);
app.post('/logout', adminController.logout);

// App Routes
app.get('/login', (req, res, next) => {
  if(req.session.user) {
    res.redirect('/');
  }
  else{
    res.sendFile(path.join(__dirname, 'views/index.html'));
  }
});


// All endpoints below this must require a auth token
// Using a middleware to check if session and token exists before handling requests
app.use((req, res, next) => {
  const { user } = req.session;
  const url = req.url;
  if(!user) {
    res.redirect('/login');      
  }
  else {
    const { token } = user;
    if(!token) {
      res.redirect('/login');
    }
    else {
      next();
    }
  }
});

// Routes
app.use('/agencies', agencies);
app.use('/biddings', biddings);
app.use('/segments', segments);
app.use('/locations', locations);

app.get('/metrics/database', summaryController.getDatabaseMetrics);
app.get('/metrics/users', summaryController.getUsersMetrics);
//app.get('/metrics/plivo', summaryController.getPlivoData);

// Plivo endpoints
app.get('/plivo/account',   plivoController.getAccount);
app.get('/plivo/messages',  plivoController.getMessages);
app.post('/plivo/messages', plivoController.sendMessage);

app.get('*', (req, res, next) => { 
  if(!req.session.user) {
    res.redirect('/login');
  }
  else{
    res.sendFile(path.join(__dirname, 'views/index.html'));
  }
});

app.listen(app.get('port'), (err) => {
  if(err) {
    console.log(err);
    return;
  }

  console.log('Express server listening on port ' + app.get('port'));
});
