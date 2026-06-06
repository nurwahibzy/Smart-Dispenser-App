import { render, screen, fireEvent } from "@testing-library/react";
import ModalEditAdmin from "../ModalEditAdmin";
import { useEditAdmin } from "../../hooks/useEditAdmin";
import { AdminData } from "@/types/manage-admins";
import { Timestamp } from "firebase/firestore";

const mockEditAdmin = jest.fn();
const mockClose = jest.fn();
const mockSuccess = jest.fn();

jest.mock("../../hooks/useEditAdmin", () => ({
  useEditAdmin: jest.fn(),
}));

const admin: AdminData = {
  id: "uid-1",
  name: "Admin Lama",
  email: "admin@gmail.com",
  role: "admin",
  status: true,
  createdAt: Timestamp.fromDate(new Date("2026-01-01T00:00:00.000Z")),
  updatedAt: null,
};

describe("ModalEditAdmin", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useEditAdmin as jest.Mock).mockReturnValue({
      editAdmin: mockEditAdmin,
      loading: false,
      error: "",
    });
  });

  it("menampilkan data admin", () => {
    render(
      <ModalEditAdmin
        admin={admin}
        onClose={mockClose}
        onSuccess={mockSuccess}
      />,
    );

    expect(screen.getByText("Edit Admin")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Admin Lama")).toBeInTheDocument();
    expect(screen.getByDisplayValue("admin@gmail.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("admin")).toBeInTheDocument();
  });

  it("email dan role bersifat disabled", () => {
    render(
      <ModalEditAdmin
        admin={admin}
        onClose={mockClose}
        onSuccess={mockSuccess}
      />,
    );

    expect(screen.getByDisplayValue("admin@gmail.com")).toBeDisabled();
    expect(screen.getByDisplayValue("admin")).toBeDisabled();
  });

  it("memanggil onClose saat klik batal", () => {
    render(
      <ModalEditAdmin
        admin={admin}
        onClose={mockClose}
        onSuccess={mockSuccess}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Batal" }));

    expect(mockClose).toHaveBeenCalled();
  });

  it("memanggil editAdmin saat klik simpan", () => {
    render(
      <ModalEditAdmin
        admin={admin}
        onClose={mockClose}
        onSuccess={mockSuccess}
      />,
    );

    fireEvent.change(screen.getByDisplayValue("Admin Lama"), {
      target: { value: "Admin Baru" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Simpan" }));

    expect(mockEditAdmin).toHaveBeenCalledWith("uid-1", "Admin Baru");
  });

  it("menampilkan loading saat menyimpan", () => {
    (useEditAdmin as jest.Mock).mockReturnValue({
      editAdmin: mockEditAdmin,
      loading: true,
      error: "",
    });

    render(
      <ModalEditAdmin
        admin={admin}
        onClose={mockClose}
        onSuccess={mockSuccess}
      />,
    );

    expect(screen.getByRole("button", { name: "Menyimpan..." })).toBeDisabled();
  });

  it("menampilkan error jika ada error", () => {
    (useEditAdmin as jest.Mock).mockReturnValue({
      editAdmin: mockEditAdmin,
      loading: false,
      error: "Gagal menyimpan perubahan.",
    });

    render(
      <ModalEditAdmin
        admin={admin}
        onClose={mockClose}
        onSuccess={mockSuccess}
      />,
    );

    expect(screen.getByText("Gagal menyimpan perubahan.")).toBeInTheDocument();
  });
});
