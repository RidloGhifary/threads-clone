import { Button } from "@/components/ui/button";

export default function ButtonSubmit({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Button
      type="submit"
      className="w-full bg-white text-black hover:bg-white/80 md:w-fit"
    >
      {children}
    </Button>
  );
}
