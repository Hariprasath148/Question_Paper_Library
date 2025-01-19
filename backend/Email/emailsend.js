import nodemailer from 'nodemailer';


// Create a transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // SMTP server
  port: 587, // Port for TLS
  secure: false, // Use TLS
  auth: {
    user: "examshelf.team@gmail.com",
    pass: "fceyhdohtxwayisi",
  },
});

export const sendEmail = async ( staffname , email , password , staffId , department , role) => {
  try {
    const mailOptions = {
      from: "examshelf.team@gmail.com", 
      to : email, 
      subject : "Welcome Invitation",
      text : "", 
      html : ` <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #4CAF50;">Welcome to ExamShelf, ${staffname}!</h2>
      <p>We are excited to have you join our team and contribute to our shared goals and vision. At ExamShelf, we value teamwork, innovation, and dedication, and we're confident you'll make a significant impact.</p>

      <p>Here are your registration details:</p>
      
      <p><strong>Staff Name:</strong> ${staffname}</p>
      <p><strong>Staff ID:</strong> ${staffId}</p>
      <p><strong>Department:</strong> ${department}</p>
      <p><strong>Role:</strong> ${role}</p>

      <h3 style="color: #4CAF50;">Login Details</h3>
      <p>You can log in using the following credentials:</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p><em>For security purposes, we recommend changing your password after your first login.</em></p>

      <p style="margin-top: 20px;">Thank you for joining ExamShelf. We look forward to working with you!</p>
      <p>Best regards,</p>
      <p><strong>The ExamShelf Team</strong></p>
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


