const http = require('http');

const app = require('./src/bootstrap')();
const port = 3000;
/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Get port from environment and store in Express.
 */
app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */
server.on('error', (error) => {
  if (error.syscall !== 'listen') throw error;
  
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  
  /*
    Handle specific listen errors with friendly messages
   */
  console.log('-------------------- App unexpectedly stopped --------------------');
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.log(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
  console.log(`App listening on\` ${JSON.stringify(addr)}:${addr.port}`);
});

server.listen(port, '0.0.0.0');
