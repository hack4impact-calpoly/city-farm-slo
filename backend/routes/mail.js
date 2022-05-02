const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

require("dotenv").config();

if (
  !process.env.EMAIL_SERVICE ||
  !process.env.EMAIL_USER ||
  !process.env.EMAIL_PASS
) {
  console.warn("Missing environment variables for email login");
}

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// #1 - email user about event
router.post("/register", async (req, res) => {
  const { user, event } = req.body;
  try {
    transporter.sendMail(
      {
        from: `City Farm SLO ${process.env.EMAIL_USER}`,
        to: user.email,
        subject: `Registered for ${event}`,
        html: `<p>Hello ${user.firstName} ${user.lastName},</p>
            <p>You are registered for:</p>
            <code>${event}</code>`,
      },
      (error, info) => {
        if (error) {
          res.send(error);
        } else {
          res.send(`Email sent: ${info.response}`);
        }
      }
    );
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
