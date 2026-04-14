import LoginForm from "@/features/auth/components/loginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 w-full max-w-sm">
        <Suspense fallback={<div>Loading...</div>}> 
        <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}