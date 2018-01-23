const { Router } = require('express')

const router = Router()
const { admin: { showAdminPage } } = require('../controllers')

router.get('/', showAdminPage)

module.exports = router
