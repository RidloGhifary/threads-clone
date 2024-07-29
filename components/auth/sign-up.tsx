"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

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
import ButtonSubmit from "./button-submit";
import register from "@/actions/auth/register";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z
  .object({
    username: z
      .string()
      .min(2, {
        message: "Min 2 characters.",
      })
      .max(32, { message: "Max 32 characters." })
      .trim(),
    email: z.string().email({ message: "Not valid email." }).trim(),
    password: z.string().min(8, { message: "Min 8 characters." }),
  })
  .refine(
    (data) => {
      if (/^[a-z0-9_]+$/.test(data.username)) {
        return true;
      }

      return false;
    },
    {
      message: "Cannot contain special characters.",
    },
  );

export default function SignUpForm() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      if (data.error) {
        toast({
          variant: "destructive",
          title: "Account created failed.",
          description: data.error,
        });
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast({
        title: "Account created.",
        description: data.success,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Account created failed.",
        description: error.message,
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="form-disabled mx-auto space-y-3 sm:w-[80%]"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Username</FormLabel>
                  <FormMessage className="text-sm text-destructive" />
                </div>
                <FormControl>
                  <Input
                    placeholder="johndoe"
                    {...field}
                    disabled={mutation.isPending}
                    className="form-disabled"
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
              </FormItem>
            )}
          />
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
                    disabled={mutation.isPending}
                    className="form-disabled"
                  />
                </FormControl>
                <FormDescription>
                  Email address you want to use for your account.
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
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    disabled={mutation.isPending}
                    className="form-disabled"
                  />
                </FormControl>
                <FormDescription>
                  Password you want to use for your account.
                </FormDescription>
              </FormItem>
            )}
          />
          <ButtonSubmit isDisabled={mutation.isPending}>
            {mutation.isPending ? "Loading..." : "Sign up"}
          </ButtonSubmit>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-link underline">
              Sign in here
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
