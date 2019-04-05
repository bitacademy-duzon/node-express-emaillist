const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const indexRouter = require( './routes/index' );
const emaillistRouter = require( './routes/emaillist' );

const port = 3000;
const app = express();
const router = express.Router();

// parsing request body(form data)
app.use(bodyParser.urlencoded({extended: false}));

// view engine setup
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');

// request router setup
// app.use('/', indexRouter);
// app.use('/emaillist', emaillistRouter);
app.use('/', emaillistRouter);

const server = http.createServer( app );
server.on('error', onError);
server.on('listening', onListening);
server.listen(port);


function onError(error){
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(){
    const addr = server.address();
    const bind = (typeof addr === 'string') ?
        'pipe ' + addr :
        'port ' + addr.port;
    console.log( 'Listening on ' + bind);
}