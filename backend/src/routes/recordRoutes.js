const express =require('express')
const router= express.Router()

const{
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
}= require('../controllers/recordController')

const authMiddleware= require('../middleware/authMiddleware')
const roleMiddleware =require('../middleware/roleMiddleware')

router.post('/', authMiddleware, roleMiddleware('admin','analyst'), createRecord)
router.get('/', authMiddleware, roleMiddleware('admin','analyst','viewer'), getRecords)
router.put('/:id', authMiddleware, roleMiddleware('admin','analyst'), updateRecord)
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteRecord)

module.exports = router