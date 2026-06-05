import { renderHook, act } from "@testing-library/react";
import { useGantiPassword } from "../useGantiPassword";
import { profileService } from "../../service/ProfileService";

jest.mock("next-auth/react", () => ({
  useSession: () => ({
    data: {
      user: {
        id: "uid-1",
      },
    },
  }),
}));

jest.mock("../../service/ProfileService", () => ({
  profileService: {
    gantiPassword: jest.fn(),
  },
}));

describe("useGantiPassword", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("menolak jika field kosong", async () => {
    const { result } = renderHook(() => useGantiPassword());

    await act(async () => {
      await result.current.gantiPassword("", "", "");
    });

    expect(result.current.error).toBe("Semua field wajib diisi.");
  });

  it("menolak jika konfirmasi password tidak cocok", async () => {
    const { result } = renderHook(() => useGantiPassword());

    await act(async () => {
      await result.current.gantiPassword("lama123", "baru123", "beda123");
    });

    expect(result.current.error).toBe(
      "Password baru dan konfirmasi tidak cocok.",
    );
  });

  it("menolak password kurang dari 6 karakter", async () => {
    const { result } = renderHook(() => useGantiPassword());

    await act(async () => {
      await result.current.gantiPassword("lama123", "123", "123");
    });

    expect(result.current.error).toBe("Password baru minimal 6 karakter.");
  });

  it("berhasil mengganti password", async () => {
    const onSukses = jest.fn();
    (profileService.gantiPassword as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useGantiPassword(onSukses));

    await act(async () => {
      await result.current.gantiPassword("lama123", "baru123", "baru123");
    });

    expect(profileService.gantiPassword).toHaveBeenCalledWith(
      "uid-1",
      "lama123",
      "baru123",
    );
    expect(result.current.sukses).toBe(true);
    expect(onSukses).toHaveBeenCalled();
  });
});
