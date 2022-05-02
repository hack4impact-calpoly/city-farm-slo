const Express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");

const router = Express.Router();

// #1 - login admin user
router.post("/login", (req, res) => {
  // use first entry from admin db
  try {
    Admin.findOne({}).then((admin) => {
      res.send({
        success: bcrypt.compareSync(req.body.password, admin.password),
      });
    });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(`error is ${error.message}`);
  }
});

// #2 - edit admin password
// router.post("/edit-password", async (req, res) => {
//   const hashedPassword = bcrypt.hashSync(req.body.password, 10);
//   // use first entry from admin db
//   // create new admin entry if empty
//   await Admin.findOne({}).then(async (admin) => {
//     console.log(admin);
//     if (admin) {
//       // eslint-disable-next-line no-param-reassign
//       admin.password = hashedPassword;
//       await admin.save();
//     } else {
//       const newAdmin = new Admin({
//         password: hashedPassword,
//       });
//       await newAdmin.save();
//     }
//     res.send("Password updated");
//   });
//   res.send("Password not updated");
// });

module.exports = router;
