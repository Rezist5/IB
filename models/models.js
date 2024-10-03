const User = require('./User');
const Role = require('./Role');

User.associate({ Role });
Role.associate({ User });

module.exports = {
    User,
    Role
}