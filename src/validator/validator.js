
const isValid = (value) => {

    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false;
    if (typeof value === "string") { return true }
    else {
        return false
    }
}



const isValidNumber= (value)=>{if (typeof value === "number" ) return true}
module.exports.isValid = isValid;
module.exports.isValidNumber = isValidNumber;
