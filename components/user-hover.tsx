import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function UserHover({
  username,
  nickname,
  image,
  bio,
  followers,
}: {
  username: string;
  nickname: string;
  image: string;
  bio: string;
  followers: number;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <p className="cursor-pointer hover:underline">{username}</p>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 border border-gray-700 bg-main-black text-white">
        <div className="flex space-x-2">
          <Avatar>
            <AvatarImage
              src={image}
              alt={username + " avatar"}
              className="h-10 w-10"
            />
            <AvatarFallback>{username.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="w-full space-y-2">
            <div>
              <p className="font-semibold">{username}</p>
              <span className="-mt-4 text-xs text-gray-500">{nickname}</span>
            </div>
            <p className="text-sm">{bio}</p>
            <p className="text-sm text-gray-500">{followers} followers</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
