import { FaPlus } from "react-icons/fa";
import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { createPostSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import useCreatePost from "@/hooks/create-post";

export default function CreatePostBar() {
  const user = useCurrentUser();
  const { mutate, isPending, isSuccess } = useCreatePost();

  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(data: z.infer<typeof createPostSchema>) {
    mutate({ values: data, user_id: user?.id as string });
    if (isSuccess) {
      form.reset();
      setDialogOpen(false);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2 rounded-md p-4 text-disabled-dark hover:bg-black-stone/50 dark:text-disabled">
          <FaPlus size={23} />
          <span className="hidden md:block">Create</span>
        </div>
      </DialogTrigger>
      <DialogContent className="border border-gray-700 bg-main-black text-black dark:bg-main-black dark:text-white sm:max-w-[425px] md:max-w-[525px] lg:max-w-[625px]">
        <div className="flex items-start gap-2">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="https://github.com/shadcn.png"
              className="h-10 w-10"
            />
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
          <div className="w-full">
            <p>Ridloghfryy</p>
            <span className="block text-xs text-gray-500">@ridloghfryy</span>
            <div className="mt-3">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Start a thread..."
                            style={{
                              border: "none",
                              outline: "none",
                              boxShadow: "none",
                            }}
                            disabled={isPending}
                            className="disabled:form-disabled h-[90px] w-full resize-none border-0 p-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0"
                            rows={6}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button
                      type="submit"
                      className="disabled:form-disabled rounded-full"
                      disabled={
                        isPending ||
                        form.formState.isSubmitting ||
                        form.watch("content") === ""
                      }
                    >
                      Post
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
