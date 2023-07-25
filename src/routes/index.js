const express = require("express");
const { response } = require("../helpers");
const homeRoute  = require("../controllers");
const { validate } = require("../middlewares");
const { auth} = require("../validator");


const routes = express.Router();


routes.get("/", homeRoute.welcomePage);
routes.post("/signup", validate(auth.signup),  homeRoute.signUp);
routes.post("/signin", validate(auth.signin), homeRoute.signIn);
routes.post("/onboarding", validate(auth.onBoarding), homeRoute.onBoarding)

routes.get("/userData", validate(auth.userData), homeRoute.userData);

routes.put("/updateUser", validate(auth.updateUser), homeRoute.updateUser);

routes.delete("/deleteUser", validate(auth.deleteUser), homeRoute.deleteUser);



module.exports = routes;
