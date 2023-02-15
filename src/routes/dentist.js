import express from "express";
import dentistController from "../controller/dentistController";

let router = express.Router();

let dentistRouter = (app) => {
  router.post(
    "/api/create-schedule-dentist",
    dentistController.handleCreateScheduleDentist
  );
  router.get(
    "/api/get-schedule-dentist-by-date",
    dentistController.handleGetScheduleDentistByDate
  );
  router.get(
    "/api/get-list-patient-for-dentist",
    dentistController.handleGetListPatientForDentist
  );
  router.get("/api/get-list-schedule", dentistController.handleGetListSchedule);
  router.delete("/api/delete-schedule", dentistController.handleDeleteSchedule);
  router.post("/api/send-bill", dentistController.handleSendBill);
  return app.use("/", router);
};

module.exports = dentistRouter;
