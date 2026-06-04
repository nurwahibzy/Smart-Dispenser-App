import { renderHook, act } from "@testing-library/react";
import { useLogin } from "../useLogin";
import { signIn } from "next-auth/react";

const pushMock = jest.fn();

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => ({
    get: () => null,
  }),
}));

describe("useLogin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  it("login berhasil", async () => {
    (signIn as jest.Mock).mockResolvedValue({
      ok: true,
      error: null,
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.login("admin@gmail.com", "password123", false);
    });

    expect(signIn).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith("/admin/dashboard");
  });

  it("menampilkan error jika login gagal", async () => {
    (signIn as jest.Mock).mockResolvedValue({
      error: "CredentialsSignin",
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.login("admin@gmail.com", "salah", false);
    });

    expect(result.current.error).toBe("Email atau password salah.");
  });

  it("menyimpan session-only saat rememberMe false", async () => {
    (signIn as jest.Mock).mockResolvedValue({
      ok: true,
      error: null,
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.login("admin@gmail.com", "password123", false);
    });

    expect(sessionStorage.getItem("session-only")).toBe("true");
  });

  it("menghapus session-only saat rememberMe true", async () => {
    sessionStorage.setItem("session-only", "true");

    (signIn as jest.Mock).mockResolvedValue({
      ok: true,
      error: null,
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.login("admin@gmail.com", "password123", true);
    });

    expect(sessionStorage.getItem("session-only")).toBeNull();
  });
});
