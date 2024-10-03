const express = require('express');
const authRoutes = require('./authRoutes'); 
const userRoutes = require('./userRoutes');
const companyRoutes = require('./companyRoutes');

const router = express.Router();

router.use('/auth', authRoutes); 
router.use('/users', userRoutes); 
router.use('/companies', companyRoutes);

module.exports = router;
