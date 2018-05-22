const express = require('express');
const config = require('../config/config');
const app = express();

app.use(express.static(config.PublicPath));



app.listen(config.Port, (err) => {
    if(err) return console.log(err);

    console.log(`Listening on port ${config.Port}`);
});