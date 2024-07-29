"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

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
import login from "@/actions/auth/login";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Not valid email." }).trim(),
  password: z.string(),
});

export default function SignInForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (res: any) => {
      if (res.error) {
        toast({
          variant: "destructive",
          title: "Sign in failed.",
          description: res.error,
        });
        return;
      }

      toast({
        title: "Sign in.",
        description: res?.success || "Sign in successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({ values, callbackUrl });
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
                    className="form-disabled"
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
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    className="form-disabled"
                  />
                </FormControl>
                <FormDescription>
                  Password you use for your account.
                </FormDescription>
              </FormItem>
            )}
          />
          <ButtonSubmit isDisabled={mutation.isPending}>
            {mutation.isPending ? "Loading..." : "Sign in"}
          </ButtonSubmit>
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
