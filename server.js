require("dotenv").config();
const fs = require('fs')
const express = require('express'); 
const app = express();
const port = process.env.PORT || 4000;

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use('/api/files', require('./fileRouter'));
app.use('/api/folders', require('./folderRouter'));
app.get("*", (req, res)=>{
    res.status(404).sendFile(process.cwd()+"/public/index.html")    
})

app.listen(port, ()=>{console.log(`CONNECTION SUCCESS- on port: ${port}`)})
