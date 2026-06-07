import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ContactCTA from "../ContactCTA";

jest.mock("next/link", () => ({
	__esModule: true,
	default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
		<a href={href} {...props}>
			{children}
		</a>
	),
}));

describe("ContactCTA", () => {
	it("component berhasil dirender tanpa error", () => {
		render(<ContactCTA />);

		expect(
			screen.getByText("Mengalami kendala teknis atau ingin melaporkan bug?"),
		).toBeInTheDocument();
	});

	it("judul ContactCTA tampil", () => {
		render(<ContactCTA />);

		expect(
			screen.getByText("Mengalami kendala teknis atau ingin melaporkan bug?"),
		).toBeInTheDocument();
	});

	it("subtitle atau deskripsi tampil", () => {
		render(<ContactCTA />);

		expect(
			screen.getByText("Tiket helpdesk dapat dipantau secara real-time oleh admin."),
		).toBeInTheDocument();
	});

	it("tombol CTA tampil", () => {
		render(<ContactCTA />);

		expect(
			screen.getByRole("link", { name: "Buka Helpdesk" }),
		).toBeInTheDocument();
	});

	it("text tombol sesuai dengan component", () => {
		render(<ContactCTA />);

		expect(screen.getByRole("link", { name: "Buka Helpdesk" })).toBeInTheDocument();
	});

	it("link tombol benar", () => {
		render(<ContactCTA />);

		const link = screen.getByRole("link", { name: "Buka Helpdesk" });
		expect(link).toHaveAttribute("href", "/helpdesk");
	});

	it("tombol dapat diklik tanpa error", () => {
		render(<ContactCTA />);

		const link = screen.getByRole("link", { name: "Buka Helpdesk" });
		expect(() => fireEvent.click(link)).not.toThrow();
	});
});
