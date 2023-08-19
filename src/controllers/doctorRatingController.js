const {response} = require("../helpers");
const doctorRatingService = require("../services/doctorRatingService");

const rateDoctor = async (req, res) => {
    const data = await doctorRatingService.rateDoctor(req.form);
    return response (res, data);

}

module.exports = {
    rateDoctor
}