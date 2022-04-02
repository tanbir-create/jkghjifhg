const express = require('express');
const helmet = require("helmet");
const app = express();
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

app.use('/api', require('./routes/index'))
// str = str.replace(/\</g,"&lt;")   
// str = str.replace(/\>/g,"&gt;")

 
const start = async() => {
    try{
        await mongoose.connect('mongodb://localhost:27017/PlacementCell');
        app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
    } catch(error){
        console.log(error);
    }
}

start();