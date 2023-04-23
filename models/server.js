const express = require('express');
const cors = require('cors');

class Server{

constructor(){
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.usuarioPath = '/api/users';
    this.middleware();   
    this.routes();

}
    middleware(){
        this.app.use(cors());
        this.app.use(express.static('public')); 
        this.app.use(express.json()); 
    }

    routes(){
        this.app.use(this.usuarioPath, require('../routes/users'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(this.port)
        })
    }

}

module.exports = Server;

