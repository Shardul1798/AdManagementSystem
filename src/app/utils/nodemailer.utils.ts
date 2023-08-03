import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "Gmail", // Update with your email service (e.g., 'Gmail', 'Outlook')
  host: "box1109.bluehost.com",
  port: 465,
  secure: true,
  auth: {
    user: "shardul.conclusion1@gmail.com", // Replace with your email address
    pass: "yzhoeornrncfgdsv", // Replace with your email password or an app-specific password
  },
});

class NodeMailerConf {
  setMailOptions(email, link) {
    const mailOptions = {
      from: "shardul.conclusion1@gmail.com", // Replace with your email address
      to: email, // Replace with the recipient's email address
      subject: "Reset your Password",
      text: `Please click below to reset your password -`,
      html: `<a href=${link}>Click here</a>`
    };
    return mailOptions;
  }
}

export const mailerConf = new NodeMailerConf();
