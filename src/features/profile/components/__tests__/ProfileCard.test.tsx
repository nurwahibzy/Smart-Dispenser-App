import { render, screen, fireEvent } from "@testing-library/react";
import ProfileCard from "../ProfileCard";

const mockEditFoto = jest.fn();
const mockRefresh = jest.fn();

jest.mock("../../hooks/useEditFoto", () => ({
  useEditFoto: () => ({
    editFoto: mockEditFoto,
  }),
}));

jest.mock("sonner", () => ({
  toast: {
    loading: jest.fn(() => "toast-id"),
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("../ModalEdit", () => ({
  __esModule: true,
  default: ({ open }: { open: boolean }) =>
    open ? <div>Modal Edit Profil</div> : null,
}));

jest.mock("../ModalGantiPassword", () => ({
  __esModule: true,
  default: () => <div>Modal Ganti Password</div>,
}));

const profile = {
  id: "uid-1",
  name: "Ananda Rahmawati",
  email: "ananda@gmail.com",
  role: "admin",
  status: true,
  photoURL: "",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: null,
};

describe("ProfileCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("menampilkan data profile", () => {
    render(<ProfileCard profile={profile} onRefresh={mockRefresh} />);

    expect(screen.getByText("Nama lengkap")).toBeInTheDocument();
    expect(screen.getByText("Ananda Rahmawati")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("ananda@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByText("admin")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Aktif")).toBeInTheDocument();
  });

  it("menampilkan inisial nama jika tidak ada foto", () => {
    render(<ProfileCard profile={profile} onRefresh={mockRefresh} />);

    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("membuka modal edit profile", () => {
    render(<ProfileCard profile={profile} onRefresh={mockRefresh} />);

    fireEvent.click(screen.getByRole("button", { name: "Edit Profil" }));

    expect(screen.getByText("Modal Edit Profil")).toBeInTheDocument();
  });

  it("membuka modal ganti password", () => {
    render(<ProfileCard profile={profile} onRefresh={mockRefresh} />);

    fireEvent.click(screen.getByRole("button", { name: "Ganti Password" }));

    expect(screen.getByText("Modal Ganti Password")).toBeInTheDocument();
  });
});