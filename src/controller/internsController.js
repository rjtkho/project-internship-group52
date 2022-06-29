const  mongoose  = require("mongoose")
const collegeModel=require("../models/collegeModel")
const internModel = require("../models/internModel")

//================================================Create interns details======================================================
const createInternDetails = async function (req, res) {
    try {
        const id = req.body.collegeId
        let data = { name, mobile, email, collegeName, } = req.body
        
        const checkMobileNumber = await internModel.findOne({ mobile: mobile});
        if (checkMobileNumber) {
            return res.status(400).send({ status: false, msg: ` ${mobile} mobile number  already exist please enter another mobile number` })
        }

        const checkEmailId = await internModel.findOne({ email: email});
        if (checkEmailId) {
            return res.status(400).send({ status: false, msg: ` ${email} email already exists please enter another another email` })
        }

        const findCollege = await collegeModel.findById(id)
        if (!findCollege) {
            return res.status(400).send({status: false, data: "college not exists"})
           
        }
        const saveData = await internModel.create(data)
        return res.status(201).send({ status: true, data: saveData })
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

//================================================Create interns details======================================================

module.exports.createInternDetails=createInternDetails;