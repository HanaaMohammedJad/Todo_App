const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const port = process.env.PORT || 8080;
const indexRouter = require('./src/routes/index');
const todosRouter = require('./src/routes/todo.routes');

require('dotenv').config();
// Create a new express application
const app = express();

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Use morgan for logging
app.use(morgan('dev'));

app.use('/api', indexRouter);
app.use('/api/todos', todosRouter);


// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
