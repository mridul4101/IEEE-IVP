const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const apiRoutes = require('./api')
const db_conn = require('./util/mongoDB')
require('dotenv').config();

const PORT = process.env.PORT || 5000

// middlewares
app.use(cors());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api', apiRoutes);


app.listen(PORT,()=>console.log(`Server running at port ${PORT}`));
