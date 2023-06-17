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

    // const verificationToken = crypto.randomBytes(32).toString("hex");
  try {
    const { name, phone, email, dob, password, passwordConfirm} = params;
    if (password !== passwordConfirm) {
        return {
          status: false,
          message: 'Password do not match',
        };
      }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Auth.create({
        name,
        phone,
        email,
        dob,
        password: hashedPassword,
        passwordConfirm: hashedPassword

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
};


const signIn = async (params) => {
    try {

        const {email, password} = params;
        // Find the user in the database
        const user = await Auth.findOne({email});
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

const signOut = async () =>{
    try {
        // const token = req.headers.authorization.split(' ')[1];
        
        // if(token) {
            return {
                status: true,
                message: "successfully signed out"
            }
        // }
        
    } catch (error) {
        return {
            status: true,
            message: constants.SERVER_ERROR("signout")
        }
        
    }
}


module.exports =  {
    welcomePage,
    signUp,
    signIn,
    signOut
}