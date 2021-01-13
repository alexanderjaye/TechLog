const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;
const HOST = process.env.HOST || `A different host`;

app.listen(PORT, ()=> {
  console.log(`Server running on ${HOST}:${PORT} 🚀🚀🚀`);
});