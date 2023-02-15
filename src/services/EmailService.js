require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Nha Khoa IMPLANT 👻" <tienngoc200050@gmail.com>', // sender address
    to: dataSend.receiversEmail, // list of receivers
    subject: "Thông tin đặt lịch hẹn tạo nha khoa IMPLANT ✔", // Subject line
    html: `
    <h3>Xin chào ${dataSend.patientName}</h3>
    <p>Bạn nhận được email này vì đã dặt lịch hẹn online trên website Nha Khoa IMPLANT</p>
    <p>Thông tin đặt lịch:</p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác Sĩ: ${dataSend.doctorName}</b></div>

    <p>Nếu các thông tin trên là đúng sự thật, vui lòng Click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch</p>
    <div>
    <a href="${dataSend.Link}">Click here</a>
    </div>
    <br />
    <div>Xin chân thành cảm ơn</div>
    `, // html body
  });
};

let sendAttachment = (dataSend) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_APP, // generated ethereal user
          pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Nha Khoa IMPLANT 👻" <tienngoc200050@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết Quả đặt lịch hẹn và làm răng ✔", // Subject line
        html: `
    <h3>Xin chào ${dataSend.patientName}</h3>
    <p>Bạn nhận được email này vì đã dặt lịch hẹn online trên website Nha Khoa IMPLANT</p>
    <p>Thông tin hóa đơn được gửi trong file đính kèm</p>

    <div>Xin chân thành cảm ơn</div>
    `,
        attachments: [
          {
            filename: `remedy-${
              dataSend.patientId
            }-${new Date().getTime()}.png`,
            content: dataSend.imgBase64.split("base64,")[1],
            encoding: "base64",
          },
        ],
      });
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = { sendSimpleEmail, sendAttachment };
