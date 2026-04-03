const express = require('express')
const router= express.Router()

const{
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}= require('../controllers/userController')

const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')
router.get('/', authMiddleware, roleMiddleware('admin'), getAllUsers)
router.get('/:id', authMiddleware, roleMiddleware('admin'), getUserById)
router.put('/:id', authMiddleware, roleMiddleware('admin'), updateUser)
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteUser)

module.exports = router