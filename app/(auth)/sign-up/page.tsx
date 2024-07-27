import SignUpForm from "@/components/auth/sign-up";

export default function SignUp() {
  return (
    <section className="container">
      <div className="grid min-h-screen gap-3 px-4 py-8 md:grid-cols-2 md:gap-0">
        <div className="flex flex-col items-center justify-center space-y-1 md:items-start">
          <h1 className="text-3xl font-bold md:text-4xl">Threads Clone</h1>
          <p className="text-center text-sm md:max-w-[90%] md:text-left">
            Threads Clone is a social media web application where users can
            create, share, and interact with threads. Users can create threads
            by writing a title and a description, and then add posts to the
            thread. Other users can upvote or downvote posts, and users can
            comment on posts.
          </p>
        </div>
        <div className="flex flex-col justify-center">
          <SignUpForm />
        </div>
      </div>
    </section>
  );
}
