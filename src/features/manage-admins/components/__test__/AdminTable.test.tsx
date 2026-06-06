import { render, screen, fireEvent } from "@testing-library/react";
import AdminTable from "../AdminTable";
import { useToggleStatus } from "../../hooks/useUpdateStatus";
import { AdminData } from "@/types/manage-admins";
import { Timestamp } from "firebase/firestore";

const mockRefresh = jest.fn();
const mockToggleStatus = jest.fn();

jest.mock("next-auth/react", () => ({
  useSession: () => ({
    data: {
      user: {
        email: "superadmin@gmail.com",
      },
    },
  }),
}));

jest.mock("../../hooks/useUpdateStatus", () => ({
  useToggleStatus: jest.fn(),
}));

jest.mock("../ModalEditAdmin", () => ({
  __esModule: true,
  default: ({ admin }: { admin: AdminData }) => (
    <div>Modal Edit Admin {admin.name}</div>
  ),
}));

jest.mock("../statusDropdown", () => ({
  __esModule: true,
  default: ({
    status,
    onChange,
  }: {
    status: boolean;
    onChange: (value: boolean) => void;
  }) => (
    <button onClick={() => onChange(!status)}>
      {status ? "Aktif Dropdown" : "Nonaktif Dropdown"}
    </button>
  ),
}));

const admins: AdminData[] = [
  {
    id: "1",
    name: "Admin Satu",
    email: "admin1@gmail.com",
    role: "admin",
    status: true,
    createdAt: Timestamp.fromDate(new Date("2026-01-01T00:00:00.000Z")),
    updatedAt: null,
  },
  {
    id: "2",
    name: "Admin Dua",
    email: "admin2@gmail.com",
    role: "admin",
    status: false,
    createdAt: Timestamp.fromDate(new Date("2026-01-02T00:00:00.000Z")),
    updatedAt: null,
  },
  {
    id: "3",
    name: "Super Admin",
    email: "superadmin@gmail.com",
    role: "super admin",
    status: true,
    createdAt: Timestamp.fromDate(new Date("2026-01-03T00:00:00.000Z")),
    updatedAt: null,
  },
];

describe("AdminTable", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useToggleStatus as jest.Mock).mockReturnValue({
      toggleStatus: mockToggleStatus,
      loadingId: null,
    });
  });

  it("menampilkan daftar admin", () => {
    render(<AdminTable admins={admins} onRefresh={mockRefresh} />);

    expect(screen.getByText("Admin Satu")).toBeInTheDocument();
    expect(screen.getByText("admin1@gmail.com")).toBeInTheDocument();

    expect(screen.getByText("Admin Dua")).toBeInTheDocument();
    expect(screen.getByText("admin2@gmail.com")).toBeInTheDocument();

    expect(screen.getByText("superadmin@gmail.com")).toBeInTheDocument();
  });

  it("menampilkan akun sendiri dengan label Saya", () => {
    render(<AdminTable admins={admins} onRefresh={mockRefresh} />);

    expect(screen.getByText("(Saya)")).toBeInTheDocument();
  });

  it("menampilkan pesan jika data kosong", () => {
    render(<AdminTable admins={[]} onRefresh={mockRefresh} />);

    expect(screen.getByText("Tidak ada data ditemukan.")).toBeInTheDocument();
  });

  it("filter berdasarkan search nama", () => {
    render(<AdminTable admins={admins} onRefresh={mockRefresh} />);

    fireEvent.change(screen.getByPlaceholderText("Cari nama / email..."), {
      target: { value: "Admin Satu" },
    });

    expect(screen.getByText("Admin Satu")).toBeInTheDocument();
    expect(screen.queryByText("Admin Dua")).not.toBeInTheDocument();
  });

  it("filter berdasarkan search email", () => {
    render(<AdminTable admins={admins} onRefresh={mockRefresh} />);

    fireEvent.change(screen.getByPlaceholderText("Cari nama / email..."), {
      target: { value: "admin2@gmail.com" },
    });

    expect(screen.getByText("Admin Dua")).toBeInTheDocument();
    expect(screen.queryByText("Admin Satu")).not.toBeInTheDocument();
  });

  it("filter berdasarkan role admin", () => {
    render(<AdminTable admins={admins} onRefresh={mockRefresh} />);

    fireEvent.change(screen.getByDisplayValue("Semua Role"), {
      target: { value: "admin" },
    });

    expect(screen.getByText("Admin Satu")).toBeInTheDocument();
    expect(screen.getByText("Admin Dua")).toBeInTheDocument();

    expect(screen.queryByText("superadmin@gmail.com")).not.toBeInTheDocument();
  });

  it("filter berdasarkan role super admin", () => {
    render(<AdminTable admins={admins} onRefresh={mockRefresh} />);

    fireEvent.change(screen.getByDisplayValue("Semua Role"), {
      target: { value: "super admin" },
    });

    expect(screen.getByText("superadmin@gmail.com")).toBeInTheDocument();
    expect(screen.queryByText("Admin Satu")).not.toBeInTheDocument();
  });

  it("filter berdasarkan status aktif", () => {
    render(<AdminTable admins={admins} onRefresh={mockRefresh} />);

    fireEvent.change(screen.getByDisplayValue("Semua Status"), {
      target: { value: "aktif" },
    });

    expect(screen.getByText("Admin Satu")).toBeInTheDocument();
    expect(screen.getByText("superadmin@gmail.com")).toBeInTheDocument();

    expect(screen.queryByText("Admin Dua")).not.toBeInTheDocument();
  });

  it("filter berdasarkan status nonaktif", () => {
    render(<AdminTable admins={admins} onRefresh={mockRefresh} />);

    fireEvent.change(screen.getByDisplayValue("Semua Status"), {
      target: { value: "nonaktif" },
    });

    expect(screen.getByText("Admin Dua")).toBeInTheDocument();
    expect(screen.queryByText("Admin Satu")).not.toBeInTheDocument();
  });

  it("reset filter mengembalikan semua data", () => {
    render(<AdminTable admins={admins} onRefresh={mockRefresh} />);

    fireEvent.change(screen.getByPlaceholderText("Cari nama / email..."), {
      target: { value: "Admin Satu" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Reset" }));

    expect(screen.getByText("Admin Satu")).toBeInTheDocument();
    expect(screen.getByText("Admin Dua")).toBeInTheDocument();
    expect(screen.getByText("superadmin@gmail.com")).toBeInTheDocument();
  });

  it("membuka modal edit admin saat klik tombol edit", () => {
    render(<AdminTable admins={admins} onRefresh={mockRefresh} />);

    const editButtons = screen.getAllByRole("button");

    fireEvent.click(editButtons[editButtons.length - 1]);

    expect(
      screen.getByText("Modal Edit Admin Super Admin"),
    ).toBeInTheDocument();
  });

  it("memanggil toggleStatus saat status dropdown diubah", () => {
    render(<AdminTable admins={admins} onRefresh={mockRefresh} />);

    fireEvent.click(screen.getByText("Aktif Dropdown"));

    expect(mockToggleStatus).toHaveBeenCalledWith("1", false);
  });
});
