"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/users";
import { sendVerificationEmail } from "@/lib/mail";

export default async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password, username } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const isUserExist = await getUserByEmail(email);
  if (isUserExist) {
    return { error: "User already exist!" };
  }

  const generateOtpCode = Math.floor(100000 + Math.random() * 900000);

  const user = await db.user.create({
    data: {
      username,
      nickname: email.split("@")[0],
      bio: "",
      profile_picture: "",
      is_confirmed: false,
      email,
      password: hashedPassword,
    },
  });

  await sendVerificationEmail({
    email,
    otpCode: generateOtpCode.toString(),
    userId: user.id,
  });

  await db.otpCode.create({
    data: {
      user_id: user.id,
      otp_code: generateOtpCode.toString(),
    },
  });

  return { success: "Confirmation email sent!" };
}
