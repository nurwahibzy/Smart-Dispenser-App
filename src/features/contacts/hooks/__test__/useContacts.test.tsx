import { renderHook } from "@testing-library/react";
import useContacts from "../useContacts";
import CONTACTS from "@/features/contacts/service/contactsService";

jest.mock("@/features/contacts/service/contactsService", () => ({
	__esModule: true,
	default: {},
}));

type ContactItem = {
	title: string;
	value: string;
	description: string;
};

const resetMockContacts = (data: Record<string, ContactItem>) => {
	const contacts = CONTACTS as Record<string, ContactItem>;

	Object.keys(contacts).forEach((key) => {
		delete contacts[key];
	});

	Object.assign(contacts, data);
};

describe("useContacts", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		resetMockContacts({
			admin: {
				title: "Admin",
				value: "08123456789",
				description: "Kontak admin",
			},
			support: {
				title: "Support",
				value: "08987654321",
				description: "Kontak support",
			},
		});
	});

	it("mengembalikan data kontak sebagai array", () => {
		const { result } = renderHook(() => useContacts());

		expect(result.current).toEqual([
			{
				key: "admin",
				title: "Admin",
				value: "08123456789",
				description: "Kontak admin",
			},
			{
				key: "support",
				title: "Support",
				value: "08987654321",
				description: "Kontak support",
			},
		]);
	});

	it("menyertakan key pada setiap item", () => {
		const { result } = renderHook(() => useContacts());

		expect(result.current.map((item) => item.key)).toEqual([
			"admin",
			"support",
		]);
	});

	it("mengembalikan array kosong saat service kosong", () => {
		resetMockContacts({});

		const { result } = renderHook(() => useContacts());

		expect(result.current).toEqual([]);
	});
});
