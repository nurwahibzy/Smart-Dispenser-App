import { render, screen, fireEvent, act } from "@testing-library/react";
import MemberKioskContent from "../MemberKioskContent";
import { useMemberKiosk } from "@/features/member/hooks/useMemberKiosk";
import { useDeviceData } from "@/lib/hooks/useDeviceData";
import { useTransactionData } from "@/lib/hooks/useTransactionData";
import { calculateDailyUsage } from "@/lib/utils/transaction";

const mockSetSelectedVolume = jest.fn();
const mockStartDispensing = jest.fn();

jest.mock("@/features/member/hooks/useMemberKiosk", () => ({
	useMemberKiosk: jest.fn(),
}));

jest.mock("@/lib/hooks/useDeviceData", () => ({
	useDeviceData: jest.fn(),
}));

jest.mock("@/lib/hooks/useTransactionData", () => ({
	useTransactionData: jest.fn(),
}));

jest.mock("@/lib/utils/transaction", () => ({
	calculateDailyUsage: jest.fn(),
}));

jest.mock("@/features/water/components/water-level-section", () => ({
	__esModule: true,
	default: () => <div>Water Level Section</div>,
}));

jest.mock("@/features/water/components/tds-card", () => ({
	__esModule: true,
	default: ({ tds }: { tds: number }) => <div>Water Quality: {tds}</div>,
}));

jest.mock("@/features/water/components/daily-usage-card", () => ({
	__esModule: true,
	default: ({ dailyUsage, totalDispenses }: { dailyUsage: number; totalDispenses: number }) => (
		<div>Daily Usage: {dailyUsage} Total: {totalDispenses}</div>
	),
}));

jest.mock("@/features/water/components/glass-detection-card", () => ({
	__esModule: true,
	default: ({ isGlassDetected }: { isGlassDetected: boolean }) => (
		<div>Glass Detected: {isGlassDetected ? "yes" : "no"}</div>
	),
}));

jest.mock("@/features/water/components/valve-control-card", () => ({
	__esModule: true,
	default: () => <div>Status Katup</div>,
}));

jest.mock("lucide-react", () => ({
	Droplets: () => <svg data-testid="droplets-icon" />,
}));

const baseDeviceData = {
	sensors: {
		tds: 150,
		glassDetected: true,
	},
};

const baseHookReturn = {
	volumeOptions: [100, 300, 500, 1000],
	selectedVolume: null,
	setSelectedVolume: mockSetSelectedVolume,
	startDispensing: mockStartDispensing,
	canStart: false,
	isDispensing: false,
	finishState: "idle",
	progressPercent: 0,
	progressText: "Siap mengisi",
	guardReason: "",
};

describe("MemberKioskContent", () => {
	beforeEach(() => {
		jest.clearAllMocks();

		(useMemberKiosk as jest.Mock).mockReturnValue(baseHookReturn);
		(useDeviceData as jest.Mock).mockReturnValue({
			data: baseDeviceData,
			loading: false,
		});
		(useTransactionData as jest.Mock).mockReturnValue({
			data: [],
			loading: false,
		});
		(calculateDailyUsage as jest.Mock).mockReturnValue({
			dailyUsage: 0,
			totalDispenses: 0,
		});
	});

	it("component berhasil dirender", () => {
		render(<MemberKioskContent />);

		expect(screen.getByText("Pilih Volume Air")).toBeInTheDocument();
		expect(screen.getByText("Mulai Pengisian Air")).toBeInTheDocument();
	});

	it("menampilkan informasi status dispenser", () => {
		(useDeviceData as jest.Mock).mockReturnValueOnce({
			data: baseDeviceData,
			loading: true,
		});

		render(<MemberKioskContent />);

		expect(screen.getByText("Memuat data status…")).toBeInTheDocument();
	});

	it("menampilkan water level", () => {
		render(<MemberKioskContent />);

		expect(screen.getByText("Water Level Section")).toBeInTheDocument();
	});

	it("menampilkan water quality", () => {
		render(<MemberKioskContent />);

		expect(screen.getByText("Water Quality: 150")).toBeInTheDocument();
	});

	it("menampilkan pilihan volume", () => {
		render(<MemberKioskContent />);

		expect(screen.getByRole("button", { name: "100 ml" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "300 ml" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "500 ml" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "1000 ml" })).toBeInTheDocument();
	});

	it("menampilkan tombol mulai isi", () => {
		render(<MemberKioskContent />);

		expect(
			screen.getByRole("button", { name: "MULAI PENGISIAN" }),
		).toBeInTheDocument();
	});

	it("tombol mulai isi disabled ketika canStart = false", () => {
		render(<MemberKioskContent />);

		expect(
			screen.getByRole("button", { name: "MULAI PENGISIAN" }),
		).toBeDisabled();
	});

	it("tombol mulai isi enabled ketika canStart = true", () => {
		(useMemberKiosk as jest.Mock).mockReturnValueOnce({
			...baseHookReturn,
			canStart: true,
		});

		render(<MemberKioskContent />);

		expect(
			screen.getByRole("button", { name: "MULAI PENGISIAN" }),
		).not.toBeDisabled();
	});

	it("memanggil startDispensing saat tombol mulai isi diklik", () => {
		(useMemberKiosk as jest.Mock).mockReturnValueOnce({
			...baseHookReturn,
			canStart: true,
		});

		render(<MemberKioskContent />);

		fireEvent.click(screen.getByRole("button", { name: "MULAI PENGISIAN" }));

		expect(mockStartDispensing).toHaveBeenCalled();
	});

	it("menampilkan progress dispensing jika sedang mengisi", () => {
		(useMemberKiosk as jest.Mock).mockReturnValueOnce({
			...baseHookReturn,
			isDispensing: true,
			progressText: "Mengisi... 100ml / 300ml",
		});

		render(<MemberKioskContent />);

		expect(
			screen.getByText("Mengisi... 100ml / 300ml"),
		).toBeInTheDocument();
	});

	it("menampilkan finish state jika dispensing selesai", () => {
		jest.useFakeTimers();

		(useMemberKiosk as jest.Mock).mockReturnValue({
			...baseHookReturn,
			finishState: "done",
		});

		render(<MemberKioskContent />);

		act(() => {
			jest.runOnlyPendingTimers();
		});

		expect(screen.getByText("✓ Selesai!")).toBeInTheDocument();
		expect(screen.getByText("Berhasil!")).toBeInTheDocument();

		jest.useRealTimers();
	});
});
