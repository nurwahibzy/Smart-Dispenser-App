import { render, screen, fireEvent } from "@testing-library/react";
import ModalGantiPassword from "../ModalGantiPassword";
import { useGantiPassword } from "../../hooks/useGantiPassword";

const mockGantiPassword = jest.fn();
const mockTutup = jest.fn();
const mockSukses = jest.fn();

jest.mock("../../hooks/useGantiPassword", () => ({
  useGantiPassword: jest.fn(),
}));

describe("ModalGantiPassword", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useGantiPassword as jest.Mock).mockReturnValue({
      gantiPassword: mockGantiPassword,
      loading: false,
      error: "",
    });
  });

  it("menampilkan modal ganti password", () => {
    render(<ModalGantiPassword onTutup={mockTutup} onSukses={mockSukses} />);

    expect(screen.getByText("Ganti Password")).toBeInTheDocument();
    expect(screen.getByText("Password Lama")).toBeInTheDocument();
    expect(screen.getByText("Password Baru")).toBeInTheDocument();
    expect(screen.getByText("Konfirmasi Password Baru")).toBeInTheDocument();
  });

  it("memanggil gantiPassword saat klik simpan", () => {
    render(<ModalGantiPassword onTutup={mockTutup} onSukses={mockSukses} />);

    const inputs = screen.getAllByPlaceholderText("••••••••");

    fireEvent.change(inputs[0], { target: { value: "lama123" } });
    fireEvent.change(inputs[1], { target: { value: "baru123" } });
    fireEvent.change(inputs[2], { target: { value: "baru123" } });

    fireEvent.click(screen.getByRole("button", { name: "Simpan" }));

    expect(mockGantiPassword).toHaveBeenCalledWith(
      "lama123",
      "baru123",
      "baru123",
    );
  });

  it("memanggil onTutup saat klik batal", () => {
    render(<ModalGantiPassword onTutup={mockTutup} onSukses={mockSukses} />);

    fireEvent.click(screen.getByRole("button", { name: "Batal" }));

    expect(mockTutup).toHaveBeenCalled();
  });

  it("toggle show hide password berjalan", () => {
    render(<ModalGantiPassword onTutup={mockTutup} onSukses={mockSukses} />);

    const input = screen.getAllByPlaceholderText("••••••••")[0];

    expect(input).toHaveAttribute("type", "password");

    const toggleButton = screen.getAllByRole("button")[0];
    fireEvent.click(toggleButton);

    expect(input).toHaveAttribute("type", "text");
  });
});
