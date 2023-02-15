import db from "../models/index";
import dentistService from "../services/dentistService";

let handleGetDentistNew = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await dentistService.getDentistNew(+limit);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      message: "error from server...",
    });
  }
};

let handleGetDentistAll = async (req, res) => {
  try {
    let response = await dentistService.getDentistAll();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      message: "error from server...",
    });
  }
};
let handleCreateDentistInfo = async (req, res) => {
  try {
    let response = await dentistService.createNewInfoDentist(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      message: "error from server...",
    });
  }
};

let handleGetDetailDentistById = async (req, res) => {
  try {
    let response = await dentistService.getDetailDentistById(req.query.id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      message: "error from server...",
    });
  }
};
let handleCreateScheduleDentist = async (req, res) => {
  try {
    let response = await dentistService.CreateScheduleDentist(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      message: "error from server...",
    });
  }
};

let handleGetScheduleDentistByDate = async (req, res) => {
  try {
    let response = await dentistService.GetScheduleDentistByDate(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      message: "error from server...",
    });
  }
};

let handleGetListPatientForDentist = async (req, res) => {
  try {
    let response = await dentistService.getListPatientForDentist(
      req.query.date
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      message: "error from server...",
    });
  }
};

let handleSendBill = async (req, res) => {
  try {
    let response = await dentistService.sendBill(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      message: "error from server...",
    });
  }
};

let handleGetListSchedule = async (req, res) => {
  try {
    let response = await dentistService.getListSchedule(req.query.date);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      message: "error from server...",
    });
  }
};
let handleDeleteSchedule = async (req, res) => {
  if (!req.body.id) {
    return res.status(500).json({
      errCode: 1,
      message: "missing required id",
    });
  }

  let message = await dentistService.deleteSchedule(req.body.id);
  return res.status(200).json(message);
};
module.exports = {
  handleGetDentistNew: handleGetDentistNew,
  handleGetDentistAll: handleGetDentistAll,
  handleCreateDentistInfo: handleCreateDentistInfo,
  handleGetDetailDentistById: handleGetDetailDentistById,
  handleCreateScheduleDentist: handleCreateScheduleDentist,
  handleGetScheduleDentistByDate: handleGetScheduleDentistByDate,
  handleGetListPatientForDentist: handleGetListPatientForDentist,
  handleSendBill: handleSendBill,
  handleGetListSchedule,
  handleDeleteSchedule,
};
