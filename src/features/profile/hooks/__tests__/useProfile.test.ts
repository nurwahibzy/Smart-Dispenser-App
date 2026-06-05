import { renderHook } from "@testing-library/react";
import { useProfile } from "../useProfile";
import useSWR from "swr";

jest.mock("next-auth/react", () => ({
  useSession: () => ({
    data: {
      user: {
        id: "uid-1",
      },
    },
  }),
}));

jest.mock("swr", () => jest.fn());

describe("useProfile", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("mengembalikan data profile", () => {
    const mockMutate = jest.fn();

    (useSWR as jest.Mock).mockReturnValue({
      data: {
        id: "uid-1",
        name: "Ananda Rahmawati",
        email: "ananda@gmail.com",
        role: "admin",
        status: true,
      },
      error: null,
      isLoading: false,
      mutate: mockMutate,
    });

    const { result } = renderHook(() => useProfile());

    expect(result.current.profile).toEqual({
      id: "uid-1",
      name: "Ananda Rahmawati",
      email: "ananda@gmail.com",
      role: "admin",
      status: true,
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.mutate).toBe(mockMutate);
  });

  it("mengembalikan loading state", () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
      mutate: jest.fn(),
    });

    const { result } = renderHook(() => useProfile());

    expect(result.current.profile).toBeUndefined();
    expect(result.current.isLoading).toBe(true);
  });
});
