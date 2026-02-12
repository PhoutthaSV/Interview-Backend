
import {db} from '../db/model/index.js'
import moment from 'moment'
import {comparePassword,hashPassword} from '../utils/checkPassword.js'
const {Permision,User}=db
export const createUser = async (req,res)=>{
    const suerId = req.body.suerId
    const perId = req.body.perId
    const userPassword = req.body.userPassword
    const userName = req.body.userName
    const userAdress = req.body.userAdress
    const userAge = req.body.userAge
    const userTel = req.body.userTel
    if (!suerId)  return res.status(400).json({resultCode : 400 , resultDesc : "suerId are required" ,detail: null});
    if (!perId)  return res.status(400).json({resultCode : 400 , resultDesc : "perId are required" ,detail: null});
    if (!userPassword)  return res.status(400).json({resultCode : 400 , resultDesc : "userPassword are required" ,detail: null});
    if (!userName)  return res.status(400).json({resultCode : 400 , resultDesc : "userName are required" ,detail: null});
    if (!userAdress)  return res.status(400).json({resultCode : 400 , resultDesc : "userAdress are required" ,detail: null});
    if (!userAge)  return res.status(400).json({resultCode : 400 , resultDesc : "userAge are required" ,detail: null});
    if (!userTel)  return res.status(400).json({resultCode : 400 , resultDesc : "userTel are required" ,detail: null});
    try {
        // ============= check User ================================
        const checkUser = await User.findOne({
            where : {suerId : suerId}
        })
        if (checkUser) return res.status(400).json({resultCode : 400 , resultDesc : `This user already exists` ,detail: null});
        // ================ check permision ========================
        const checkPermision = await Permision.findOne({
            where : {perId}
        })
         if (!checkPermision) return res.status(400).json({resultCode : 400 , resultDesc : `permission is invalid` ,detail: null});
        
         // ==============  hashedPassword  ===============
        const hashedPassword = await hashPassword(userPassword);

        await User.create({
            suerId ,
            perId ,
            userPassword : hashedPassword,
            userName ,
            userAdress ,
            userAge ,
            userTel ,
            userStatus : 1,
            CredateDateAt : moment(new Date()).format("YYYY-MM-DD HH:mm:ss.SS"),
            UpdateDateAt : moment(new Date()).format("YYYY-MM-DD HH:mm:ss.SS"),
        })
        return res.status(200).json({resultCode : 200 , resultDesc : "User create successfully." ,detail:null});
    } catch (error) {
         return res.status(400).json({resultCode : 400 , resultDesc : 'Something went wrong' ,detail:null});
    }
}
export const updateUser = async (req,res)=>{
    const suerId = req.query.suerId
    const perId = req.body.perId
    const userName = req.body.userName
    const userAdress = req.body.userAdress
    const userAge = req.body.userAge
    const userTel = req.body.userTel
    if (!suerId)  return res.status(400).json({resultCode : 400 , resultDesc : "suerId are required" ,detail: null});
    if (!perId)  return res.status(400).json({resultCode : 400 , resultDesc : "perId are required" ,detail: null});
    if (!userName)  return res.status(400).json({resultCode : 400 , resultDesc : "userName are required" ,detail: null});
    if (!userAdress)  return res.status(400).json({resultCode : 400 , resultDesc : "userAdress are required" ,detail: null});
    if (!userAge)  return res.status(400).json({resultCode : 400 , resultDesc : "userAge are required" ,detail: null});
    if (!userTel)  return res.status(400).json({resultCode : 400 , resultDesc : "userTel are required" ,detail: null});
    try {
        // ============= check User ================================
        const checkUser = await User.findOne({
            where : {suerId : suerId}
        })
        if (!checkUser) return res.status(400).json({resultCode : 400 , resultDesc : `User is invalid` ,detail: null});
        // ================ check permision ========================
        const checkPermision = await Permision.findOne({
            where : {perId}
        })
         if (!checkPermision) return res.status(400).json({resultCode : 400 , resultDesc : `permission is invalid` ,detail: null});

        await User.update({
            suerId ,
            perId ,
            userName ,
            userAdress ,
            userAge ,
            userTel ,
            UpdateDateAt : moment(new Date()).format("YYYY-MM-DD HH:mm:ss.SS"),
        },{
            where : {suerId}
        })
        return res.status(200).json({resultCode : 200 , resultDesc : "User updated successfully." ,detail:null});
    } catch (error) {
         return res.status(400).json({resultCode : 400 , resultDesc : 'Something went wrong' ,detail:null});
    }
}
export const deleteUser = async (req,res)=>{
    const suerId = req.query.suerId
    if (!suerId)  return res.status(400).json({resultCode : 400 , resultDesc : "suerId are required" ,detail: null});
    try {
        // ============= check User ================================
        const checkUser = await User.findOne({
            where : {suerId : suerId}
        })
        if (!checkUser) return res.status(400).json({resultCode : 400 , resultDesc : `User is invalid` ,detail: null});
        await User.destroy({
            where : {suerId}
        })
        return res.status(200).json({resultCode : 200 , resultDesc : "User deleted successfully." ,detail:null});
    } catch (error) {
         return res.status(400).json({resultCode : 400 , resultDesc : 'Something went wrong' ,detail:null});
    }
}
export const queryUser = async (req,res)=>{
    try {
        const getUser = await User.findAll({
            include : [{
                model : Permision,
                as :'permision',
                attributes : ['perId','perName']
            }]
        })
        if (!getUser) return res.status(206).json({resultCode : 206 , resultDesc : `No information` ,detail: []});
        return res.status(200).json({resultCode : 200 , resultDesc : "Operation successfully." ,detail:getUser});
    } catch (error) {
        // return res.status(400).json({resultCode : 400 , resultDesc : error.message ,detail: null});
         return res.status(400).json({resultCode : 400 , resultDesc : 'Something went wrong' ,detail:null});
    }
}
export const queryUserById = async (req,res)=>{
    const suerId = req.query.suerId
    if (!suerId)  return res.status(400).json({resultCode : 400 , resultDesc : "suerId are required" ,detail: null});
    try {
        const getUser = await User.findOne({
            where : {suerId},
            include : [{
                model : Permision,
                as :'permision'
            }]
        })
        if (!getUser) return res.status(206).json({resultCode : 206 , resultDesc : `No information` ,detail: null});
        return res.status(200).json({resultCode : 200 , resultDesc : "User deleted successfully." ,detail:getUser});
    } catch (error) {
         return res.status(400).json({resultCode : 400 , resultDesc : 'Something went wrong' ,detail:null});
    }
}

