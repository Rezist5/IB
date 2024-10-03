const ApiError = require('../error/ApiError');
const User = require('../models/User');
const userFactory = require('../factories/userFactory'); // Импортируйте фабрику

class userController {
    async createUser(req, res, next) {
        try {
            const { email, Fullname, password } = req.body;
            const roleName = 'USER'; 
            const user = await userFactory(email, Fullname, password, roleName);
            return res.json(user);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async createAdmin(req, res, next) {
        try {
            const { email, Fullname, password } = req.body;
            const roleName = 'ADMIN';
            const admin = await userFactory(email, Fullname, password, roleName);
            return res.json(admin);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            let users;
            if (req.user.role === 'ROOT') {
                users = await User.findAll();
            } else if (req.user.role === 'ADMIN') {
                users = await User.findAll({ where: { roleId: 1 } }); 
            } else {
                return next(ApiError.forbidden('Нет доступа'));
            }
            return res.json(users);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return next(ApiError.notFound('User not found'));
            }
            
            if (req.user.role === 'ADMIN' && user.roleId !== 1) {
                return next(ApiError.forbidden('Нет доступа к данному пользователю'));
            }

            return res.json(user);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { email, Fullname, password } = req.body;
            const userToUpdate = await User.findByPk(id);
            if (!userToUpdate) {
                return next(ApiError.notFound('User not found'));
            }

            if (req.user.role === 'ADMIN' && userToUpdate.roleId !== 1) {
                return next(ApiError.forbidden('Нет доступа к данному пользователю'));
            }

            userToUpdate.email = email;
            userToUpdate.Fullname = Fullname;
            userToUpdate.password = password;
            await userToUpdate.save();

            return res.json(userToUpdate);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const userToDelete = await User.findByPk(id);
            if (!userToDelete) {
                return next(ApiError.notFound('User not found'));
            }

            if (req.user.role === 'ADMIN' && userToDelete.roleId !== 1) {
                return next(ApiError.forbidden('Нет доступа к данному пользователю'));
            }

            await userToDelete.destroy();

            return res.json({ message: 'User deleted successfully' });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new userController();
