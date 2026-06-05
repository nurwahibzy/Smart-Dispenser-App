import { renderHook, act } from "@testing-library/react";
import { useEditNama } from "../useEditNama";
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
    editNama: jest.fn(),
  },
}));

describe("useEditNama", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("menolak nama kosong", async () => {
    const { result } = renderHook(() => useEditNama());

    await act(async () => {
      await result.current.editNama("");
    });

    expect(result.current.error).toBe("Nama tidak boleh kosong.");
  });

  it("berhasil menyimpan nama", async () => {
    const onSukses = jest.fn();
    (profileService.editNama as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useEditNama(onSukses));

    await act(async () => {
      await result.current.editNama("Ananda Rahmawati");
    });

    expect(profileService.editNama).toHaveBeenCalledWith(
      "uid-1",
      "Ananda Rahmawati",
    );
    expect(result.current.sukses).toBe(true);
    expect(onSukses).toHaveBeenCalled();
  });

  it("menampilkan error jika gagal menyimpan nama", async () => {
    (profileService.editNama as jest.Mock).mockRejectedValue(
      new Error("gagal"),
    );

    const { result } = renderHook(() => useEditNama());

    await act(async () => {
      await result.current.editNama("Ananda Rahmawati");
    });

    expect(result.current.error).toBe("Gagal menyimpan nama.");
  });
});
