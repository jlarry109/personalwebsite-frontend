// import express from 'express';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const express = require('express');
// const path = require('path');
// const { fileURLToPath } = require('url');
// const { dirname } = require('path');

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);



// const app = express();

// // Serve static files from the dist directory
// app.use(express.static(path.join(__dirname, 'dist')));

// // Handle all requests by serving the index.html file
// app.get('*', (req, res) => {
//   try {
//     res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
//   } catch (error) {
//     console.error('Error while sending index.html:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // Set the port dynamically, or fallback to 8080
// const port = process.env.PORT || 8080;

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


const express = require('express');
const path = require('path');

// __dirname is automatically available in CommonJS, so no need for import.meta.url
const app = express();

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all requests by serving the index.html file
app.get('*', (req, res) => {
  try {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  } catch (error) {
    console.error('Error while sending index.html:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Set the port dynamically, or fallback to 8080
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
