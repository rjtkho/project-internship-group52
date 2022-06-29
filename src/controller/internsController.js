const  mongoose  = require("mongoose")
const collegeModel=require("../models/collegeModel")
const internModel = require("../models/internModel")
const validator = require('../validator/validator')

//================================================Create interns details======================================================
const createInternDetails = async function (req, res) {

        
    try {
        let internData=req.body
        let data = { name, mobile, email, collegeName, } = internData
        
          if(Object.keys(data).length==0) return res.status(400).send({status: false , msg :"Please enter some data"})
       

        const checkMobileNumber = await internModel.findOne({ mobile: mobile});
        if (checkMobileNumber) {
            return res.status(400).send({ status: false, msg: ` ${mobile} mobile number  already exist please enter another mobile number` })
        }

        if (!validator.isValid(name)) {
            return res.status(400).send({ status: false, msg: "name required " })
        }
        if (!validator.isValid(mobile)) {
            return res.status(400).send({ status: false, msg: "mobile required " })
        }

        if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile)) {
            return res.status(400).send({ status: false, message: `mobile should be in 10 digits` });
         }


         if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, msg: "email required " })
        }
        

        const checkEmailId = await internModel.findOne({ email: email});
        if (checkEmailId) {
            return res.status(400).send({ status: false, msg: ` ${email} email already exists please enter another another email` })
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return res.status(400).send({ status: false, message: `Email should be a valid  syntax` });
         }
 

        const findCollege = await collegeModel.findOne({name:collegeName , isDeleted:false})
        if (!findCollege) {
            return res.status(400).send({status: false, data: "college not exists"})
           
        }
        internData.collegeId=findCollege._id
        const saveData = await internModel.create(internData)
        return res.status(201).send({ status: true, data: saveData })
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

//================================================Create interns details======================================================

module.exports.createInternDetails=createInternDetails;