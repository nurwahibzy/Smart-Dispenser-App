import { useSubmitTicket } from "../useSubmitHelpdesk";
import { renderHook, act } from "@testing-library/react";
import { submitHelpdesk } from "../../service/helpdeskService";
import { HelpdeskPayload } from "@/types/helpdesk";

jest.mock("../../service/helpdeskService", () => ({
  submitHelpdesk: jest.fn(),
}));

describe("useSubmitTicket", () => {
  const mockSubmitHelpdesk = submitHelpdesk as jest.Mock;
  it("mengembalikan respons yang benar saat submit helpdesk ticket berhasil", async () => {
    const mockResponse = { message: "Ticket submitted successfully" };
    mockSubmitHelpdesk.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useSubmitTicket());
    const payload: HelpdeskPayload = {
      name: "John Doe",
      title: "Sensor error",
      contact: "john.doe@example.com",
      description: "sensor tidak bisa mendeteksi gelas",
      category: "bug",
    };

    await act(async () => {
      await result.current.submitTicket(payload);
    });

    expect(mockSubmitHelpdesk).toHaveBeenCalledWith(payload);
    expect(result.current.isLoading).toBe(false);

  });
});
