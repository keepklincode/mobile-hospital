const express = require("express");
const { response } = require("../helpers");
const homeRoute  = require("../controllers");
const { validate } = require("../middlewares");
const appointmentController = require("../controllers/appointment");
const doctorController = require("../controllers/doctorController");
const availableController = require("../controllers/availableController")

const { auth, appointment, doctorsValidator, availableValidator} = require("../validator");


const routes = express.Router();

//User Route
routes.get("/", homeRoute.welcomePage);
routes.post("/signup", validate(auth.signup),  homeRoute.signUp);
routes.post("/signin", validate(auth.signin), homeRoute.signIn);
routes.post("/onboarding", validate(auth.onBoarding), homeRoute.onBoarding);

routes.get("/userData", validate(auth.userData), homeRoute.userData);

routes.put("/updateUser", validate(auth.updateUser), homeRoute.updateUser);

routes.delete("/deleteUser", validate(auth.deleteUser), homeRoute.deleteUser);

//Appointment Route
routes.post("/appointment", validate(appointment.createAppointment), appointmentController.createAppointment);

// Doctor Route
routes.post("/doctorsSignup", validate(doctorsValidator.doctorsSignup), doctorController.doctorsSignup);
routes.post("/doctorsSignin", validate(doctorsValidator.doctorsSignin), doctorController.doctorsSignin);

routes.put("/doctorsUpdate", validate(doctorsValidator.doctorsUpdate), doctorController.doctorsUpdate);

routes.get("/doctorsData", validate(doctorsValidator.doctorsData), doctorController.doctorsData);

routes.delete("/doctorsDelete", validate(doctorsValidator.doctorsDelete), doctorController.doctorsDelete);

routes.post("/available", validate(availableValidator.availableDr), availableController.availableDr);



module.exports = routes;
