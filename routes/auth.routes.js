import Router  from 'express'
const router = Router()
import {verifyApiKey} from '../middleware/verifyApiKey.js'
import {createUser,updateUser,deleteUser,queryUser,queryUserById,changePassword} from '../controllers/auth.controller.js'
router.post('/createUser',verifyApiKey,createUser)
router.put('/updateUser',verifyApiKey,updateUser)
router.delete('/deleteUser',verifyApiKey,deleteUser)
router.get('/queryUser',verifyApiKey,queryUser)
router.get('/queryUserById',verifyApiKey,queryUserById)
router.put('/changePassword',verifyApiKey,changePassword)

export default router;