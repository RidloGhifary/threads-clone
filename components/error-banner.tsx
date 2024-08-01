import { GoAlertFill } from "react-icons/go";

export default function ErrorBanner({ message }: { message?: string }) {
  return (
    <div className="flex w-full gap-3 rounded-md bg-destructive/15 px-8 py-6 text-destructive">
      <GoAlertFill size={20} />
      {message || "Something went wrong"}
    </div>
  );
}
