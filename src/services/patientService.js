import db from "../models/index";
require("dotenv").config();
import _ from "lodash";
import EmailService from "./EmailService";
import { v4 as uuidv4 } from "uuid";

let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};

let CreateBookingPatient = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.timeType ||
        !data.fullName ||
        !data.date
      ) {
        resolve({
          errCode: 1,
          message: "missing parameter",
        });
      } else {
        let token = uuidv4();
        await EmailService.sendSimpleEmail({
          receiversEmail: data.email,
          patientName: data.fullName,
          time: data.timeString,
          doctorName: data.doctorName,
          Link: buildUrlEmail(data.doctorId, token),
        });

        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
            firstName: data.fullName,
            phoneNumber: data.phoneNumber,
            address: data.address,
            gender: data.gender,
          },
        });
        if (user && user[0]) {
          let booking = await db.Booking.findOrCreate({
            where: { patientId: user[0].id },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
          });
        }
        resolve({
          errCode: 0,
          message: "ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let verifyBookingPatient = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          message: "missing parameter",
        });
      } else {
        let booking = await db.Booking.findOne({
          where: { doctorId: data.doctorId, token: data.token, statusId: "S1" },
          raw: false,
        });
        if (booking) {
          booking.statusId = "S2";
          await booking.save();
          resolve({
            errCode: 0,
            message: "ok",
          });
        } else {
          resolve({
            errCode: 2,
            message: "Booking has been activated or does not exits",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  CreateBookingPatient,
  verifyBookingPatient,
};
