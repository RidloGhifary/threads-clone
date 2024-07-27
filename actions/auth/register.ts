"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/users";

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

  await db.user.create({
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

  return { success: "Confirmation email sent!" };
}
