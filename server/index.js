const express = require('express');
const app = express();
const connectDB = require('./config/db');

// connect to the Data Base
connectDB();

// read form data with express.json the other option is body-parser
// send from Headers as Content-Type application/json
app.use(express.json({ extended: true }));

// app port
const PORT = process.env.PORT || 4000;

// Router administation
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
//app.use('/api/tasks', require('./routes/tasks'));


app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`)
});