import Staff from '../models/staff.model.js';
import { sendEmail } from '../Email/emailsend.js';
import crypto from 'crypto';  // For generating a secure token
import dotenv from 'dotenv';

dotenv.config();

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email input
    if (!email) {
      return res.status(400).json({ error: 'Please provide an email address' });
    }

    // Find the user by email
    const user = await Staff.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'No user found with that email' });
    }

    // Generate a reset token using crypto
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Save the reset token in the database (you can add an expiration time for extra security)
    user.resetToken = resetToken;
    await user.save();

    // Construct the reset URL (client-side URL where the user will reset their password)
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // Send the reset URL via email
    await sendEmail(user.email, resetUrl);

    // Respond to the client that the reset email has been sent
    return res.status(200).json({ message: 'Password reset email sent!' });
  } catch (error) {
    console.error('Error in forgotPassword controller:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
