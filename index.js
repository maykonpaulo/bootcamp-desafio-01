const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  return res.json({ message: 'ok' });
})

server.listen(3000);