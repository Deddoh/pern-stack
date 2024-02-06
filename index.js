const express = require('express');
const pg = require('pg');
const cors = require('cors');
const PORT = 4009;
const app = express();

app.use(cors());
app.use(express.json());
app.listen(PORT, ()=> console.log(`Server listening on port: ${PORT}`));


