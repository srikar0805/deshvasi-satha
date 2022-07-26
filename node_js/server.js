const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const { request } = require('http');
const { response } = require('express');
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/pwhome', (request, response) => {
    response.json({
        success: true
    });
})



app.listen(process.env.PORT, () => console.log("Webpage is running."));