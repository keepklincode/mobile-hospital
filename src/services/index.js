const welcomePage = async (params) => {
    
    return {
        status: true,
        message: "welcome to my home page"
    }
};

const signUp = async (params) => {
    console.log(params)
    return {
        status: true,
        message: "successfully signed up"
    }
}


const signIn = async (params) => {
    return {
        status: true,
        message: "successfully signed in"
    }
}
module.exports =  {
    welcomePage,
    signUp,
    signIn
}