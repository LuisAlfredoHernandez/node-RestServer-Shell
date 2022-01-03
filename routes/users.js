const {Router} = require('express');

const router = Router();

const { userPatch, 
        userGet, 
        userPost, 
        userDelete, 
        userPut } = require('../controllers/users.controllers');

        router.get('/', userGet);

        router.post('/', userPost);

        router.put('/', userPut);
        
        router.delete('/', userDelete)

        router.patch('/', userPatch)
        
module.exports = router;