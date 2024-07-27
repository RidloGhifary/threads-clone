import OtpCodePage from "@/components/auth/otp-code";
import AuthHeader from "../../_components/header";

export default function OtpCode() {
  return (
    <section className="container">
      <div className="grid min-h-screen gap-3 px-4 py-8 md:grid-cols-2 md:gap-0">
        <AuthHeader
          title="Threads Clone"
          description="Enter the OTP sent to your email to verify your account. If you haven't received the OTP, please check your spam folder or resend the OTP."
        />
        <div className="flex flex-col justify-center">
          <OtpCodePage />
        </div>
      </div>
    </section>
  );
}
