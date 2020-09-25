import http from 'http'
import app from "./app";

/*
  Set default environment variable
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * Load env configuration
 */
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Get port from environment and store in Express.
 */
const port = +process.env.PORT || 3000;
app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */
/* server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  /*
    Handle specific listen errors with friendly messages
   * /
  console.log('-------------------- App unexpectedly stopped --------------------');
  switch (error.code) {
    case 'EACCES':
      console.error(`${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.log(`${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}); */

server.on('listening', () => {
  const addr = server.address();
  console.log(`Listening on ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`App listening on: ${JSON.stringify(addr)}`);
});

server.listen(port, '0.0.0.0');

export default server;
