const collegeModel=require("../models/collegeModel")
const createCollege = async function (req, res) {
    try {
        const { name, fullName,logoLink} = req.body;
        const savedAuthorData = await collegeModel.create({ name, fullName,logoLink });
        if (!savedAuthorData) {
            return res.status(400).send({ status: false, msg: "not created college data" })
        }
        return res.status(201).send({ status: true, data: savedAuthorData });
                  

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}



module.exports.createCollege=createCollege