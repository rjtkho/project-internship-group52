const collegeModel=require("../models/collegeModel")
const internModel = require("../models/internModel")
const createInternDetails = async function (req, res) {
    try {
        const id = req.body.collegeId
        let data = { name, mobile, email, collegeName, } = req.body
    
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

//================================================POST interns======================================================

module.exports.createInternDetails=createInternDetails