const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.database')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.path = {
            auth: '/api/auth',
            categories: '/api/categories',
            users: '/api/users',
        }
        this.conectarDB();
        this.middleware();
        this.routes();

    }

    async conectarDB() {
        dbConnection();
    }

    middleware() {
        this.app.use(cors());
        this.app.use(express.static('public'));
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.path.auth, require('../routes/auth'));
        this.app.use(this.path.categories, require('../routes/categories'));
        this.app.use(this.path.users, require('../routes/users'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(this.port)
        })
    }

}

module.exports = Server;

