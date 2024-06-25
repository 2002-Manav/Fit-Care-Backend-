// const Login = (req, res) => {
//     res.send("vgfctggghv")
//   }

//   module.exports={Login}

const model = require("../models/Gymmodels");
const encrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "mohkarohan@gmail.com",
    pass: "zqvn yyym pamf cxdx",
  },
});

const registerGym = (req, res) => {
  let { GymName, Email, Password, PhoneNo, GSTNo, OwnerName, City, Address } =
    req.body;

  // Check if the USER ALREADY EXISTS
  model
    .findOne({ GymName, Email })
    .then((data) => {
      if (data) {
        res.send("User already exists");
      } else {
        const bpass = encrypt.hashSync(Password, 10);

        const newData = new model({
          GymName,
          Email,
          Password: bpass,
          PhoneNo,
          GSTNo,
          Address,
          OwnerName,
          City,
        });

        newData
          .save()
          .then(() => {
            // Send email notification
            const mailOptions = {
              from: {
                name: "Fit-Care",
                address: "mohkarohan@gmail.com",
              },
              to: "manavmadlani49@gmail.com",
              subject: "Registration Confirmation",
              text: `Hello ${OwnerName},\n\nThank you for registering your gym with us.\n Your login credentials are:\nEmail: ${Email}\nPassword: ${Password}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error("Error sending email:", error);
              } else {
                console.log("Email sent:", info.response);
              }
            });

            res.send({
              isSuccess: true,
              msg: "Gym registered successfully",
              data: newData,
            });
          })
          .catch((err) => {
            res.send({ isSuccess: false, msg: "Cannot register", err });
          });
      }
    })
    .catch((err) => {
      res.send({ isSuccess: false, msg: "Database error", err });
    });
};

const Login = (req, res) => {
  model
    .findOne({ GymName: req.body.GymName })
    .then((data) => {
      if (data) {
        const verify = encrypt.compareSync(req.body.Password, data.Password);
        if (verify && data.GymName == req.body.GymName) {
          const token = jwt.sign({ data }, "rohan");

          // Send email notification
          const mailOptions = {
            from: {
              name: "Fit-Care",
              address: "mohkarohan@gmail.com",
            },
            to: "manavmadlani49@gmail.com", // Send the email to the gym's registered email address
            subject: "Login Notification",
            text: `Hello ${data.OwnerName},\n\nYour gym account was logged in successfully.`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email:", error);
            } else {
              console.log("Email sent:", info.response);
            }
          });

          res.send({ isSuccess: true, msg: "Login successful", token });
        } else {
          res.send({
            isSuccess: false,
            msg: "Username or password not correct",
          });
        }
      } else {
        res.send({ isSuccess: false, msg: "User not found" });
      }
    })
    .catch((err) => {
      res.send({ isSuccess: false, msg: "Error in login", err });
    });
};


// const forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   try {
//     // Find gym user by email
//     const gymUser = await GymModel.findOne({ Email: email });
//     if (!gymUser) {
//       return res.status(404).json({ message: "Gym user not found" });
//     }

//     // Generate a unique password reset token
//     const resetToken = generateResetToken();

//     // Set the reset token and expiration time in the database
//     gymUser.resetPasswordToken = resetToken;
//     gymUser.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
//     await gymUser.save();

//     // Send email with the password reset link
//     const resetLink = `http://yourwebsite.com/reset-password/${resetToken}`;
//     const mailOptions = {
//       from: {
//         name: "Fit-Care",
//         address:"mohkarohan@gmail.com"
//       },
//       to: "manavmadlani49@gmail.com",
//       subject: "Reset Your Password",
//       text:
//         `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n` +
//         `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
//         `${resetLink}\n\n` +
//         `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error("Error sending email:", error);
//         return res.status(500).json({ message: "Failed to send email" });
//       }
//       console.log("Email sent:", info.response);
//       res.status(200).json({ message: "Password reset email sent" });
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Helper function to generate a unique token
// const generateResetToken = () => {
//   return Math.random().toString(36).slice(2);
// };



module.exports = { registerGym, Login};
