import { renderHook, act } from "@testing-library/react";
import { useEditAdmin } from "../useEditAdmin";
import { manageAdminService } from "../../service/manageAdminService";
import { toast } from "sonner";

jest.mock("../../service/manageAdminService", () => ({
  manageAdminService: {
    editNama: jest.fn(),
  },
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("useEditAdmin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("menolak nama kosong", async () => {
    const { result } = renderHook(() => useEditAdmin());

    await act(async () => {
      await result.current.editAdmin("uid-1", "");
    });

    expect(result.current.error).toBe("Nama tidak boleh kosong.");
  });

  it("berhasil edit nama admin", async () => {
    const onSukses = jest.fn();
    (manageAdminService.editNama as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useEditAdmin(onSukses));

    await act(async () => {
      await result.current.editAdmin("uid-1", "Admin Baru");
    });

    expect(manageAdminService.editNama).toHaveBeenCalledWith("uid-1", {
      name: "Admin Baru",
    });
    expect(toast.success).toHaveBeenCalledWith(
      "Data admin berhasil diperbarui",
    );
    expect(onSukses).toHaveBeenCalled();
  });

  it("menampilkan error jika gagal edit admin", async () => {
    (manageAdminService.editNama as jest.Mock).mockRejectedValue(
      new Error("gagal"),
    );

    const { result } = renderHook(() => useEditAdmin());

    await act(async () => {
      await result.current.editAdmin("uid-1", "Admin Baru");
    });

    expect(result.current.error).toBe("Gagal menyimpan perubahan.");
    expect(toast.error).toHaveBeenCalledWith("Gagal menyimpan perubahan");
  });
});
