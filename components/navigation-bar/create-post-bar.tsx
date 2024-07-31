import { FaPlus } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { createPostSchema } from "@/schema";
import { z } from "zod";
import { useState } from "react";

export default function CreatePostBar() {
  const [dialogOpen, setDialogOpen] = useState(false);

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
    setDialogOpen(false);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <div className="dark:text-disabled text-disabled-dark flex cursor-pointer items-center gap-2 rounded-md p-4 hover:bg-black-stone/50">
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
                            className="h-[90px] w-full resize-none border-0 p-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0"
                            rows={6}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit" className="rounded-full">
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
