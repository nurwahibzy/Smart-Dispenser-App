import { render, screen } from "@testing-library/react";
import type React from "react";
import ContactCard from "../ContactCard";

jest.mock("lucide-react", () => ({
	Mail: () => <svg data-testid="mail-icon" />,
}));

const CustomIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg data-testid="custom-icon" {...props} />
);

describe("ContactCard", () => {
	it("component berhasil dirender", () => {
		render(
			<ContactCard
				title="Lokasi"
				value="Politeknik Negeri Malang"
				description="Alamat kampus"
			/>,
		);

		expect(screen.getByText("Lokasi")).toBeInTheDocument();
	});

	it("menampilkan title, value, dan description", () => {
		render(
			<ContactCard
				title="Lokasi"
				value="Politeknik Negeri Malang"
				description="Alamat kampus"
			/>,
		);

		expect(screen.getByText("Lokasi")).toBeInTheDocument();
		expect(screen.getByText("Politeknik Negeri Malang")).toBeInTheDocument();
		expect(screen.getByText("Alamat kampus")).toBeInTheDocument();
	});

	it("menampilkan link email dengan mailto", () => {
		render(
			<ContactCard
				title="Email"
				value="smartdispenser@gmail.com"
				description="Kontak resmi"
			/>,
		);

		const link = screen.getByRole("link", { name: "smartdispenser@gmail.com" });
		expect(link).toHaveAttribute("href", "mailto:smartdispenser@gmail.com");
	});

	it("menampilkan link WhatsApp dengan wa.me", () => {
		render(
			<ContactCard
				title="Telepon / WhatsApp"
				value="+62 812-3456-7890"
				description="Kontak cepat"
			/>,
		);

		const link = screen.getByRole("link", { name: "+62 812-3456-7890" });
		expect(link).toHaveAttribute("href", "https://wa.me/+6281234567890");
		expect(link).toHaveAttribute("target", "_blank");
		expect(link).toHaveAttribute("rel", "noreferrer");
	});

	it("menampilkan link Instagram dengan instagram.com", () => {
		render(
			<ContactCard
				title="Instagram"
				value="@smartdispenser"
				description="Ikuti kami"
			/>,
		);

		const link = screen.getByRole("link", { name: "@smartdispenser" });
		expect(link).toHaveAttribute("href", "https://instagram.com/smartdispenser");
		expect(link).toHaveAttribute("target", "_blank");
		expect(link).toHaveAttribute("rel", "noreferrer");
	});

	it("menampilkan icon default jika icon tidak diberikan", () => {
		render(
			<ContactCard
				title="Email"
				value="smartdispenser@gmail.com"
				description="Kontak resmi"
			/>,
		);

		expect(screen.getByTestId("mail-icon")).toBeInTheDocument();
		expect(screen.queryByTestId("custom-icon")).not.toBeInTheDocument();
	});

	it("menampilkan icon custom jika icon diberikan", () => {
		render(
			<ContactCard
				title="Email"
				value="smartdispenser@gmail.com"
				description="Kontak resmi"
				icon={CustomIcon}
			/>,
		);

		expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
		expect(screen.queryByTestId("mail-icon")).not.toBeInTheDocument();
	});
});
