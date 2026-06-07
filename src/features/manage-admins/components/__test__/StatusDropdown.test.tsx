import { render, screen, fireEvent } from "@testing-library/react";
import StatusDropdown from "../statusDropdown";

const mockChange = jest.fn();

describe("StatusDropdown", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("menampilkan status aktif", () => {
    render(<StatusDropdown status={true} onChange={mockChange} />);

    expect(screen.getByRole("button")).toHaveTextContent("Aktif");
  });

  it("menampilkan status nonaktif", () => {
    render(<StatusDropdown status={false} onChange={mockChange} />);

    expect(screen.getByRole("button")).toHaveTextContent("Nonaktif");
  });

  it("membuka dropdown saat diklik", () => {
    render(<StatusDropdown status={true} onChange={mockChange} />);

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getAllByText("Aktif").length).toBeGreaterThan(1);
    expect(screen.getByText("Nonaktif")).toBeInTheDocument();
  });

  it("memilih status aktif", () => {
    render(<StatusDropdown status={false} onChange={mockChange} />);

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Aktif"));

    expect(mockChange).toHaveBeenCalledWith(true);
  });

  it("memilih status nonaktif", () => {
    render(<StatusDropdown status={true} onChange={mockChange} />);

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Nonaktif"));

    expect(mockChange).toHaveBeenCalledWith(false);
  });

  it("disabled tidak bisa membuka dropdown", () => {
    render(<StatusDropdown status={true} disabled onChange={mockChange} />);

    fireEvent.click(screen.getByRole("button"));

    expect(screen.queryByText("Nonaktif")).not.toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("menampilkan loading", () => {
    render(<StatusDropdown status={true} loading onChange={mockChange} />);

    expect(screen.getByText("Memuat...")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("menutup dropdown saat klik di luar", () => {
    render(<StatusDropdown status={true} onChange={mockChange} />);

    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Nonaktif")).toBeInTheDocument();

    fireEvent.click(document.body);

    expect(screen.queryByText("Nonaktif")).not.toBeInTheDocument();
  });
});