export const changePassword = async (req,res)=>{
    const oldPass = req.query.oldPass
    const newPass = req.query.newPass
    const suerId = req.query.suerId
    if (!oldPass)  return res.status(400).json({resultCode : 400 , resultDesc : "Old password are required" ,detail: null});
    if (!newPass)  return res.status(400).json({resultCode : 400 , resultDesc : "New password are required" ,detail: null});
    if (!suerId)  return res.status(400).json({resultCode : 400 , resultDesc : "msisdn are required" ,detail: null});
    try {
        const findUser = await User.findOne({where : {suerId},attributes :['userPassword']})

        if (!findUser) return res.status(400).json({resultCode : 400 , resultDesc : `User is invalid` ,detail: null});
        // ================ is match password ============================
        const isMatch = await comparePassword(oldPass,findUser.dataValues.userPassword)
        if (isMatch.resultStatus === false)  return res.status(400).json({resultCode : 400 , resultDesc : "Old password is incorrect" ,detail:null});
        
       const newHashPsw = await hashPassword(newPass)

        await User.update({
            userPassword : newHashPsw,
            UpdateDateAt : moment(new Date()).format("YYYY-MM-DD HH:mm:ss.SS")
        },
        {
            where :{suerId}
        });

        return res.status(200).json({resultCode : 200 , resultDesc : "User changed password successfully." ,detail:null});
    } catch (error) {
        // return res.status(400).json({resultCode : 400 , resultDesc : error.message ,detail: null});
        return res.status(400).json({resultCode : 400 , resultDesc : 'Something went wrong' ,detail:null});
    }
}
