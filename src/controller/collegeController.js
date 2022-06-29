const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const validator = require('../validator/validator')


//================================================Create College======================================================

const createCollege = async function (req, res) {
    try {

        let { name, fullName, logoLink } = req.body;
        

        if(Object.keys(req.body).length==0) return res.status(400).send({status: false , msg :"Please enter some data"})
      

       
        
        if (!validator.isValid(name)) {
            return res.status(400).send({ status: false, msg: "name required " })
        }


        if (!/^[a-z]+$/.test(name)) {
            return res.status(400).send({ status: false, message: ` ${name} name should be a Character and lowerCase` });
        }
        if (!fullName) {
            return res.status(400).send({ status: false, message: "fullName is required" })
        }
        if (!logoLink) {
            return res.status(400).send({ status: false, msg: "logolink is required" })
        }

        if(!/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(logoLink))
        {
            return res.status(400).send({ status: false, msg: " Please provide valid  logolink " })
        }
        const collegeCreated = await collegeModel.create(req.body);
        return res.status(201).send({ status: true, data: collegeCreated, msg: "college Successfully Created" });


    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}


//================================================Get College Deatails======================================================



const getInternDeatails = async function (req, res) {

    try {
        let collegeName = req.query.collegeName; 
        
         if (!validator.isValid(collegeName)) {
             res.status(400).send({ status: false, msg: "Enter a College Name in the query parameter" });
             return
         }

        let findCollege = await collegeModel.findOne({ name: collegeName })
        if (!findCollege) return res.status(404).send({ status: false, msg: "No College Found" });
        
        
        let Intern = await internModel.find({ collegeId: findCollege }).select({ name: 1, email: 1, mobile: 1 });
        if(Intern.length==0){
            res.status(404).send({ status: false, msg: " No Intern Found" });
            return
        }
        let collegeAndAllIntern={   
            "name" : findCollege.name,
            "fullName" : findCollege.fullName,
            "logoLink" : findCollege.logoLink,
            "interns" : Intern
        }
        
        res.status(200).send({data: collegeAndAllIntern }) 
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}




module.exports.getInternDeatails = getInternDeatails;
module.exports.createCollege = createCollege;
