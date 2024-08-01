import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import deletePost from "@/actions/posts/delete-post";

const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (res: any) => {
      if (res.success) {
        toast({
          title: "Success",
          description: res.success,
        });
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      } else {
        toast({
          variant: "destructive",
          title: "Failed",
          description: res.error,
        });
      }
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Something went wrong",
      });
    },
  });
};

export default useDeletePost;
