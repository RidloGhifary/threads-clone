import AuthHeader from "../_components/header";
import SignInForm from "@/components/auth/sign-in";

export default function SignIn() {
  return (
    <section className="container">
      <div className="grid min-h-screen gap-3 px-4 py-8 md:grid-cols-2 md:gap-0">
        <AuthHeader
          title="Threads Clone"
          description="With Threads Clone, you can join conversations, meet new people, and stay connected with friends. Sign in with your email or phone number to get started."
        />
        <div className="flex flex-col justify-center">
          <SignInForm />
        </div>
      </div>
    </section>
  );
}
