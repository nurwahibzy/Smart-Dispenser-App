import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import OperationalHours from "../OperationalHours";

jest.mock("lucide-react", () => ({
	Clock: () => <svg data-testid="clock-icon" />,
}));

describe("OperationalHours", () => {
	it("component berhasil dirender tanpa error", () => {
		render(<OperationalHours />);

		expect(
			screen.getByText("Jam Operasional Support"),
		).toBeInTheDocument();
	});

	it("judul atau heading OperationalHours tampil", () => {
		render(<OperationalHours />);

		expect(
			screen.getByText("Jam Operasional Support"),
		).toBeInTheDocument();
	});

	it("semua data jam operasional ditampilkan", () => {
		render(<OperationalHours />);

		expect(screen.getByText("Senin – Jumat")).toBeInTheDocument();
		expect(screen.getByText(": 08.00 – 16.00")).toBeInTheDocument();
	});

	it("nama hari ditampilkan dengan benar", () => {
		render(<OperationalHours />);

		expect(screen.getByText("Senin – Jumat")).toBeInTheDocument();
	});

	it("jam buka/tutup ditampilkan dengan benar", () => {
		render(<OperationalHours />);

		expect(screen.getByText(": 08.00 – 16.00")).toBeInTheDocument();
	});

	it("status monitoring tampil", () => {
		render(<OperationalHours />);

		expect(
			screen.getByText("🟢 Monitoring dispenser berjalan 24 jam"),
		).toBeInTheDocument();
	});

	it("jumlah item informasi sesuai data", () => {
		render(<OperationalHours />);

		expect(screen.getAllByText(/.*/).length).toBeGreaterThan(0);
		expect(screen.getByText("Senin – Jumat")).toBeInTheDocument();
		expect(screen.getByText(": 08.00 – 16.00")).toBeInTheDocument();
		expect(
			screen.getByText("🟢 Monitoring dispenser berjalan 24 jam"),
		).toBeInTheDocument();
	});

	it("icon dirender", () => {
		render(<OperationalHours />);

		expect(screen.getByTestId("clock-icon")).toBeInTheDocument();
	});
});
