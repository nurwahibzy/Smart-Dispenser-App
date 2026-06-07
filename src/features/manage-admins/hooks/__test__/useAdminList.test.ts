import { renderHook, waitFor } from "@testing-library/react";
import { useAdminList } from "../useAdminList";
import { manageAdminService } from "../../service/manageAdminService";
import { Timestamp } from "firebase/firestore";

jest.mock("../../service/manageAdminService", () => ({
  manageAdminService: {
    getAll: jest.fn(),
  },
}));

const admins = [
  {
    id: "uid-1",
    name: "Admin Satu",
    email: "admin1@gmail.com",
    role: "admin",
    status: true,
    createdAt: Timestamp.fromDate(new Date("2026-01-01T00:00:00.000Z")),
    updatedAt: null,
  },
];

describe("useAdminList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("mengambil data admin", async () => {
    (manageAdminService.getAll as jest.Mock).mockResolvedValueOnce(admins);

    const { result } = renderHook(() => useAdminList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.admins).toEqual(admins);
    expect(manageAdminService.getAll).toHaveBeenCalled();
  });

  it("loading false jika gagal mengambil data", async () => {
    (manageAdminService.getAll as jest.Mock).mockRejectedValueOnce(
      new Error("gagal"),
    );

    const { result } = renderHook(() => useAdminList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.admins).toEqual([]);
  });
});
