const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const Role = require('../models/Role');  
const ApiError = require('../error/ApiError');

class AuthController {

    async login(req, res, next) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({
                where: { email }
            });
            
            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'));
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return next(ApiError.badRequest('Неверный пароль'));
            }

            const role = await Role.findByPk(user.roleId);

            if (!role) {
                return next(ApiError.internal('Ошибка получения роли'));
            }

            const token = jwt.sign({ id: user.id, email: user.email, role: role.name }, process.env.SECRET_KEY, {
                expiresIn: '1h', 
            });

            res.status(200).json({
                token,
                user: { id: user.id, email: user.email, fullname: user.Fullname, role: role.name }
            });
        } catch (error) {
            console.error('Ошибка при логине:', error);
            next(ApiError.internal('Ошибка сервера'));
        }
    }
}

module.exports = new AuthController();
