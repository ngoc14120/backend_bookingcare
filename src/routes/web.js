import express from "express";
import userControllers from "../controller/userController";
import dentistController from "../controller/dentistController";
import patientControllers from "../controller/patientController";

let router = express.Router();

let initWebRouter = (app) => {
  router.post("/api/login", userControllers.handleLogin);
  router.post("/api/register", userControllers.handleRegister);
  router.get("/api/get-all-users", userControllers.handleGetAllUsers);
  router.post("/api/create-new-user", userControllers.handleCreateNewUser);
  router.put("/api/edit-user", userControllers.handleEditUser);
  router.delete("/api/delete-user", userControllers.handleDeleteUser);
  router.get("/api/allcode", userControllers.getAllCode);
  router.get("/api/get-dentist-new", dentistController.handleGetDentistNew);
  router.get("/api/get-dentist-all", dentistController.handleGetDentistAll);
  router.post(
    "/api/create-dentist-info",
    dentistController.handleCreateDentistInfo
  );
  router.get(
    "/api/get-detail-dentist-by-id",
    dentistController.handleGetDetailDentistById
  );
  // api dịch Vụ
  router.post(
    "/api/create-new-service",
    userControllers.handleCreateNewService
  );
  router.post(
    "/api/create-service-info",
    userControllers.handleCreateServiceInfo
  );
  router.get("/api/get-service-all", userControllers.handleGetServiceAll);
  router.get(
    "/api/get-service-all-limit",
    userControllers.handleGetServiceAllLimit
  );
  router.get(
    "/api/get-detail-service-by-id",
    userControllers.handleGetDetailServiceById
  );
  router.delete("/api/delete-service", userControllers.handleDeleteService);
  // router booking
  router.post(
    "/api/patient-booking",
    patientControllers.handleCreateBookingPatient
  );
  router.post(
    "/api/verify-patient-booking",
    patientControllers.handleVerifyBookingPatient
  );
  return app.use("/", router);
};

module.exports = initWebRouter;
