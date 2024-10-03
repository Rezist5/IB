const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        if (!token) {
            throw new Error('Токен отсутствует');
        }
        
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        req.userData = decoded;
        
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Ошибка аутентификации: ' + error.message });
    }
};