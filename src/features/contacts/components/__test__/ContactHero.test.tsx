import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ContactHero from "../ContactHero";

describe("ContactHero", () => {
	it("component berhasil dirender tanpa error", () => {
		render(<ContactHero />);

		expect(screen.getByRole("heading", { name: "Hubungi Kami" })).toBeInTheDocument();
	});

	it("heading atau judul utama tampil", () => {
		render(<ContactHero />);

		expect(screen.getByRole("heading", { name: "Hubungi Kami" })).toBeInTheDocument();
	});

	it("subtitle atau deskripsi tampil", () => {
		render(<ContactHero />);

		expect(
			screen.getByText(
				"Butuh bantuan atau memiliki pertanyaan seputar Smart Dispenser? Tim kami siap membantu Anda.",
			),
		).toBeInTheDocument();
	});

	it("semua text penting pada hero section tampil", () => {
		render(<ContactHero />);

		expect(screen.getByText("Hubungi Kami")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Butuh bantuan atau memiliki pertanyaan seputar Smart Dispenser? Tim kami siap membantu Anda.",
			),
		).toBeInTheDocument();
	});
});
