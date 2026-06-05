import { useFetchTicket } from "../useGetHelpdesk";
import { getHelpdesk } from "../../service/helpdeskService";
import { act, renderHook } from "@testing-library/react";

jest.mock("../../service/helpdeskService", () => ({
  getHelpdesk: jest.fn(),
}));

describe("useFetchTicket", () => {
  const mockGetHelpdesk = getHelpdesk as jest.Mock;
  it("should fetch helpdesk data successfully", async () => {
    const mockData = [
      {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        issue: "Issue 1",
        description: "Description 1",
        status: "open",
        createdAt: "2024-01-01T00:00:00Z",
      },
    ];

    mockGetHelpdesk.mockResolvedValue(mockData);

    const { result } = renderHook(() => useFetchTicket());

    await act(async () => {
      await result.current.FetchTicket();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.successMessage).toBeNull();
  });
});
