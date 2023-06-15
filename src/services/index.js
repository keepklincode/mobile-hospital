const {Auth} = require("../models");
require("dotenv").config;
const crypto = require("crypto");
const {constants} = require("../configs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const welcomePage = async (params) => {
    
    return {
        status: true,
        message: "welcome to my home page"
    }

};

const signUp = async (params) => {
  try {
    const { name, hospital, email, password} = params;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Auth.create({
        name,
        hospital,
        email,
        password: hashedPassword
    });
    console.log(hashedPassword);
    
    if(newUser){
        return {
            status: true,
            message: "signup was successfull",
            data: newUser
        }
    }
    
  } catch (error) {
    console.log(error);
    return{
        status: false,
        message: constants.SERVER_ERROR("signUp")
    }
  }
}


const signIn = async (params) => {
    try {

        const {email, password} = params;

        // Find the user in the database
        const user = await Auth.findOne({email});
        console.log(user);
        
        if (!user) {
            return {
                status: false,
                message: "Invalide email"
            }
        };

        // compare the provided password with stored password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return {
                status: false,
                message: "Invalide password"
            }
        };
        // const generateSecretKey = () =>{
        //     return crypto.randomBytes(32).toString("hex");
        // };
        const secretKey = process.env.SECRET

        const token = jwt.sign({ userId: user._id }, secretKey)

        return {
            status: true,
            message: "successfully signin",
            token,
        };
    } catch (error) {
        console.log(error);
        return{
            status: false,
            message: constants.SERVER_ERROR("signin")
        }
        
    }
}
module.exports =  {
    welcomePage,
    signUp,
    signIn
}