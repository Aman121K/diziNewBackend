const cnf = require("dotenv").config;
cnf();

// MONGODB DETAILS
const MONGO_USERNAME = ""
const MONGO_PASSWORD = "";
const MONGO_DATABASE = "flynaut"
const MONGO_STRING = process.env.MONGO_DB_URL || `mongodb+srv://admin:Mz6num5GIw6x60qZ@cluster0.krn7bjq.mongodb.net/buzzdeals`



const MONGO = {
    username : MONGO_USERNAME,
    password : MONGO_PASSWORD,
    database : MONGO_DATABASE,
    string : MONGO_STRING
}


// SERVER DETAILS
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost'
const SERVER_PORT = process.env.PORT || 5002
const JWT_SECRET = process.env.JWT_SECRET || "sjkjk54sf455s4=sf1554"


//keys details
const KEYS={
    jwt_secret: JWT_SECRET
}


const SERVER = {
    hostname : SERVER_HOSTNAME,
    port : SERVER_PORT
}

// AWS s3 details
const AWS={
    accessKeyId: "AKIA26YDCMIPIOJDZWDY",
    secretAccessKey: "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",
    region: "ap-south-1",
    bucket: "dev-buzzdealz"
}

const HOSTNAME={
    local:"http://127.0.0.1:5002",
    dev:"",
    frontend:""
}

const config = {
    mongo : MONGO,
    server : SERVER,
    keys : KEYS,
    aws : AWS,
    hostname:HOSTNAME
}

module.exports =  config;