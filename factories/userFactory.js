const User = require('../models/User');  
const Role = require('../models/Role');
const bcrypt = require('bcrypt');

const userFactory = async (email, fullName, password, roleName) => {
  try {
    const role = await Role.findOne({ where: { name: roleName } });
    var roleId = role.id;
    if (!role) {
      throw new Error(`Роль ${roleName} не найдена`);
    }
    avatar = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      Fullname: fullName,
      password: hashedPassword,
      avatar,
      roleId
    });
    
    return user;
  } catch (error) {
    console.error(`Ошибка создания пользователя: ${error.message}`);
    throw error;
  }
};

module.exports = userFactory;
