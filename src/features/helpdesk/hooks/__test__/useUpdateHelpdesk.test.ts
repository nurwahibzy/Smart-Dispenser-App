import { useUpdateHelpdesk } from "../useUpdateHelpdesk";
import { renderHook, act } from "@testing-library/react";
import { updateHelpdeskStatus } from "../../service/helpdeskService";

jest.mock("../../service/helpdeskService", () => ({
  updateHelpdeskStatus: jest.fn(),
}));

describe("useUpdateHelpdesk", () => {
  const mockUpdateHelpdeskStatus = updateHelpdeskStatus as jest.Mock;
  it("mengembalikan respons yang benar saat update status helpdesk berhasil", async () => {
    const mockResponse = { message: "Status updated successfully" };
    mockUpdateHelpdeskStatus.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useUpdateHelpdesk());

    await act(async () => {
      await result.current.updateStatus("ticketId", "newStatus");
    });

    expect(mockUpdateHelpdeskStatus).toHaveBeenCalledWith(
      "ticketId",
      "newStatus",
    );
    expect(result.current.isLoading).toBe(false);
  });
});
