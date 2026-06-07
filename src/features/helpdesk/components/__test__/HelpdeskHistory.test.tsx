import HelpdeskHistory from "../HelpdeskHistory";
import { render, screen } from "@testing-library/react";
import { useFetchTicket } from "../../hooks/useGetHelpdesk";

jest.mock("../../hooks/useGetHelpdesk");

// kode ini untuk memudahkan pengetesan dengan memberikan tipe pada mocked useFetchTicket
// agar dikenali sebagai fungsi yang dikembalikan oleh hook useFetchTicket
const mockedUseFetchTicket = useFetchTicket as jest.MockedFunction<
  typeof useFetchTicket
>;

describe("HelpdeskHistory Component", () => {
  it("menampilkan loading state", () => {
    (useFetchTicket as jest.Mock).mockReturnValue({
      FetchTicket: jest.fn(),
      isLoading: true,
      error: null,
    });
    render(<HelpdeskHistory />);
    expect(screen.getByText(/Memuat riwayat laporan.../i)).toBeInTheDocument();
  });

  it("menampilkan state error", () => {
    (useFetchTicket as jest.Mock).mockReturnValue({
      FetchTicket: jest.fn(),
      isLoading: false,
      error: "Failed to fetch tickets",
    });
    render(<HelpdeskHistory />);
    expect(screen.getByText(/Failed to fetch tickets/i)).toBeInTheDocument();
  });

  it("menampilkan state kosong", () => {
    (useFetchTicket as jest.Mock).mockReturnValue({
      FetchTicket: jest.fn(),
      isLoading: false,
      error: null,
    });
    render(<HelpdeskHistory />);
    expect(
      screen.getByText(/Belum ada laporan/i),
    ).toBeInTheDocument();
  });

  it("menampilkan data tiket helpdesk dengan benar", async () => {
    const mockTickets = [
      {
        id: "1",
        title: "Sensor error",
        description: "Sensor tidak merespons",
        category: "bug",
        status: "open",
      },
      {
        id: "2",
        title: "Air macet",
        description: "Air tidak mengalir",
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

    render(<HelpdeskHistory />);

    for (const ticket of mockTickets) {
      // Gunakan 'await findByText' untuk menunggu komponen selesai merender data async
      expect(await screen.findByText(ticket.title)).toBeInTheDocument();

      // Setelah elemen pertama muncul, gunakan 'getByText' untuk elemen lainnya
      expect(screen.getByText(ticket.description)).toBeInTheDocument();
      // Gunakan opsi { exact: false } agar Jest mau mencocokkan teks yang tidak sama persis
      expect(
        screen.getByText(ticket.description, { exact: false }),
      ).toBeInTheDocument();
      expect(screen.getByText(ticket.status)).toBeInTheDocument();
    }
  });
});
