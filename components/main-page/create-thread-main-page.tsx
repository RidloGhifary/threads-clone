"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const FormSchema = z.object({
  content: z
    .string()
    .min(1, {
      message: "At least 1 character",
    })
    .max(100, {
      message: "Max 100 characters",
    }),
});

export default function CreateThreadMainPage() {
  const { data } = useSession();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="flex w-full items-center gap-1 py-2">
      <div>
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="h-10 w-10"
          />
          <AvatarFallback>R</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex w-full items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full items-center"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Start a thread..."
                      className="disabled:form-disabled border-none outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={
                form.formState.isSubmitting || form.watch("content") === ""
              }
              type="submit"
              className="disabled:form-disabled rounded-full bg-white px-6 text-black hover:bg-white/50"
            >
              Post
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
