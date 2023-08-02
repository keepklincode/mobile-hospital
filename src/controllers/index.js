const { response } = require("../helpers");
const services = require("../services");


const welcomePage =  async ( req, res) => {
    const data = await services.welcomePage(req);
    return   response(res, data);
} ;

const signUp = async (req, res) =>{ 
    const data = await services.signUp(req.form);
    return response(res, data)
}

const signIn = async (req, res) => {
    const data = await services.signIn(req.form);
    return response (res, data);
}

const onBoarding = async (req, res) =>{
    console.log(req.form)
    const data = await  services.onBoarding(req.form);
    return response (res, data)
}

const userData = async (req, res) =>{
    const data = await services.userData(req.form);
    return response (res, data)
}

const updateUser = async (req, res) =>{
    const data = await services.updateUser(req.form);
    return response (res, data)
}

const deleteUser = async (req, res) => {
    console.log(req.form);
    const data = await services.deleteUser(req.form);
    return response (res, data)
}

// const createAppointment =  async (req, res) =>{ 
//     const data = await appointment.createAppointment(req.form);
//     return response(res, data)
// }

module.exports = { 
    welcomePage,
    signUp,
    signIn,
    onBoarding,
    userData,
    updateUser,
    deleteUser,
    // createAppointment
 };