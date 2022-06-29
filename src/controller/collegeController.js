const collegeModel=require("../models/collegeModel")
const internModel = require("../models/internModel")
const createCollege = async function (req, res) {
    try {
        const { name, fullName,logoLink} = req.body;
        const savedCollegeData = await collegeModel.create({ name, fullName,logoLink });
        if (!savedCollegeData) {
            return res.status(400).send({ status: false, msg: "not created college data" })
        }
        return res.status(201).send({ status: true, data:  savedCollegeData });
                  

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}



const getCollegeDetails=async function( req,res){
try { 
        const data = req.query.collegeName
        const collegeDetails = await collegeModel.findOne({ data , isDeteted:false})
        const collegeId=collegeDetails._id

       const getInternDetails = await internModel.find({ collegeId:collegeId , isDeteted:false}).populate("collegeId")   //.select({name:1,fullName:1,logoLink:1})
       if (! getInternDetails) {
           return res.status(404).send({ status: false, msg: "college not found" })
       }
       return res.status(200).send({ status: true, data:  getInternDetails});
                    
        
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }



}

































module.exports.getCollegeDetails=getCollegeDetails
module.exports.createCollege=createCollege