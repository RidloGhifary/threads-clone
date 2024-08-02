import { auth } from "@/auth";
import MainPage from "@/components/main-page/main-page";
import LeftSideBar from "@/components/navigation-bar/leftside-bar";
import { UserSessionProps } from "@/types";

export default async function Home() {
  const { user }: UserSessionProps | any = await auth();

  return (
    <div className="min-h-screen dark:bg-main-black dark:text-white">
      <div className="mx-auto grid max-w-screen-2xl md:grid-cols-3 lg:grid-cols-4">
        <div className="order-last col-span-1 md:order-first">
          <LeftSideBar />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <MainPage user={user} />
        </div>
        <div className="col-span-1 hidden md:block"></div>
      </div>
    </div>
  );
}
