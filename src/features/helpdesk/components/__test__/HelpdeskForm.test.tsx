import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserHelpdeskForm from "@/features/helpdesk/components/HelpdeskForm"; // Sesuaikan dengan path file komponenmu
import { useSubmitTicket } from "@/features/helpdesk/hooks/useSubmitHelpdesk"; // Sesuaikan path

jest.mock("../../hooks/useSubmitHelpdesk", () => ({
  useSubmitTicket: jest.fn(),
}));

jest.mock("@/components/ui/select", () => ({
  Select: ({ value, onChange, options }: any) => (
    <select role="combobox" value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  ),
}));

describe("UserHelpdeskForm Component", () => {
  // Mock fungsi submitTicket yang dikembalikan oleh hook
  const mockSubmitTicket = jest.fn();

  beforeEach(() => {
    // Reset mock sebelum setiap test
    jest.clearAllMocks();

    // Setup default return value dari hook
    (useSubmitTicket as jest.Mock).mockReturnValue({
      submitTicket: mockSubmitTicket,
      isLoading: false,
      error: null,
      successMessage: null,
    });
  });

  // --- Mulai Test Cases ---

  it("merender form dengan semua input field dengan benar", () => {
    render(<UserHelpdeskForm />);

    expect(
      screen.getByPlaceholderText("Masukkan nama Anda"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("example@email.com"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Contoh: Tombol simpan tidak berfungsi"),
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument(); 
    expect(
      screen.getByPlaceholderText(
        "Ceritakan detail masalah yang Anda alami...",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Kirim Laporan/i }),
    ).toBeInTheDocument();
  });

  it("memperbarui nilai state saat user mengetik di input", () => {
    render(<UserHelpdeskForm />);

    const nameInput = screen.getByPlaceholderText("Masukkan nama Anda");
    fireEvent.change(nameInput, { target: { value: "Budi Santoso" } });

    expect(nameInput).toHaveValue("Budi Santoso");
  });

  it("memanggil fungsi submitTicket dengan payload yang benar saat form disubmit", async () => {
    // Simulasi submit berhasil
    mockSubmitTicket.mockResolvedValue(true);
    render(<UserHelpdeskForm />);

    // Isi form
    fireEvent.change(screen.getByPlaceholderText("Masukkan nama Anda"), {
      target: { value: "Budi Santoso" },
    });
    fireEvent.change(screen.getByPlaceholderText("example@email.com"), {
      target: { value: "budi@email.com" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Contoh: Tombol simpan tidak berfungsi"),
      { target: { value: "Error login" } },
    );
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "bug" },
    });
    fireEvent.change(
      screen.getByPlaceholderText(
        "Ceritakan detail masalah yang Anda alami...",
      ),
      { target: { value: "Saya tidak bisa login" } },
    );

    // Submit form
    const submitButton = screen.getByRole("button", { name: /Kirim Laporan/i });
    fireEvent.click(submitButton);

    // Verifikasi apakah submitTicket dipanggil dengan data yang diketikkan
    await waitFor(() => {
      expect(mockSubmitTicket).toHaveBeenCalledWith({
        name: "Budi Santoso",
        contact: "budi@email.com",
        title: "Error login",
        category: "bug",
        description: "Saya tidak bisa login",
      });
    });
  });

  it("menampilkan pesan error jika hook mengembalikan error", () => {
    (useSubmitTicket as jest.Mock).mockReturnValue({
      submitTicket: mockSubmitTicket,
      isLoading: false,
      error: "Gagal mengirim laporan. Silakan coba lagi.",
      successMessage: null,
    });

    render(<UserHelpdeskForm />);
    expect(
      screen.getByText("Gagal mengirim laporan. Silakan coba lagi."),
    ).toBeInTheDocument();
  });

  it("menampilkan pesan sukses jika hook mengembalikan successMessage", () => {
    (useSubmitTicket as jest.Mock).mockReturnValue({
      submitTicket: mockSubmitTicket,
      isLoading: false,
      error: null,
      successMessage: "Laporan berhasil dikirim!",
    });

    render(<UserHelpdeskForm />);
    expect(screen.getByText("Laporan berhasil dikirim!")).toBeInTheDocument();
  });

  it("mendisable tombol dan mengubah teks saat isLoading bernilai true", () => {
    (useSubmitTicket as jest.Mock).mockReturnValue({
      submitTicket: mockSubmitTicket,
      isLoading: true, // Sedang loading
      error: null,
      successMessage: null,
    });

    render(<UserHelpdeskForm />);

    const button = screen.getByRole("button", { name: /Mengirim Laporan.../i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
