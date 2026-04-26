import { Suspense } from "react";
import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";

function ResetPasswordContainer({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  return <ResetPasswordForm token={searchParams.token || null} />;
}

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-600">Loading...</div>
        </div>
      }
    >
      <ResetPasswordContainer searchParams={searchParams} />
    </Suspense>
  );
}