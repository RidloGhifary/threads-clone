"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { createPostSchema } from "@/schema";
import { z } from "zod";

export default function CreateThreadMainPage() {
  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(data: z.infer<typeof createPostSchema>) {
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
                      style={{
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                      }}
                      placeholder="Start a thread..."
                      className="disabled:form-disabled border-none shadow-none outline-none ring-0 focus:border-none focus:outline-none focus:ring-0 active:border-none active:outline-none active:ring-0"
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
              className="disabled:form-disabled rounded-full bg-main-black px-6 text-white hover:bg-black/50 dark:bg-white dark:text-main-black dark:hover:bg-white/50"
            >
              Post
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
