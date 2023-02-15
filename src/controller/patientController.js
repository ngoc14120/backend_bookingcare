import patientServices from "../services/patientService";

let handleCreateBookingPatient = async (req, res) => {
  try {
    let info = await patientServices.CreateBookingPatient(req.body);
    return res.status(200).json(info);
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      message: "error from server",
    });
  }
};
let handleVerifyBookingPatient = async (req, res) => {
  try {
    let info = await patientServices.verifyBookingPatient(req.body);
    return res.status(200).json(info);
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      message: "error from server",
    });
  }
};
module.exports = {
  handleCreateBookingPatient,
  handleVerifyBookingPatient,
};
