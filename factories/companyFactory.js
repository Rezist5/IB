const Company = require('../models/Company');

const companyFactory = async (name, description, images) => {
  try {
    if (!name) {
      throw new Error('Название компании не может быть пустым');
    }

    const company = await Company.create({
      name,
      description,
      images, 
    });

    return company;
  } catch (error) {
    console.error(`Ошибка создания компании: ${error.message}`);
    throw error;
  }
};

module.exports = companyFactory;
