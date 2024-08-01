"use server";

import { z } from "zod";
import { LoginSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

import { getUserByEmail } from "@/data/users";
import { sendVerificationEmail } from "@/lib/mail";
import { generateOtpCode } from "@/utils/generate-otp-code";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { db } from "@/lib/db";

export default async function login({
  values,
  callbackUrl,
}: {
  values: z.infer<typeof LoginSchema>;
  callbackUrl?: string | undefined | null;
}) {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password } = validatedFields.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return { error: "User not found!" };
  }

  if (!user.is_confirmed) {
    const otpCode = generateOtpCode().toString();

    await db.otpCode.create({
      data: {
        user_id: user.id,
        otp_code: otpCode,
      },
    });

    await sendVerificationEmail({
      email,
      otpCode: otpCode,
      userId: user.id,
    });

    return { error: "Please verify your email!" };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return { error: "Invalid password!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "Login successful!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
}
