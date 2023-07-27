const { loggerUtil } = require("../utils/logger");
const userRoute = require("./user");
const express = require('express');
const globalRoute = require("./global");
const barberRoute = require("./barber")

const routes = (app) => {
    // Test Route for API
    app.get("/welcome", (req, res) => {
        loggerUtil("Welcome API called.")
        res.send("Welcome to API for Dizi.\n Servers are Up and Running")
    })

    app.use( '/api/v1',[
        express.urlencoded({ extended: true, limit:"200mb" }),
        express.json({ limit:"200mb", extended:true })],
        globalRoute )

    app.use('/api/v1/user',[
        express.urlencoded({ extended: true, limit:"200mb" }),
        express.json({ limit:"200mb", extended:true })],
        userRoute )

        app.use('/api/v1/barber',[
            express.urlencoded({ extended: true, limit:"200mb" }),
            express.json({ limit:"200mb", extended:true })],
            barberRoute )
    
    return app
}


module.exports = routes