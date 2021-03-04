const router = require('express').Router();
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const auth = require('../middlewares/auth');

router.use('/users', auth, usersRoutes);
router.use('/cards', auth, cardsRoutes);
router.use('*', (req, res) => {
  res.status(404).send({ message: 'requested resource not found'});
});

module.exports = router;
