const router = require('express').Router()
const {updateUser} = require('../controllers/user_controller')
const {verifyTokenAndAuthorization} = require('../middlewares/verifyToken')



router.route('/:id').put(verifyTokenAndAuthorization,updateUser)



module.exports = router