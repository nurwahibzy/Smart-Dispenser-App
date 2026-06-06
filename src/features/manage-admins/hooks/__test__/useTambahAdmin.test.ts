import { renderHook, act } from "@testing-library/react";
import { useTambahAdmin } from "../useTambahAdmin";
import { manageAdminService } from "../../service/manageAdminService";
import { toast } from "sonner";

jest.mock("../../service/manageAdminService", () => ({
  manageAdminService: {
    tambah: jest.fn(),
  },
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("useTambahAdmin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("menolak jika field kosong", async () => {
    const { result } = renderHook(() => useTambahAdmin());

    await act(async () => {
      await result.current.tambahAdmin({
        name: "",
        email: "",
        password: "",
      });
    });

    expect(result.current.error).toBe("Semua field wajib diisi.");
  });

  it("menolak password kurang dari 6 karakter", async () => {
    const { result } = renderHook(() => useTambahAdmin());

    await act(async () => {
      await result.current.tambahAdmin({
        name: "Admin Baru",
        email: "admin@gmail.com",
        password: "123",
      });
    });

    expect(result.current.error).toBe("Password minimal 6 karakter.");
  });

  it("berhasil tambah admin", async () => {
    const onSukses = jest.fn();
    (manageAdminService.tambah as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useTambahAdmin(onSukses));

    const data = {
      name: "Admin Baru",
      email: "admin@gmail.com",
      password: "123456",
    };

    await act(async () => {
      await result.current.tambahAdmin(data);
    });

    expect(manageAdminService.tambah).toHaveBeenCalledWith(data);
    expect(toast.success).toHaveBeenCalledWith("Admin berhasil ditambahkan");
    expect(onSukses).toHaveBeenCalled();
  });

  it("menampilkan error jika email sudah digunakan", async () => {
    (manageAdminService.tambah as jest.Mock).mockRejectedValue(
      new Error("Email sudah digunakan"),
    );

    const { result } = renderHook(() => useTambahAdmin());

    await act(async () => {
      await result.current.tambahAdmin({
        name: "Admin Baru",
        email: "admin@gmail.com",
        password: "123456",
      });
    });

    expect(result.current.error).toBe("Email sudah digunakan.");
  });

  it("menampilkan error jika gagal tambah admin", async () => {
    (manageAdminService.tambah as jest.Mock).mockRejectedValue(
      new Error("gagal"),
    );

    const { result } = renderHook(() => useTambahAdmin());

    await act(async () => {
      await result.current.tambahAdmin({
        name: "Admin Baru",
        email: "admin@gmail.com",
        password: "123456",
      });
    });

    expect(result.current.error).toBe("Gagal menambah admin.");
    expect(toast.error).toHaveBeenCalledWith("Gagal menambah admin");
  });
});
