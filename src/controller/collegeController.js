const collegeModel=require("../models/collegeModel")
const internModel = require("../models/internModel")
const validator = require('../validator/validator')
const createCollege = async function (req, res) {
    try {

        let { name, fullName,logoLink } = req.body;
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, msg: "invalid request put valid data in body" })
        }
        if (!validator.isValid(name)) {
            return res.status(400).send({ status: false, msg: "name required " })
        }
        

        if (!/^[a-zA-Z]+$/.test(name)) {
            return res.status(400).send({ status: false, message: ` name should be a Character` });
         }
 

         if (!validator.isValid(fullName)) {
            return res.status(400).send({ status: false, msg: " fullName required " })
        }
      
        if (!validator.isValid(logoLink)) {
            return res.status(400).send({ status: false, msg: " logoLink required " })
        }

        const CollegeCreated = await collegeModel.create(req.body);
         return res.status(201).send({ status: true, data: CollegeCreated,msg:"college Successfully Created"  });
        if (!CollegeCreated) {
            return res.status(400).send({ status: false, msg: "not created college data" })
         }           

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
