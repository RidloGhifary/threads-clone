export default function AuthHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-1 md:items-start">
      <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
      <p className="text-center text-sm md:max-w-[90%] md:text-left">
        {description}
      </p>
    </div>
  );
}
