import LoginForm from "@/features/auth/components/loginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 w-full max-w-sm">
        <LoginForm />
      </div>
    </main>
  );
}