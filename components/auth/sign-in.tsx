"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import ButtonSubmit from "./button-submit";

const formSchema = z.object({
  email: z.string().email({ message: "Not valid email." }).trim(),
  password: z.string().min(8, { message: "Min 8 characters." }),
});

export default function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto space-y-3 sm:w-[80%]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Email</FormLabel>
                  <FormMessage className="text-sm text-destructive" />
                </div>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="johndoe@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Email address you use for your account.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <FormMessage className="text-sm text-destructive" />
                </div>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormDescription>
                  Password you use for your account.
                </FormDescription>
              </FormItem>
            )}
          />
          <ButtonSubmit>Sign in</ButtonSubmit>
          <p className="text-center text-sm">
            Have not an account?{" "}
            <Link href="/sign-up" className="text-link underline">
              Sign up here
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
