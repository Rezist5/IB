const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');


router.post('/', checkRoleMiddleware(['ADMIN', 'ROOT']), userController.createUser);

router.post('/admin',checkRoleMiddleware("ROOT"), userController.createAdmin);

router.get('/', checkRoleMiddleware(['ADMIN', 'ROOT']), userController.getAll);
router.get('/:id', checkRoleMiddleware(['ADMIN', 'ROOT']), userController.getById);


router.put('/:id', checkRoleMiddleware(['ADMIN', 'ROOT']), userController.update);

router.delete('/:id', checkRoleMiddleware(['ADMIN', 'ROOT']), userController.delete);

module.exports = router;
