import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import likePost from "@/actions/posts/like-post";

const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePost,
    onSuccess: (res: any) => {
      if (res.success) {
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

export default useLikePost;
