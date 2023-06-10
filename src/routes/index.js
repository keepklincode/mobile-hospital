const { Router } = require("express");
const { response } = require("../helpers");
const homeRoute  = require("../controllers");
const { validate } = require("../middlewares");
const { auth} = require("../validator");


const routes = Router();


routes.get("/", homeRoute.welcomePage);

routes.post("/signup", validate(auth.signup),  homeRoute.signUp);

routes.post("/signin", validate(auth.signin), homeRoute.signIn);

module.exports = routes;
