import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ModalEditProfile from "../ModalEdit";
import { useEditNama } from "../../hooks/useEditNama";
import { useEditEmail } from "../../hooks/useEditEmail";

const mockEditNama = jest.fn();
const mockEditEmail = jest.fn();
const mockOnClose = jest.fn();
const mockOnSuccess = jest.fn();

jest.mock("../../hooks/useEditNama", () => ({
  useEditNama: jest.fn(),
}));

jest.mock("../../hooks/useEditEmail", () => ({
  useEditEmail: jest.fn(),
}));

describe("ModalEditProfile", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useEditNama as jest.Mock).mockReturnValue({
      editNama: mockEditNama,
    });

    (useEditEmail as jest.Mock).mockReturnValue({
      editEmail: mockEditEmail,
    });
  });

  const defaultProps = {
    open: true,
    uid: "uid-1",
    namaSekarang: "Ananda Rahmawati",
    emailSekarang: "ananda@gmail.com",
    onClose: mockOnClose,
    onSuccess: mockOnSuccess,
  };

  it("tidak menampilkan modal jika open false", () => {
    render(<ModalEditProfile {...defaultProps} open={false} />);

    expect(screen.queryByText("Edit Profile")).not.toBeInTheDocument();
  });

  it("menampilkan modal edit profile", () => {
    render(<ModalEditProfile {...defaultProps} />);

    expect(screen.getByText("Edit Profile")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Ananda Rahmawati")).toBeInTheDocument();
    expect(screen.getByDisplayValue("ananda@gmail.com")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Batal" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Simpan" })).toBeInTheDocument();
  });

  it("memanggil onClose saat tombol batal diklik", () => {
    render(<ModalEditProfile {...defaultProps} />);

    fireEvent.click(screen.getByRole("button", { name: "Batal" }));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("mengubah nama jika nama berbeda dari data awal", async () => {
    mockEditNama.mockResolvedValue(undefined);
    mockOnSuccess.mockResolvedValue(undefined);

    render(<ModalEditProfile {...defaultProps} />);

    fireEvent.change(screen.getByDisplayValue("Ananda Rahmawati"), {
      target: { value: "Ananda Baru" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Simpan" }));

    await waitFor(() => {
      expect(mockEditNama).toHaveBeenCalledWith("Ananda Baru");
    });

    expect(mockEditEmail).not.toHaveBeenCalled();
    expect(mockOnSuccess).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("mengubah email jika email berbeda dari data awal", async () => {
    mockEditEmail.mockResolvedValue(undefined);
    mockOnSuccess.mockResolvedValue(undefined);

    render(<ModalEditProfile {...defaultProps} />);

    fireEvent.change(screen.getByDisplayValue("ananda@gmail.com"), {
      target: { value: "admin@gmail.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Simpan" }));

    await waitFor(() => {
      expect(mockEditEmail).toHaveBeenCalledWith("uid-1", "admin@gmail.com");
    });

    expect(mockEditNama).not.toHaveBeenCalled();
    expect(mockOnSuccess).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("mengubah nama dan email jika keduanya berbeda", async () => {
    mockEditNama.mockResolvedValue(undefined);
    mockEditEmail.mockResolvedValue(undefined);
    mockOnSuccess.mockResolvedValue(undefined);

    render(<ModalEditProfile {...defaultProps} />);

    fireEvent.change(screen.getByDisplayValue("Ananda Rahmawati"), {
      target: { value: "Ananda Baru" },
    });

    fireEvent.change(screen.getByDisplayValue("ananda@gmail.com"), {
      target: { value: "admin@gmail.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Simpan" }));

    await waitFor(() => {
      expect(mockEditNama).toHaveBeenCalledWith("Ananda Baru");
      expect(mockEditEmail).toHaveBeenCalledWith("uid-1", "admin@gmail.com");
    });

    expect(mockOnSuccess).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("menampilkan error jika gagal menyimpan perubahan", async () => {
    mockEditNama.mockRejectedValue(new Error("gagal"));

    render(<ModalEditProfile {...defaultProps} />);

    fireEvent.change(screen.getByDisplayValue("Ananda Rahmawati"), {
      target: { value: "Ananda Baru" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Simpan" }));

    await waitFor(() => {
      expect(
        screen.getByText("Gagal menyimpan perubahan. Coba lagi."),
      ).toBeInTheDocument();
    });
  });
});
