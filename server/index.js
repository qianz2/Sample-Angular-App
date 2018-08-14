const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Import API routes
const api = require('./routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Import api routes
app.use('/api', api);

// Default index.html route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * Get port from environment; if none present, use port 80
 */
const port = process.env.PORT || '80';
app.set('port', port);

// Instantiate server
const server = http.createServer(app);

// Start our server
server.listen(port, () => console.log(`Server running on localhost:${port}`));
