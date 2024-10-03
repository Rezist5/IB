const Router = require('express').Router;
const CompanyController = require('../controllers/companyController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

const router = new Router();

router.post('/', checkRoleMiddleware('ROOT'), CompanyController.create);

router.get('/', CompanyController.getAll);

router.get('/:id', CompanyController.getById);

router.put('/:id', checkRoleMiddleware('ADMIN'), CompanyController.update);

router.delete('/:id', checkRoleMiddleware('ADMIN'), CompanyController.delete);

router.post('/:id/images', checkRoleMiddleware('ADMIN'), CompanyController.addImages);

router.post('/:id/admin', checkRoleMiddleware('ROOT'),companyController.assignAdmin.bind(companyController));


module.exports = router;
