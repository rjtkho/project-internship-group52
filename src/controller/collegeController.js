const collegeModel=require("../models/collegeModel")
const createCollege = async function (req, res) {
    try {
        let { name, fullName,logoLink} = req.body;

        if (!name) {
            return res.status(400).send({ status: false, message: "name is required" })

        }
        if (!/^[a-zA-Z]+$/.test(name)) {
            return res.status(400).send({ status: false, message: ` name should be a Character` });
         }
        if(!fullName){
            return res.status(400).send({status:false,message:"fullName is required"})
        }
        if (!/^[a-zA-Z]+$/.test(fullName)) {
            return res.status(400).send({ status: false, message: `Full name should be a Character` });
         }
        if(!logoLink){
            return res.status(400).send({status:false,msg:"logolink is required"})
        }
        const CollegeCreated = await collegeModel.create(req.body);
         return res.status(201).send({ status: true, data: CollegeCreated,msg:"college Successfully Created"  });
        // if (!Data) {
        //     return res.status(400).send({ status: false, msg: "not created college data" })
        // }
       
                  

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}



module.exports.createCollege=createCollege;