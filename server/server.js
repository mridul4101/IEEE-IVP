const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const apiRoutes = require('./api')
const db_conn = require('./util/mongoDB')
const path = require('path');
// console.log("0x229a563023CECee85a55DA14162c8300388C5D70".length)
const PORT = process.env.PORT || 5000

// middlewares
app.use(cors());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/', apiRoutes);


app.listen(PORT,()=>console.log(`Server running at port ${PORT}`));
