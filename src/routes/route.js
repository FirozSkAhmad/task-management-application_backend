const express = require('express')

const router = express.Router()
const { createUser, userLogin } = require('../controllers/userController')
const { authentication, authorization } = require('../middlewares/auth')
const { createTask, getTasks, getCompletedTasks, getTaskBySortCom, getTaskBySort, getTaskById,updateStatus, updateTask, deleteTask } = require('../controllers/taskController')


router.post('/createUser', createUser)
router.post('/login', userLogin)
router.post('/createTask', authentication, authorization, createTask)
router.get('/getTasks/:userId', authentication, getTasks)
router.get('/getCompletedTasks/:userId', authentication, getCompletedTasks)
router.get('/getTasksBySortCom/:sortBy/:userId', authentication, getTaskBySortCom)
router.get('/getTasksBySort/:sortBy/:userId', authentication, getTaskBySort)
router.get('/getTask/:Id', authentication, getTaskById)
router.put('/updateStatus/:taskId', authentication, authorization, updateStatus)
router.put('/updateTask/:taskId', authentication, authorization, updateTask)
router.put('/deleteTask/:taskId', authentication, authorization, deleteTask)

module.exports = router