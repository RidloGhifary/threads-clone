import SignUpForm from "@/components/auth/sign-up";
import AuthHeader from "../_components/header";

export default function SignUp() {
  return (
    <section className="container">
      <div className="grid min-h-screen gap-3 px-4 py-8 md:grid-cols-2 md:gap-0">
        <AuthHeader
          title="Threads Clone"
          description="Threads Clone is a social media web application where users can
            create, share, and interact with threads. Users can create threads
            by writing a title and a description, and then add posts to the
            thread. Other users can upvote or downvote posts, and users can
            comment on posts."
        />
        <div className="flex flex-col justify-center">
          <SignUpForm />
        </div>
      </div>
    </section>
  );
}
