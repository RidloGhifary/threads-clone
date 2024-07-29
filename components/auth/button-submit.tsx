import { Button } from "@/components/ui/button";

export default function ButtonSubmit({
  children,
  isDisabled,
}: {
  children: React.ReactNode;
  isDisabled: boolean;
}) {
  return (
    <Button
      type="submit"
      disabled={isDisabled}
      className="form-disabled w-full bg-white text-black hover:bg-white/80 md:w-fit"
    >
      {children}
    </Button>
  );
}
