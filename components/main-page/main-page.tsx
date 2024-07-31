"use client";

import ContentCard from "../content-card";
import CreateThreadMainPage from "./create-thread-main-page";
import { Separator } from "@/components/ui/separator";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

export default function MainPage() {
  return (
    <div className="min-h-screen p-4">
      <CreateThreadMainPage />
      <Separator className="separator-color my-4 bg-gray-700" />
      <div className="space-y-5">
        {tags.map((item) => (
          <div key={item}>
            <ContentCard />
            <Separator className="separator-color mx-auto my-4 w-2/3 bg-gray-700" />
          </div>
        ))}
      </div>
    </div>
  );
}
