import { Suspense } from "react";
import ResetPasswordContent from "./reset-password-content";

export const dynamic = "force-dynamic";

export default function ResetPassword() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
