import LoginForm from "@/app/admin/login/_components/loginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-sm text-gray-500 mt-1">Masuk ke dashboard admin</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
