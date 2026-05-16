import CONTACTS from "@/features/contacts/service/contactsService";

export const useContacts = () => {
  // simple hook to return contact entries as an array
  return Object.keys(CONTACTS).map((key) => ({ key, ...CONTACTS[key as keyof typeof CONTACTS] }));
};

export default useContacts;
