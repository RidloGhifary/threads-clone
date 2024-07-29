import * as z from "zod";

export const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(32, { message: "Username must be at most 32 characters." })
      .trim(),
    email: z.string().email({ message: "Email must be valid." }).trim(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
  })
  .refine(
    (data) => {
      if (/^[a-z0-9_]+$/.test(data.username)) {
        return true;
      }

      return false;
    },
    {
      message: "Username can only contain letters, numbers and underscores.",
    },
  );

export const OtpCodeSchema = z.object({
  otpCode: z.string(),
  token: z.string(),
});
