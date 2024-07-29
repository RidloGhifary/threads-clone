"use server";

import { z } from "zod";
import { db } from "@/lib/db";

import { OtpCodeSchema } from "@/schemas";

export default async function validateOtpCode(
  values: z.infer<typeof OtpCodeSchema>,
) {
  const validatedFields = OtpCodeSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { otpCode, token } = validatedFields.data;

  const user = await db.user.findFirst({
    where: {
      id: token,
    },
  });

  if (!user) {
    return { error: "Invalid OTP code!" };
  }

  const userOtpCode = await db.otpCode.findFirst({
    where: {
      user_id: user.id,
    },
  });

  if (!userOtpCode) {
    return { error: "Invalid OTP code!" };
  }

  const isOtpCodeValid = otpCode === userOtpCode.otp_code;
  if (!isOtpCodeValid) {
    return { error: "Invalid OTP code!" };
  }

  await db.$transaction([
    db.user.update({
      where: {
        id: user?.id,
      },
      data: {
        is_confirmed: true,
      },
    }),
    db.otpCode.delete({ where: { id: userOtpCode?.id } }),
  ]);

  return { success: "Account is verified" };
}
