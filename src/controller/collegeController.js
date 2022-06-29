const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const createCollege = async function (req, res) {
    try {

        let { name, fullName, logoLink } = req.body;

        if (!name) {
            return res.status(400).send({ status: false, message: "name is required" })

        }
        if (!/^[a-zA-Z]+$/.test(name)) {
            return res.status(400).send({ status: false, message: ` name should be a Character` });
        }
        if (!fullName) {
            return res.status(400).send({ status: false, message: "fullName is required" })
        }
        if (!/^[a-zA-Z]+$/.test(fullName)) {
            return res.status(400).send({ status: false, message: `Full name should be a Character` });
        }
        if (!logoLink) {
            return res.status(400).send({ status: false, msg: "logolink is required" })
        }
        const CollegeCreated = await collegeModel.create(req.body);
        return res.status(201).send({ status: true, data: CollegeCreated, msg: "college Successfully Created" });
        // if (!Data) {
        //     return res.status(400).send({ status: false, msg: "not created college data" })
        // }







    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

//get college details

const getCollegeDetails = async function (req, res) {
    try {
        let collegeName = req.query.collegeName;

        // request query params  validation

        if (!collegeName) {
            return res.status(400).send({ status: false, msg: "please provide college name in query params" })
        }

        

        // college validation 

        let collegeDetail = await collegeModel.findOne({ name: collegeName, isDeleted: false  })
        if (!collegeDetail) {
            return res.status(400).send({ status: false, msg: "college not found please provide valid college name" })
        }



        let collegeDetail1 = await collegeModel.findOne({ name: collegeName, isDeleted: false }).select({ name: 1, fullName: 1, logoLink: 1, _id: 0 })
        let internDetail = await internModel.find({ collegeId: collegeDetail._id, isDeleted: false })

        let result = {
            name: collegeDetail1.name,
            fullName: collegeDetail1.fullName,
            logoLink: collegeDetail1.logoLink,
            interns: internDetail
        }
        return res.status(200).send({ status: true, data: result })

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

}


module.exports. getCollegeDetails =  getCollegeDetails;
module.exports.createCollege = createCollege;
