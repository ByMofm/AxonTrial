const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const valuesRoutes = require('./routes/values.routes');

const app = express();

// Middlewares

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());

app.use(valuesRoutes);

app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
})


//Rutas

app.listen(4000);
console.log("Server on port 4000");
