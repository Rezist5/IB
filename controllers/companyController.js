const Company = require('../models/Company');
const ApiError = require('../error/ApiError');
const companyFactory = require('../factories/companyFactory');

class CompanyController {
    async create(req, res, next) {
        const { name, description, images } = req.body;

        try {
            const company = await companyFactory(name, description, images);
            return res.status(201).json(company);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const companies = await Company.findAll(); 
            return res.json(companies);
        } catch (error) {
            next(ApiError.internal('Ошибка при получении компаний'));
        }
    }

    async getById(req, res, next) {
        const { id } = req.params;

        try {
            const company = await Company.findByPk(id);
            if (!company) {
                return next(ApiError.notFound('Компания не найдена'));
            }
            return res.json(company);
        } catch (error) {
            next(ApiError.internal('Ошибка при получении компании'));
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        const { name, description, images } = req.body;

        try {
            const company = await Company.findByPk(id);
            if (!company) {
                return next(ApiError.notFound('Компания не найдена'));
            }

            company.name = name || company.name;
            company.description = description || company.description;
            company.images = images || company.images;

            await company.save();
            return res.json(company);
        } catch (error) {
            next(ApiError.internal('Ошибка при обновлении компании'));
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;

        try {
            const company = await Company.findByPk(id);
            if (!company) {
                return next(ApiError.notFound('Компания не найдена'));
            }

            await company.destroy();
            return res.json({ message: 'Компания успешно удалена' });
        } catch (error) {
            next(ApiError.internal('Ошибка при удалении компании'));
        }
    }

    async addImages(req, res, next) {
        const { id } = req.params;
        const { images } = req.body;

        try {
            const company = await Company.findByPk(id);
            if (!company) {
                return next(ApiError.notFound('Компания не найдена'));
            }

            company.images = [...company.images, ...images]; 
            await company.save();
            return res.json(company);
        } catch (error) {
            next(ApiError.internal('Ошибка при добавлении изображений'));
        }
    }
    async assignAdmin(req, res, next) {
        const { id } = req.params; 
        const { adminId } = req.body; 

        try {
            const company = await Company.findByPk(id);
            if (!company) {
                return next(ApiError.notFound('Компания не найдена'));
            }

            const admin = await Admin.findByPk(adminId);
            if (!admin) {
                return next(ApiError.notFound('Администратор не найден'));
            }

            company.adminId = adminId; // Предполагая, что у вас есть поле adminId в модели Company
            await company.save();

            return res.json(company);
        } catch (error) {
            next(ApiError.internal('Ошибка при привязке администратора к компании'));
        }
    }
}

module.exports = new CompanyController();
