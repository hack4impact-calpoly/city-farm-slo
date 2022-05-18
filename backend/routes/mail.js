const express = require("express");
const nodemailer = require("nodemailer");
const dayjs = require("dayjs");

const router = express.Router();

require("dotenv").config();

if (
  !process.env.EMAIL_SERVICE ||
  !process.env.EMAIL_USER ||
  !process.env.EMAIL_PASS ||
  !process.env.SEND_EMAIL
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
  if (process.env.SEND_EMAIL !== "True") {
    res.send("No email sent");
    return;
  }

  try {
    transporter.sendMail(
      {
        from: `City Farm SLO ${process.env.EMAIL_USER}`,
        to: user.email,
        subject: `Registered for ${event.title}`,
        html: `<p>Hello ${user.firstName} ${user.lastName},</p>

            <p>Thanks so much for signing up to volunteer at City Farm SLO! 
            You are registered for ${event.title} 
            on ${dayjs(event.start).format("MMM D, YYYY")} 
            from ${dayjs(event.start).format("h:mm A")} 
            to ${dayjs(event.end).format("h:mm A")}.
            ${event.notes ?? ""}</p>

            <p>Our address is 1221 Calle Joaquin, San Luis Obispo. 
            Follow signage along the dirt road to parking outside of our gates. 
            Please remember to bring water and sun protection. 
            Feel free to reach out to info@cityfarmslo.org or (805) 769-8344 if you have any questions!</p>
            
            <p>Be sure to follow us on 
            <a href="https://www.facebook.com/CityFarmSLO/">Facebook</a> 
            and <a href="https://www.instagram.com/cityfarmslo/">Instagram</a> 
            @cityfarmslo and subscribe to our newsletter for the latest updates!</p>
            
            <p>Thanks,
            <br>City Farm SLO</p>`,
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
