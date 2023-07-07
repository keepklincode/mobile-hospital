
require("dotenv").config;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const {Auth} = require("../models");
const {constants} = require("../configs");
const {globalFunctions} = require("../helpers")

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
      const existingEmail = await Auth.findOne({email});
      if(existingEmail){
        return{
            status: false,
            message: "email alsready exist"
        }
      }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Auth.create({
        name,
        phone,
        email,
        dob,
        password: hashedPassword,

    });
    // console.log(hashedPassword);

    const data = globalFunctions.dataStripper(newUser);

    const secretKey = process.env.SECRET
    const token = jwt.sign({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
       },
        secretKey,
        );

    if(newUser){
        return {
            status: true,
            message: "signup was successfull",
            token,
            data
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
        const existingUser = await Auth.findOne({email});
        
        if (!existingUser) {
            return {
                status: false,
                message: "Invalide email/user not found"
            }
        };

        // compare the provided password with stored password in the database
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            return {
                status: false,
                message: "Invalide password"
            }
        };

        const data = globalFunctions.dataStripper(existingUser);
        const secretKey = process.env.SECRET
        // const token = jwt.sign({ userId: user._id }, secretKey)
        const token = jwt.sign({
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name
           },
            secretKey,
            );
            console.log(data)
        
        return {
            status: true,
            message: "successfully signin",
            token,
            data
        };
        
    } catch (error) {
        console.log(error);
        return{
            status: false,
            message: constants.SERVER_ERROR("signin")
        }
        
    }
}

const onBoarding = async (params) => {

    try {
        const {gender, patientId, id:authId} = params;
        const getUser = await Auth.findOne({_id: authId})
        if (getUser.hasOnboarded == true) {
            return {
                status: false,
                message: "this user has already onboarded"
            }
        }
        getUser.gender = gender;
        getUser.patientId = patientId;
        getUser.hasOnboarded = true
        getUser.save();
        

        const data = globalFunctions.dataStripper(getUser);
        return {
            status: true,
            message: "unboarded successfully",
            data: getUser,
            data
        }
        
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: constants.SERVER_ERROR("unboarding")
        }
        
    }

}

const userData = async (params) =>{
    try {
        const {id} = (params) 
        const fetch = await Auth.findById({_id: id});


        if (fect){
        // const fetch = fetchUserDataFromDatabase(params);
        return {
            status: true,
            message: "successfull",
            fetch
        }
    }
        
    } catch (error) {
        return{
            status: false,
            message: constants.SERVER_ERROR("userData")
        }
        
    }
}




module.exports =  {
    welcomePage,
    signUp,
    signIn,
    onBoarding,
    userData
}