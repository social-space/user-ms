const router = require('express-promise-router')()

router.use('/user', require('./user'));

module.exports = router;