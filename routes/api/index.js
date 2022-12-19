const router = require('express').Router();
const userRoutes = require('./c');
const thoughtRoutes = require('./studentRoutes');

router.use('/courses', courseRoutes);
router.use('/students', studentRoutes);

module.exports = router;
