"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import ButtonSubmit from "@/components/auth/button-submit";
import validateOtpCode from "@/actions/auth/otp-code";
import { useToast } from "../ui/use-toast";

const FormSchema = z.object({
  otpCode: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function OtpCodePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const token = searchParams?.get("token");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otpCode: "",
    },
  });

  const mutation = useMutation({
    mutationFn: validateOtpCode,
    onSuccess: (res) => {
      if (res.error) {
        toast({
          variant: "destructive",
          title: "Account created failed.",
          description: res.error,
        });
        return;
      }

      toast({
        title: "Account created.",
        description: res.success,
      });

      router.push("/sign-in");
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutation.mutate({
      otpCode: data.otpCode,
      token: token?.toString() || "",
    });
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
            name="otpCode"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Otp Code</FormLabel>
                  <FormMessage className="text-sm text-destructive" />
                </div>

                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    pattern={REGEXP_ONLY_DIGITS}
                    autoFocus
                    className="form-disabled"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your phone.
                </FormDescription>
              </FormItem>
            )}
          />

          <ButtonSubmit isDisabled={mutation.isPending}>
            {mutation.isPending ? "Confirming..." : "Confirm"}
          </ButtonSubmit>
        </form>
      </Form>
    </div>
  );
}
