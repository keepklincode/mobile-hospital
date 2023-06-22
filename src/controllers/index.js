const { response } = require("../helpers");
const services = require("../services");
const {User} = require("../models");


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

module.exports = { 
    welcomePage,
    signUp,
    signIn
 };