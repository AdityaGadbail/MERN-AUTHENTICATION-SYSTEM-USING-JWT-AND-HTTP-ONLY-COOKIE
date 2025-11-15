import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs'

import { userModel } from '../models/userSChema.js'
import transporter from '../config/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE,PASSWORD_RESET_TEMPLATE } from '../config/emailTemplates.js';

export const register = async (req, res) => {
   const { name, email, password } = req.body;

   if (!name || !email || !password) { // If Details are Missing
      return res.json({ success: false, error: "Missing details" });
   }

   try {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
         return res.json({ success: false, error: "User Already Exist" });
      }

      const hashedPassword = await bcryptjs.hash(password, 10);
      const registerUser = new userModel({ name, email, password: hashedPassword });
      await registerUser.save();


      const token = jwt.sign({ id: registerUser._id, }, process.env.JWT_SECRETE, { expiresIn: "7d" })

      res.cookie('token', token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // For same env it will be strict and if hosted then it will none,
         maxAge: 7 * 24 * 60 * 60 * 1000
      })

      // sending welcome email
      const sendEmail = {
         from: process.env.SENDER_EMAIL,
         to: email,
         subject: "Welcome to Aditya's Project",
         html: `<h2>Welcome to Aditya's Project. Your account has been created with email ${email}</h2>`
      }
      await transporter.sendMail(sendEmail)

      return res.json({ success: true, message: " User Created Successfully" })


   } catch (error) {
      return res.json({ success: false, message: error.message })
   }
}

export const login = async (req, res) => {
   const { email, password } = req.body;
   if (!email || !password) {
      return res.json({ success: false, message: "Email and password are required" });
   }
   try {
      const existingUser = await userModel.findOne({ email });
      if (!existingUser) {
         return res.json({ success: false, message: "Invalid Email" });
      }

      const matchPass = await bcryptjs.compare(password, existingUser.password);
      if (!matchPass) {
         return res.json({ success: false, message: "Invalid password" });
      }

      const token = jwt.sign({ id: existingUser._id, }, process.env.JWT_SECRETE, { expiresIn: "7d" })

      res.cookie('token', token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // For same env it will be strict and if hosted then it will none,
         maxAge: 7 * 24 * 60 * 60 * 1000
      })

      return res.json({ success: true, message: " User logged Successfully" })

   } catch (error) {
      console.log({ success: false, message: error.message });
   }
}

export const logOut = async (req, res) => {
   try {
      res.clearCookie('token', {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
      })

      return res.json({ success: true, message: "User log Out Successfully" })
   } catch (error) {
      return res.json({ success: false, message: error.message })
   }
}

// Send verification otp to user email
export const sendVerifyOtp = async (req, res) => {
   try {
      const userId = req.userId;

      const user = await userModel.findById(userId);

      if (user.isAccountVerified) {
         return res.json({ success: false, message: "Account Already Verified" })
      }

      const otp = String(Math.floor(100000 + Math.random() * 900000));

      user.verifyOtp = otp;
      user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
      await user.save();

      const mailOption = {
         from: process.env.SENDER_EMAIL,
         to: user.email,
         subject: "Account Verification OTP ",
         // text: `Here is your ${otp} Verification Otp . Verify your account using this Otp</h2>`,
         html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)
      }
      await transporter.sendMail(mailOption);

      return res.json({ success: true, message: "Verification Otp sent on email" })

   } catch (error) {
      return res.json({ success: false, message: error.message })
   }
}

// verify the email using otp
export const verifyOtp = async (req, res) => {
   const { otp } = req.body;
   const userId = req.userId;

   if (!otp) {
      return res.json({ success: false, message: "Missing OTP" });
   }

   try {
      const user = await userModel.findById(userId);
      if (!user) {
         return res.json({ success: false, message: "User not Found" });
      }

      if (user.verifyOtp === '' || user.verifyOtp !== otp) {
         return res.json({ success: false, message: "Invalid Otp" });
      }

      if (user.verifyOtpExpireAt < Date.now()) {
         return res.json({ success: false, message: "Otp is Expired" });
      }
      user.isAccountVerified = true;
      user.verifyOtp = '';
      user.verifyOtpExpireAt = 0;

      await user.save();

      return res.json({ success: true, message: "Email verified Successfully" });


   } catch (error) {
      return res.json({ success: false, message: error.message });
   }
}

// Check if user is Authenticate
export const isUserAuthenticate = async (req, res) => {
   try {
      return res.json({ success: true })

   } catch (error) {
      return res.json({ success: false, message: error.message })
   }
}

// send password reset otp
export const sendResetOtp = async (req, res) => {
   const { email } = req.body;
   if (!email) {
      return res.json({ success: false, message: "Missing Email" });
   }

   try {
      const user = await userModel.findOne({ email });
      if (!user) {
         return res.json({ success: false, message: "User not Found" });
      }

      const otp = String(Math.floor(100000 + Math.random() * 900000));
      user.resetOtp = otp;
      user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; // 10 minutes expiry
      await user.save();

      const mailOption = {
         from: process.env.SENDER_EMAIL,
         to: user.email,
         subject: "Password Reset OTP  ",
         // text: `Here is your  ${otp} Password reset Otp .`,
         html:PASSWORD_RESET_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)
      }
      await transporter.sendMail(mailOption);

      return res.json({ success: true, message: "Reset Password Otp has sent on email" })

   } catch (error) {
      return res.json({ success: false, message: error.message });

   }

}

// Verify reset OTP
export const verifyResetOtp = async (req, res) => {
   const { email, otp } = req.body;
   if (!email || !otp) {
      return res.json({ success: false, message: "Missing details" });
   }

   try {
      const user = await userModel.findOne({ email });
      if (!user) {
         return res.json({ success: false, message: "User Not found" });
      }

      if (user.resetOtp === '' || user.resetOtp !== otp) {
         return res.json({ success: false, message: "Invalid OTP" });
      }

      if (user.resetOtpExpireAt < Date.now()) {
         return res.json({ success: false, message: "OTP Is Expired" });
      }

      return res.json({ success: true, message: "OTP verified successfully" });

   } catch (error) {
      return res.json({ success: false, message: error.message });
   }
}

// Reset password
export const resetPassword = async (req, res) => {
   const { email, otp, newPassword } = req.body;
   if (!email || !otp || !newPassword) {
      return res.json({ success: false, message: "Missing details" });
   }

   try {
      const user = await userModel.findOne({ email });
      if (!user) {
         return res.json({ success: false, message: "User Not found" });
      }

      if (user.resetOtp === '' || user.resetOtp !==otp) {
         return res.json({ success: false, message: "Invalid OTP" });
      }

      if (user.resetOtpExpireAt < Date.now()) {
         return res.json({ success: false, message: "OTP Is Expired" });
      }
      const hashedPassword = await bcryptjs.hash(newPassword,10);
      user.password = hashedPassword;
      user.resetOtp = '';
      user.resetOtpExpireAt = 0;
      await user.save();
      
      return res.json({ success: true, message: "Password has been reset successfully" })


   } catch (error) {
      return res.json({ success: false, message: error.message })

   }
}