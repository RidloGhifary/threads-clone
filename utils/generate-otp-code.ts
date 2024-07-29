export const generateOtpCode = () =>
  Math.floor(100000 + Math.random() * 900000);
