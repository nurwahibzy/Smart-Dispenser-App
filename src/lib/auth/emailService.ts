import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, 
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendPasswordResetEmail(
  email: string,
  resetToken: string,
) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/admin/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: `"Smart Dispenser App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset Password - Smart Dispenser App",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .button { 
              display: inline-block; 
              padding: 12px 24px; 
              background-color: #0070f3; 
              color: white; 
              text-decoration: none; 
              border-radius: 5px; 
              margin: 20px 0;
            }
            .footer { margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Reset Password Anda</h2>
            <p>Kami menerima permintaan untuk reset password akun admin Anda.</p>
            <p>Klik tombol di bawah untuk reset password:</p>
            <a href="${resetUrl}" 
                style="
                  display: inline-block;
                  padding: 12px 24px;
                  background-color: #0070f3;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 5px;
                  margin: 20px 0;
                  font-weight: 500;
                "
              >Reset Password </a>
            <p>Atau copy link berikut ke browser Anda:</p>
            <p style="word-break: break-all; color: #0070f3;">${resetUrl}</p>
            <p><strong>Link ini akan expire dalam 15 menit.</strong></p>
            <div class="footer">
              <p>Jika Anda tidak meminta reset password, abaikan email ini.</p>
              <p>Email ini dikirim secara otomatis, mohon tidak membalas.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reset email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Gagal mengirim email");
  }
}
