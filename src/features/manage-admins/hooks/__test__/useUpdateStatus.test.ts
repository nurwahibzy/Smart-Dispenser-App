import { renderHook, act } from "@testing-library/react";
import { useToggleStatus } from "../useUpdateStatus";
import { manageAdminService } from "../../service/manageAdminService";
import { toast } from "sonner";

jest.mock("../../service/manageAdminService", () => ({
  manageAdminService: {
    updateStatus: jest.fn(),
  },
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("useToggleStatus", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("berhasil mengaktifkan admin", async () => {
    const onSukses = jest.fn();
    (manageAdminService.updateStatus as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useToggleStatus(onSukses));

    await act(async () => {
      await result.current.toggleStatus("uid-1", true);
    });

    expect(manageAdminService.updateStatus).toHaveBeenCalledWith("uid-1", true);
    expect(toast.success).toHaveBeenCalledWith(
      "Status admin berhasil diaktifkan",
    );
    expect(onSukses).toHaveBeenCalled();
    expect(result.current.loadingId).toBeNull();
  });

  it("berhasil menonaktifkan admin", async () => {
    (manageAdminService.updateStatus as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useToggleStatus());

    await act(async () => {
      await result.current.toggleStatus("uid-1", false);
    });

    expect(toast.success).toHaveBeenCalledWith(
      "Status admin berhasil dinonaktifkan",
    );
  });

  it("menampilkan toast error jika gagal update status", async () => {
    (manageAdminService.updateStatus as jest.Mock).mockRejectedValue(
      new Error("gagal"),
    );

    const { result } = renderHook(() => useToggleStatus());

    await act(async () => {
      await result.current.toggleStatus("uid-1", true);
    });

    expect(toast.error).toHaveBeenCalledWith("Gagal mengubah status");
    expect(result.current.loadingId).toBeNull();
  });
});
