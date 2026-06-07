import AdminHelpdeskList from "../HelpdeskList";
import { render, screen } from "@testing-library/react";
import { useFetchTicket } from "../../hooks/useGetHelpdesk";

jest.mock("../../hooks/useGetHelpdesk");

// kode ini untuk memudahkan pengetesan dengan memberikan tipe pada mocked useFetchTicket
// agar dikenali sebagai fungsi yang dikembalikan oleh hook useFetchTicket
const mockedUseFetchTicket = useFetchTicket as jest.MockedFunction<
  typeof useFetchTicket
>;

describe("AdminHelpdeskList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("merender daftar tiket helpdesk dengan benar", () => {
    mockedUseFetchTicket.mockReturnValue({
      FetchTicket: jest.fn(),
      isLoading: false,
      error: null,
      successMessage: null,
    });
    render(<AdminHelpdeskList />);
    expect(screen.getByText("Kelola Laporan Helpdesk")).toBeInTheDocument();
    expect(screen.getByText("Tanggal")).toBeInTheDocument();
    expect(screen.getByText("Judul Laporan")).toBeInTheDocument();
    expect(screen.getByText("Pengirim")).toBeInTheDocument();
    expect(screen.getByText("Kategori")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Aksi")).toBeInTheDocument();
  });

  //   menggunakan async/await untuk menunggu komponen selesai me-render data yang diambil secara async
  it("menampilkan data tiket helpdesk dengan benar", async () => {
    const mockTickets = [
      {
        createdAt: "2024-01-01T00:00:00Z",
        id: "1",
        title: "Sensor error",
        name: "John Doe",
        category: "bug",
        status: "open",
      },
      {
        createdAt: "2024-01-02T00:00:00Z",
        id: "2",
        title: "Air macet",
        name: "Jane Smith",
        category: "feature",
        status: "closed",
      },
    ];

    mockedUseFetchTicket.mockReturnValue({
      // mocking data yang dikembalikan oleh FetchTicket untuk memastikan komponen menerima data yang diharapkan
      FetchTicket: jest.fn().mockResolvedValue(mockTickets),
      isLoading: false,
      error: null,
      successMessage: null,
    });

    render(<AdminHelpdeskList />);

    for (const ticket of mockTickets) {
      // Gunakan 'await findByText' untuk menunggu komponen selesai merender data async
      expect(await screen.findByText(ticket.title)).toBeInTheDocument();

      // Setelah elemen pertama muncul, gunakan 'getByText' untuk elemen lainnya
      expect(screen.getByText(ticket.name)).toBeInTheDocument();

      const expectedDateString = new Date(ticket.createdAt).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
        expect(screen.getByText(expectedDateString)).toBeInTheDocument();
      expect(screen.getByText(ticket.category)).toBeInTheDocument();
      expect(screen.getByText(ticket.status)).toBeInTheDocument();
    }
  });

  it("menampilkan pesan error saat terjadi kesalahan dalam mengambil data tiket", () => {
    mockedUseFetchTicket.mockReturnValue({
      FetchTicket: jest.fn(),
      isLoading: false,
      error: "Failed to fetch tickets",
      successMessage: null,
    });
    render(<AdminHelpdeskList />);
    expect(screen.getByText("Failed to fetch tickets")).toBeInTheDocument();
  });
});
