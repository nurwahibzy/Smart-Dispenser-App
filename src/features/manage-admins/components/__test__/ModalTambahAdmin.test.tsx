import { render, screen, fireEvent } from "@testing-library/react";
import ModalTambahAdmin from "../ModalTambahAdmin";
import { useTambahAdmin } from "../../hooks/useTambahAdmin";

const mockTambahAdmin = jest.fn();
const mockClose = jest.fn();
const mockSuccess = jest.fn();

jest.mock("../../hooks/useTambahAdmin", () => ({
  useTambahAdmin: jest.fn(),
}));

describe("ModalTambahAdmin", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useTambahAdmin as jest.Mock).mockReturnValue({
      tambahAdmin: mockTambahAdmin,
      loading: false,
      error: "",
    });
  });

  it("menampilkan form tambah admin", () => {
    render(<ModalTambahAdmin onClose={mockClose} onSuccess={mockSuccess} />);

    expect(screen.getByText("Tambah Admin Baru")).toBeInTheDocument();
    expect(screen.getByText("Nama")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password Sementara")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nama admin")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("admin@email.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
  });

  it("memanggil onClose saat klik batal", () => {
    render(<ModalTambahAdmin onClose={mockClose} onSuccess={mockSuccess} />);

    fireEvent.click(screen.getByRole("button", { name: "Batal" }));

    expect(mockClose).toHaveBeenCalled();
  });

  it("memanggil tambahAdmin saat klik tambah", () => {
    render(<ModalTambahAdmin onClose={mockClose} onSuccess={mockSuccess} />);

    fireEvent.change(screen.getByPlaceholderText("Nama admin"), {
      target: { value: "Admin Baru" },
    });

    fireEvent.change(screen.getByPlaceholderText("admin@email.com"), {
      target: { value: "admin@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Tambah" }));

    expect(mockTambahAdmin).toHaveBeenCalledWith({
      name: "Admin Baru",
      email: "admin@gmail.com",
      password: "123456",
    });
  });

  it("menampilkan loading saat menyimpan", () => {
    (useTambahAdmin as jest.Mock).mockReturnValue({
      tambahAdmin: mockTambahAdmin,
      loading: true,
      error: "",
    });

    render(<ModalTambahAdmin onClose={mockClose} onSuccess={mockSuccess} />);

    expect(screen.getByRole("button", { name: "Menyimpan..." })).toBeDisabled();
  });

  it("menampilkan error jika ada error", () => {
    (useTambahAdmin as jest.Mock).mockReturnValue({
      tambahAdmin: mockTambahAdmin,
      loading: false,
      error: "Semua field wajib diisi.",
    });

    render(<ModalTambahAdmin onClose={mockClose} onSuccess={mockSuccess} />);

    expect(screen.getByText("Semua field wajib diisi.")).toBeInTheDocument();
  });
});
