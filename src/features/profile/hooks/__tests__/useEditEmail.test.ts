import { renderHook, act } from "@testing-library/react";
import { useEditEmail } from "../useEditEmail";
import { profileService } from "../../service/ProfileService";

jest.mock("../../service/ProfileService", () => ({
  profileService: {
    editEmail: jest.fn(),
  },
}));

describe("useEditEmail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("menolak email kosong", async () => {
    const { result } = renderHook(() => useEditEmail());

    await act(async () => {
      await result.current.editEmail("uid-1", "");
    });

    expect(result.current.error).toBe("Email tidak boleh kosong");
  });

  it("menolak format email tidak valid", async () => {
    const { result } = renderHook(() => useEditEmail());

    await act(async () => {
      await result.current.editEmail("uid-1", "email-salah");
    });

    expect(result.current.error).toBe("Format email tidak valid");
  });

  it("berhasil update email", async () => {
    const onSuccess = jest.fn();
    (profileService.editEmail as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useEditEmail(onSuccess));

    await act(async () => {
      await result.current.editEmail("uid-1", "admin@gmail.com");
    });

    expect(profileService.editEmail).toHaveBeenCalledWith(
      "uid-1",
      "admin@gmail.com",
    );
    expect(result.current.success).toBe(true);
    expect(onSuccess).toHaveBeenCalled();
  });
});
