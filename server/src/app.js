const express = require('express');
const app = express();

//Routes
const userRoute = require('./routes/userRoute');
const errorLogger = require('./utilities/errorlogger');

app.use(express.json());

//api
app.use('/user',userRoute)

//ErrorLogger
app.use(errorLogger);



app.listen(3000,() =>{
    console.log("Server started at port 3000 !")
})