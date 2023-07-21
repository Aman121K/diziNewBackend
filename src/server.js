const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const { loggerUtil } = require('./utils/logger');
const app = express();
const routes = require("./routes/index")
const fileupload = require("express-fileupload");
const fs = require('fs');


const buc = require("./utils/Bucket");
const isAuth = require("./middleware/isAuth");

app.use(cors());

app.use(express.static('./public'))


// app.use(express.urlencoded({ extended: true, limit:"200mb" }))
// app.use(express.raw({type: '*/*'}))
// app.use(express.json({ limit:"200mb", extended:true }))
app.use(fileupload())

// Routes for the app
routes(app);

// Application configurations that uses environmental variables(env)
const config = require("./config/config");

// Loading Environment Variables
const DB_URL = config.mongo.string
const PORT = config.server.port

// Initializing DB connection
let myserver;

mongoose.set('strictQuery', false);
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        myserver = app.listen(PORT, () => {
            loggerUtil(`Server running on port: ${PORT}`);
        })
    }
    )
    .catch((error) => loggerUtil(`Error :- ${error.message} `))



// Route for rendering images stored in AWS Bucket.
app.get("/images/profilepic/:key",isAuth,(req,res)=>{

    const key = req.params.key;
    var bucket = new buc(req,res);

    bucket.getRawFile(key,(data)=>{

        if(data != null){
            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.write(data, 'binary');
            res.end(null, 'binary');
        }
        else{
            res.end();
        }
        
    });

})


app.get("/getrawimage/:key",async (req,res)=>{

    const key = req.params.key;
    var bucket = new buc(req,res);

    
    bucket.getRawFile(key,(data)=>{

        if(data != null){
            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.write(data, 'binary');
            res.end(null, 'binary');
        }
        else{
            res.end();
        }
        
    });
  
});