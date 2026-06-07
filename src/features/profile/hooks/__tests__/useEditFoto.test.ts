import { renderHook, act } from "@testing-library/react";
import { useEditFoto } from "../useEditFoto";
import { uploadFotoKeImgbb } from "@/lib/utils/uploadFoto";
import { updateDoc } from "firebase/firestore";

jest.mock("@/lib/utils/uploadFoto", () => ({
  uploadFotoKeImgbb: jest.fn(),
}));

jest.mock("@/lib/firebase/client", () => ({
  db: {},
}));

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(() => "doc-ref"),
  updateDoc: jest.fn(),
  serverTimestamp: jest.fn(() => "timestamp"),
}));

describe("useEditFoto", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("berhasil upload dan update foto", async () => {
    const file = new File(["foto"], "foto.png", { type: "image/png" });

    (uploadFotoKeImgbb as jest.Mock).mockResolvedValue(
      "https://foto.com/a.png",
    );
    (updateDoc as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useEditFoto());

    let photoURL: string | null = null;

    await act(async () => {
      photoURL = await result.current.editFoto("uid-1", file);
    });

    expect(photoURL).toBe("https://foto.com/a.png");
    expect(updateDoc).toHaveBeenCalled();
  });

  it("menampilkan error jika upload gagal", async () => {
    const file = new File(["foto"], "foto.png", { type: "image/png" });

    (uploadFotoKeImgbb as jest.Mock).mockRejectedValue(new Error("gagal"));

    const { result } = renderHook(() => useEditFoto());

    await act(async () => {
      await result.current.editFoto("uid-1", file);
    });

    expect(result.current.error).toBe("Gagal upload foto");
  });
});
