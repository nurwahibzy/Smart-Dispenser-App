import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "@/features/auth/components/loginForm";

const mockLogin = jest.fn();
const mockBack = jest.fn();

jest.mock("@/features/auth/hooks/useLogin", () => ({
  useLogin: () => ({
    login: mockLogin,
    loading: false,
    error: "",
  }),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("menampilkan semua elemen form login", () => {
    render(<LoginForm />);

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Smart Dispenser")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("example@email.com"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
    expect(screen.getByText("Lupa password?")).toBeInTheDocument();
    expect(screen.getByLabelText("Ingat saya")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Kembali" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Masuk" })).toBeInTheDocument();
  });

  it("tombol Masuk disabled saat email dan password kosong", () => {
    render(<LoginForm />);

    expect(screen.getByRole("button", { name: "Masuk" })).toBeDisabled();
  });

  it("tombol Masuk aktif setelah email dan password diisi", () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText("example@email.com"), {
      target: { value: "admin@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "password123" },
    });

    expect(screen.getByRole("button", { name: "Masuk" })).not.toBeDisabled();
  });

  it("memanggil login dengan rememberMe false saat submit", () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText("example@email.com"), {
      target: { value: "admin@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Masuk" }));

    expect(mockLogin).toHaveBeenCalledWith(
      "admin@gmail.com",
      "password123",
      false,
    );
  });

  it("memanggil login dengan rememberMe true jika Ingat saya dicentang", () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText("example@email.com"), {
      target: { value: "admin@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByLabelText("Ingat saya"));
    fireEvent.click(screen.getByRole("button", { name: "Masuk" }));

    expect(mockLogin).toHaveBeenCalledWith(
      "admin@gmail.com",
      "password123",
      true,
    );
  });

  it("toggle show dan hide password berjalan", () => {
    render(<LoginForm />);

    const passwordInput = screen.getByPlaceholderText("••••••••");

    expect(passwordInput).toHaveAttribute("type", "password");

    const togglePasswordButton = screen.getAllByRole("button")[0];
    fireEvent.click(togglePasswordButton);

    expect(passwordInput).toHaveAttribute("type", "text");
  });

  it("tombol Kembali memanggil router.back", () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByRole("button", { name: "Kembali" }));

    expect(mockBack).toHaveBeenCalled();
  });
});
