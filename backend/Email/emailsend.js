import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';


// Create a transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // SMTP server
  port: 587, // Port for TLS
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSCODE,
  },
});

export const sendEmail = async ( staffname , email , password , staffId , department , role) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL, 
      to : email, 
      subject : "Welcome Invitation",
      text : "", 
      html : ` <div style="font-family: Arial, sans-serif; line-height: 1.8; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; background-color: #fff;">
      <div style="background-color: #D32F2F; padding: 15px; border-radius: 8px 8px 0 0; text-align: center;">
        <h2 style="color : white; margin: 0;">Welcome to ExamShelf, ${staffname}.</h2>
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 16px;">Dear ${staffname},</p>   
        <p style="font-size: 16px;">We are pleased to welcome you to <strong>ExamShelf</strong>, our dedicated platform for managing and organizing academic resources within the college. As a valued member of our faculty, you now have access to tools that simplify question paper.</p>
        <h3 style="color: #D32F2F; margin-top: 20px;">Your Account Details</h3>
        <p><strong>Name:</strong> ${staffname}</p>
        <p><strong>Staff ID:</strong> ${staffId}</p>
        <p><strong>Department:</strong> ${department}</p>
        <p><strong>Role:</strong> ${role}</p>
        <h3 style="color: #D32F2F; margin-top: 20px;">Access Information</h3>
        <p><strong>Login Email:</strong> ${email}</p>
        <p><strong>Permanent Password:</strong> ${password}</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href=${process.env.APPLICATION_URL} target="_blank" 
             style="background-color: #D32F2F; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 16px; font-weight: bold; display: inline-block;">
            Login to ExamShelf
          </a>
        </div>
        <p style="margin-top: 20px; text-align: center; font-size: 16px;">If you need any assistance, feel free to reach out to the administrator.</p>

        <p style="text-align: center; font-size: 16px; margin-top: 10px;">Best Regards,</p>
        <p style="text-align: center; font-weight: bold; font-size: 16px; color: #D32F2F;">ExamShelf Team</p>
      </div>
    </div>
  `};

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const removeEmail = async ( email , staffname) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL, 
      to : email, 
      subject : "Notice: Account Removal from ExaShelf",
      text : "", 
      html : `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
      <h2 style="text-align: center; color: #d9534f;">Account Removal Notice</h2>
      <p>Hello,${staffname}</p>
      <p>We regret to inform you that your account has been removed from <strong>ExamShelf</strong>. If you believe this action was taken in error or require further clarification, please reach out to your administrator for more details.</p>
      <p style="margin-top: 20px;">Here are the next steps you can take:</p>
      <ul>
        <li>Contact your administrator for additional information.</li>
        <li>If you have any urgent concerns, feel free to email our support team.</li>
      </ul>
      <p style="margin-top: 20px;">We apologize for any inconvenience caused.</p>
      <p style="margin-top: 40px; text-align: center;">
        Contact Administrator for more Details..
      </p>
    </div>
  `};
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const forgotPasswordEmail = async ( email  , resetUrl ) => {
  try {
    const mailOptions = {
      from: "examshelf.team@gmail.com", 
      to : email, 
      subject : "Forgot passsword",
      text : "", 
      html : `${resetUrl}`
    };
    console.log(resetUrl);
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};


