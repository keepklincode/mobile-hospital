require("dotenv").config;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Auth } = require("../models");
const { constants } = require("../configs");
const { globalFunctions } = require("../helpers");

const welcomePage = async (params) => {
  return {
    status: true,
    message: "welcome to my home page",
  };
};

const signUp = async (params) => {
  // const verificationToken = crypto.randomBytes(32).toString("hex");
  try {
    const { name, phone, email, dob, password, passwordConfirm } = params;
    if (password !== passwordConfirm) {
      return {
        status: false,
        message: "Password do not match",
      };
    }
    const existingEmail = await Auth.findOne({ email });
    if (existingEmail) {
      return {
        status: false,
        message: "email alsready exist",
      };
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

    const secretKey = process.env.SECRET;
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
      secretKey
    );

    if (newUser) {
      return {
        status: true,
        message: "signup was successfull",
        token,
        data,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: constants.SERVER_ERROR("signUp"),
    };
  }
};

const signIn = async (params) => {
  try {
    const { email, password } = params;
    // Find the user in the database
    const existingUser = await Auth.findOne({ email });

    if (!existingUser) {
      return {
        status: false,
        message: "Invalide email/user not found",
      };
    }

    // compare the provided password with stored password in the database
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return {
        status: false,
        message: "Invalide password",
      };
    }

    const data = globalFunctions.dataStripper(existingUser);
    const secretKey = process.env.SECRET;
    // const token = jwt.sign({ userId: user._id }, secretKey)
    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
      },
      secretKey
    );
    console.log(data);

    return {
      status: true,
      message: "successfully signin",
      token,
      data,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: constants.SERVER_ERROR("signin"),
    };
  }
};

const onBoarding = async (params) => {
  try {
    const { gender, patientId, id: authId } = params;
    const getUser = await Auth.findOne({ _id: authId });
    if (getUser.hasOnboarded == true) {
      return {
        status: false,
        message: "this user has already onboarded",
      };
    }
    getUser.gender = gender;
    getUser.patientId = patientId;
    getUser.hasOnboarded = true;
    getUser.save();

    const data = globalFunctions.dataStripper(getUser);
    return {
      status: true,
      message: "unboarded successfully",
      data: getUser,
      data,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: constants.SERVER_ERROR("unboarding"),
    };
  }
};

const userData = async (params) => {
  console.log(params);

  try {
    const { email } = params;
    const currentUser = await Auth.findOne({ email });
    const data = globalFunctions.dataStripper(currentUser);

    if (currentUser) {
      return {
        status: true,
        message: "success",
        data,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: constants.SERVER_ERROR("userData"),
    };
  }
};

const updateUser = async (params) => {
  // console.log
  try {
    // // const {email, name, patientId, phone, id} = params;
    // const { id} = params;
    // const userUpdated = await Auth.findByIdAndUpdate({ _id: id });

    // // console.log(userUpdate)
    // if (!userUpdated) {
    //   return {
    //     status: false,
    //     message: "user not found",
    //   };
    // }
    
    // userUpdated.email = email,
    // // userUpdated.name = name,
    // userUpdated.patientId = patientId,
    // userUpdated.phone = phone,
    // userUpdated.save();

// return{
//     status: true,
//     message: "successful",
//     userUpdated
    
// }

const { id, email, name, patientId, phone } = params;
    
// Find the user in the database
const existingUser = await Auth.findOne({ _id: id });


if (!existingUser) {
  return {
    status: false,
    message: "User not found",
  };
}

// Update the user data
existingUser.email = email || existingUser.email;
existingUser.name = name || existingUser.name;
existingUser.patientId = patientId || existingUser.patientId;
existingUser.phone = phone || existingUser.phone;

// Save the updated user
await existingUser.save();
const data = globalFunctions.dataStripper(existingUser);
console.log(existingUser)
return {
  status: true,
  message: "User data updated successfully",
  existingUser,
  data
};
  } catch (error) {
    return {
      status: false,
      message: constants.SERVER_ERROR("userData"),
    };
  }
};

module.exports = {
  welcomePage,
  signUp,
  signIn,
  onBoarding,
  userData,
  updateUser,
};
