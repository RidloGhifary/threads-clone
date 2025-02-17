import transporter from "./nodemailer";

const domain = process.env.NEXT_PUBLIC_APP_URL;

export async function sendVerificationEmail({
  email,
  userId,
  otpCode,
}: {
  email: string;
  userId: string;
  otpCode: string;
}) {
  const confirmLink = `${domain}/otp-code?token=${userId}`;

  await transporter.sendMail({
    from: "'Threads Clone' <threadsclone@gmail.com>",
    to: email,
    subject: "Verify your email",
    text: `Confirm your email`,
    html: `<h1 style="text-align: center; color: #333; margin-top: 0;">Welcome to Threads Clone</h1>
    <p style="text-align: center; color: #666; margin-top: 0;">Click the link below to verify your email.</p>
    <div style="text-align: center; margin-top: 20px;">
      <a href="${confirmLink}" style="display: inline-block; padding: 10px 20px; background-color: #000; color: #fff; text-decoration: none; border-radius: 4px;">Verify Email</a>
    </div>
    <p style="text-align: center; color: #666; margin-top: 20px;">and copy this code to your email verification form: <strong>${otpCode}</strong></p>`,
  });
}
